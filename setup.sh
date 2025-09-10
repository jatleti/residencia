#!/bin/bash

# Verificar si el archivo .env existe, si no, duplicar .env.example
if [ ! -f .env ]; then
  echo "El archivo .env no existe, creando uno nuevo desde .env.example..."
  cp .env.example .env
else
  echo "El archivo .env ya existe."
fi

# Preguntar por las credenciales MySQL
read -p "Introduce el usuario de MySQL (por defecto 'root'): " mysql_user
mysql_user=${mysql_user:-root}
read -sp "Introduce la contraseña de MySQL: " mysql_pass
echo
read -p "Introduce el nombre de la base de datos: " db_name
read -p "Introduce el puerto de MySQL (por defecto 3306): " mysql_port
mysql_port=${mysql_port:-3306}

# Crear la base de datos en MySQL
mysql -u $mysql_user -p$mysql_pass -e "CREATE DATABASE $db_name CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"

read -sp "Introduce la contraseña de MySQL para el .env: " mysql_pass2
echo

# Configurar la URL de la base de datos en el archivo .env
echo "Configurando DATABASE_URL en el archivo .env..."
database_url="mysql://$mysql_user:$mysql_pass2@localhost:$mysql_port/$db_name"

# Para macOS usa sed con '', para Linux no lo necesita
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s|^DATABASE_URL=.*|DATABASE_URL=\"$database_url\"|" .env
else
    sed -i "s|^DATABASE_URL=.*|DATABASE_URL=\"$database_url\"|" .env
fi

# Generar una clave JWT aleatoria y modificar el .env
jwt_secret=$(openssl rand -hex 32)

if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/^JWT_SECRET=.*/JWT_SECRET=\"$jwt_secret\"/" .env
else
    sed -i "s/^JWT_SECRET=.*/JWT_SECRET=\"$jwt_secret\"/" .env
fi

echo "JWT_SECRET actualizado con valor aleatorio."

# Preguntar por el puerto de la API
read -p "Introduce el puerto para la API (por defecto 3030): " api_port
api_port=${api_port:-3030}

if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/^PORT=.*/PORT=$api_port/" .env
else
    sed -i "s/^PORT=.*/PORT=$api_port/" .env
fi

echo "Puerto de la API actualizado a $api_port."

# Ejecutar npm install
echo "Instalando dependencias..."
npm install

# Ejecutar migraciones de Prisma
echo "Ejecutando migraciones de Prisma..."
npx prisma migrate dev

# Iniciar la API en modo desarrollo
echo "Iniciando la API..."
nx run api:serve:development > /dev/null 2>&1 &
api_pid=$!  # Captura el PID del proceso de la API

# Esperar unos segundos para que el servidor arranque
sleep 20

# Continuar con el siguiente paso
echo "API iniciada."

# Generar el token y añadirlo a la base de datos
echo "Generando y añadiendo el token inicial..."
api_token=$(openssl rand -hex 32)

# Tenemos que entrar a http://localhost:3030/v1/apikeytoken/add?description=Init%20Token&token=13g5nhdzfngTOfZx7GObVLaYGkiNk7uL&tenant=dev
# para añadir el token a la base de datos
curl -s "http://localhost:$api_port/v1/apikeytoken/add?description=Init%20Token&token=$api_token&tenant=dev"

echo ""
echo ""
# Crear usuario admin inicial
echo "Creando usuario admin inicial..."
curl -s "http://localhost:$api_port/v1/usersinit/init?tenant=dev"

echo ""
echo ""

# Preguntar por los valores de localUserToken, localUserRefreshToken, y localUserPermissions
read -p "Introduce el valor para localUserToken (por defecto 'noutlyCurrentUserToken'): " local_user_token
local_user_token=${local_user_token:-noutlyCurrentUserToken}

read -p "Introduce el valor para localUserRefreshToken (por defecto 'noutlyCurrentUserRefreshToken'): " local_user_refresh_token
local_user_refresh_token=${local_user_refresh_token:-noutlyCurrentUserRefreshToken}

read -p "Introduce el valor para localUserPermissions (por defecto 'prNoutly'): " local_user_permissions
local_user_permissions=${local_user_permissions:-prNoutly}

# Poner el token en el archivo config.ts y actualizar otros valores
echo "Actualizando apiKeyToken, localUserToken, localUserRefreshToken, localUserPermissions y baseUrl en config.ts..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/public static apiKeyToken = .*/public static apiKeyToken = '$api_token';/" libs/shared/util-core/src/lib/config/config.ts
    sed -i '' "s/public static localUserToken = .*/public static localUserToken = '$local_user_token';/" libs/shared/util-core/src/lib/config/config.ts
    sed -i '' "s/public static localUserRefreshToken = .*/public static localUserRefreshToken = '$local_user_refresh_token';/" libs/shared/util-core/src/lib/config/config.ts
    sed -i '' "s/public static localUserPermissions = .*/public static localUserPermissions = '$local_user_permissions';/" libs/shared/util-core/src/lib/config/config.ts
else
    sed -i "s/public static apiKeyToken = .*/public static apiKeyToken = '$api_token';/" libs/shared/util-core/src/lib/config/config.ts
    sed -i "s/public static localUserToken = .*/public static localUserToken = '$local_user_token';/" libs/shared/util-core/src/lib/config/config.ts
    sed -i "s/public static localUserRefreshToken = .*/public static localUserRefreshToken = '$local_user_refresh_token';/" libs/shared/util-core/src/lib/config/config.ts
    sed -i "s/public static localUserPermissions = .*/public static localUserPermissions = '$local_user_permissions';/" libs/shared/util-core/src/lib/config/config.ts
fi

echo ""
# Preguntar por baseURL
read -p "Introduce el baseURL de la app (por defecto '/admin'): " base_url
base_url=${base_url:-/admin}

if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s|public static baseUrl = .*|public static baseUrl = '$base_url';|" libs/shared/util-core/src/lib/config/config.ts
else
    sed -i "s|public static baseUrl = .*|public static baseUrl = '$base_url';|" libs/shared/util-core/src/lib/config/config.ts
fi

# Matar el proceso de la API
echo "Deteniendo la API..."
kill $api_pid
echo "API detenida."

echo "Setup completado."
