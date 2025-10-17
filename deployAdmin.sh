#!/bin/bash

nx run admin:build:production

# Pregunta al usuario usando una TTY real, sin depender del stdin heredado
response=$(bash -c 'read -p "¿Deseas continuar desplegando el Admin? (y/n) " -n 1 -r reply; echo $reply < /dev/tty')
echo

if [[ ! $response =~ ^[Yy]$ ]]; then
  echo "Despliegue cancelado."
  exit 1
fi



rsync -e "ssh -i ~/Dropbox/Trabajos/dataRush/dataRushPublish" -arvuz dist/apps/admin/* jatleti@195.248.231.166:/home/panel.residenciaescolar.com/public_html
