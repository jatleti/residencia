export class ComboValues {
    public static ROLES = [
        { label: 'Administrador', value: 0 },
        { label: 'Alumno', value: 1 },
    ];

    public static ROLES_VALUES = {
        ADMIN: 0,
        USER: 1,
    };

    public static YES_NO = [
        { label: 'Sí', value: 1 },
        { label: 'No', value: 0 },
    ];

    public static BLOCKS = [
        { label: 'Sin definir', value: '' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
    ];

    public static FLOOR = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
    ];

    public static ROOM = [
        { label: 'Sin definir', value: '' },
        { label: '01', value: '01' },
        { label: '02', value: '02' },
        { label: '03', value: '03' },
        { label: '04', value: '04' },
        { label: '05', value: '05' },
        { label: '06', value: '06' },
        { label: '07', value: '07' },
        { label: '08', value: '08' },
        { label: '09', value: '09' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14' },
        { label: '15', value: '15' },
        { label: '16', value: '16' },
        { label: '17', value: '17' },
        { label: '18', value: '18' },
        { label: '19', value: '19' },
        { label: '20', value: '20' },
    ];

    public static BED = [
        { label: 'Sin definir', value: '' },
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' },
    ];

    public static COURSE = [
        { label: '1º', value: '1º' },
        { label: '2º', value: '2º' },
    ];

    public static TURN = [
        { label: 'Mañana', value: 'Mañana' },
        { label: 'Tarde', value: 'Tarde' },
    ];

    public static MOTIVES = [
        { label: 'Lejanía domicilio', value: 'Lejanía domicilio' },
        { label: 'Familia temporera', value: 'Familia temporera' },
        { label: 'Familia con dificultad extrema', value: 'Familia con dificultad extrema' },
        { label: 'Madre con violencia de género', value: 'Madre con violencia de género' },
        { label: 'Música o Danza', value: 'Música o Danza' },
        { label: 'Actividad deportiva', value: 'Actividad deportiva' },
        { label: 'Sin requisitos: alumno libre', value: 'Sin requisitos: alumno libre' },
    ];

    public static GENDER = [
        { label: 'Masculino', value: 0 },
        { label: 'Femenino', value: 1 },
        { label: 'Otros', value: 2 },
    ];

    public static ISNEW = [
        { label: 'Renovación', value: 1 },
        { label: 'Nueva incorporacion', value: 0 },
        { label: 'Traslado', value: 2 },
    ];

    public static TYPE_STUDIES = [
        { label: 'ESO', value: 0 },
        { label: 'Bachillerato', value: 1 },
        { label: 'Ciclo Medio', value: 2 },
        { label: 'Ciclo Superior', value: 3 },
    ];

    public static ESO_STUDIES = [
        { label: '1º ESO', value: '1º ESO' },
        { label: '2º ESO', value: '2º ESO' },
        { label: '3º ESO', value: '3º ESO' },
        { label: '4º ESO', value: '4º ESO' },
    ];

    public static BACHILLERATO_STUDIES = [
        { label: '1º Bachillerato', value: '1º Bachillerato' },
        { label: '2º Bachillerato', value: '2º Bachillerato' },
    ];

    public static STUDIES = [
        { label: 'Técnico en Aceites de Oliva y Vinos', value: 'Técnico en Aceites de Oliva y Vinos' },
        { label: 'Técnico en Actividades Comerciales', value: 'Técnico en Actividades Comerciales' },
        { label: 'Técnico en Actividades Ecuestres', value: 'Técnico en Actividades Ecuestres' },
        {
            label: 'Técnico en Aprovechamiento y Conservación del Medio Natural',
            value: 'Técnico en Aprovechamiento y Conservación del Medio Natural',
        },
        {
            label: 'Técnico en Atención a Personas en Situación de Dependencia',
            value: 'Técnico en Atención a Personas en Situación de Dependencia',
        },
        { label: 'Técnico en Calzado y Complementos de Moda', value: 'Técnico en Calzado y Complementos de Moda' },
        { label: 'Técnico en Carpintería y Mueble', value: 'Técnico en Carpintería y Mueble' },
        { label: 'Técnico en Carrocería', value: 'Técnico en Carrocería' },
        {
            label: 'Técnico en Comercialización de productos alimentarios',
            value: 'Técnico en Comercialización de productos alimentarios',
        },
        {
            label: 'Técnico en Conducción de Vehículos de Transporte por Carretera',
            value: 'Técnico en Conducción de Vehículos de Transporte por Carretera',
        },
        { label: 'Técnico en Confección y Moda', value: 'Técnico en Confección y Moda' },
        {
            label: 'Técnico en Conformado por Moldeo de Metales y Polímeros',
            value: 'Técnico en Conformado por Moldeo de Metales y Polímeros',
        },
        { label: 'Técnico en Construcción', value: 'Técnico en Construcción' },
        { label: 'Técnico en Cocina y Gastronomía', value: 'Técnico en Cocina y Gastronomía' },
        { label: 'Técnico en Cultivos Acuícolas', value: 'Técnico en Cultivos Acuícolas' },
        {
            label: 'Técnico en Cuidados auxiliares de enfermería (LOGSE)',
            value: 'Técnico en Cuidados auxiliares de enfermería (LOGSE)',
        },
        {
            label: 'Técnico en Elaboración de Productos Alimenticios',
            value: 'Técnico en Elaboración de Productos Alimenticios',
        },
        { label: 'Técnico en Electromecánica de Maquinaria', value: 'Técnico en Electromecánica de Maquinaria' },
        {
            label: 'Técnico en Electromecánica de Vehículos Automóviles',
            value: 'Técnico en Electromecánica de Vehículos Automóviles',
        },
        { label: 'Técnico en Emergencias Sanitarias', value: 'Técnico en Emergencias Sanitarias' },
        { label: 'Técnico en Emergencias y Protección Civil', value: 'Técnico en Emergencias y Protección Civil' },
        { label: 'Técnico en Estética y Belleza', value: 'Técnico en Estética y Belleza' },
        { label: 'Técnico en Farmacia y Parafarmacia', value: 'Técnico en Farmacia y Parafarmacia' },
        { label: 'Técnico en Gestión Administrativa', value: 'Técnico en Gestión Administrativa' },
        {
            label: 'Técnico en Guía en el medio natural y de tiempo libre',
            value: 'Técnico en Guía en el medio natural y de tiempo libre',
        },
        { label: 'Técnico en Impresión Gráfica', value: 'Técnico en Impresión Gráfica' },
        { label: 'Técnico en Instalación y Amueblamiento', value: 'Técnico en Instalación y Amueblamiento' },
        {
            label: 'Técnico en Instalaciones de Producción de Calor',
            value: 'Técnico en Instalaciones de Producción de Calor',
        },
        {
            label: 'Técnico en Instalaciones de Telecomunicaciones',
            value: 'Técnico en Instalaciones de Telecomunicaciones',
        },
        {
            label: 'Técnico en Instalaciones Eléctricas y Automáticas',
            value: 'Técnico en Instalaciones Eléctricas y Automáticas',
        },
        {
            label: 'Técnico en Instalaciones Frigoríficas y de Climatización',
            value: 'Técnico en Instalaciones Frigoríficas y de Climatización',
        },
        { label: 'Técnico en Jardinería y Floristería', value: 'Técnico en Jardinería y Floristería' },
        {
            label: 'Técnico en Mantenimiento de Material Rodante Ferroviario',
            value: 'Técnico en Mantenimiento de Material Rodante Ferroviario',
        },
        { label: 'Técnico en Mantenimiento Electromecánico', value: 'Técnico en Mantenimiento Electromecánico' },
        {
            label: 'Técnico en Mantenimiento y Control de la Maquinaria de Buques y Embarcaciones',
            value: 'Técnico en Mantenimiento y Control de la Maquinaria de Buques y Embarcaciones',
        },
        { label: 'Técnico en Mecanizado', value: 'Técnico en Mecanizado' },
        {
            label: 'Técnico en Montaje de Estructuras e Instalación de Sistemas Aeronáuticos',
            value: 'Técnico en Montaje de Estructuras e Instalación de Sistemas Aeronáuticos',
        },
        { label: 'Técnico en Navegación y Pesca de Litoral', value: 'Técnico en Navegación y Pesca de Litoral' },
        { label: 'Técnico en Operaciones de Laboratorio', value: 'Técnico en Operaciones de Laboratorio' },
        {
            label: 'Técnico en Operaciones Subacuáticas e Hiperbáricas',
            value: 'Técnico en Operaciones Subacuáticas e Hiperbáricas',
        },
        {
            label: 'Técnico en Panadería, Repostería y Confitería',
            value: 'Técnico en Panadería, Repostería y Confitería',
        },
        { label: 'Técnico en Peluquería y Cosmética Capilar', value: 'Técnico en Peluquería y Cosmética Capilar' },
        { label: 'Técnico en Piedra Natural', value: 'Técnico en Piedra Natural' },
        { label: 'Técnico en Planta Química', value: 'Técnico en Planta Química' },
        { label: 'Técnico en Preimpresión Digital', value: 'Técnico en Preimpresión Digital' },
        { label: 'Técnico en Producción Agroecológica', value: 'Técnico en Producción Agroecológica' },
        { label: 'Técnico en Producción Agropecuaria', value: 'Técnico en Producción Agropecuaria' },
        {
            label: 'Técnico en Redes y Estaciones de Tratamiento de Aguas',
            value: 'Técnico en Redes y Estaciones de Tratamiento de Aguas',
        },
        { label: 'Técnico en Servicios en Restauración', value: 'Técnico en Servicios en Restauración' },
        {
            label: 'Técnico en Sistemas Microinformáticos y Redes',
            value: 'Técnico en Sistemas Microinformáticos y Redes',
        },
        { label: 'Técnico en Soldadura y Calderería', value: 'Técnico en Soldadura y Calderería' },
        { label: 'Técnico en Vídeo Disc-jockey y Sonido', value: 'Técnico en Vídeo Disc-jockey y Sonido' },
    ];

    public static SUPERIOR_STUDIES = [
        { label: 'Técnico Superior en Acuicultura', value: 'Técnico Superior en Acuicultura' },
        {
            label: 'Técnico Superior en Administración y Finanzas',
            value: 'Técnico Superior en Administración y Finanzas',
        },
        {
            label: 'Técnico Superior en Administracion de Sistemas Informáticos en Red',
            value: 'Técnico Superior en Administracion de Sistemas Informáticos en Red',
        },
        {
            label: 'Técnico Superior en Acondicionamiento Físico',
            value: 'Técnico Superior en Acondicionamiento Físico',
        },
        {
            label: 'Técnico Superior en Agencias de Viajes y Gestión de Eventos',
            value: 'Técnico Superior en Agencias de Viajes y Gestión de Eventos',
        },
        {
            label: 'Técnico Superior en Anatomía Patológica y Citodiagnóstico',
            value: 'Técnico Superior en Anatomía Patológica y Citodiagnóstico',
        },
        {
            label: 'Técnico Superior en Animación Sociocultural y Turística',
            value: 'Técnico Superior en Animación Sociocultural y Turística',
        },
        {
            label: 'Técnico Superior en Animaciones 3D, Juegos y Entornos Interactivos',
            value: 'Técnico Superior en Animaciones 3D, Juegos y Entornos Interactivos',
        },
        {
            label: 'Técnico Superior en Asesoría de Imagen Personal y Corporativa',
            value: 'Técnico Superior en Asesoría de Imagen Personal y Corporativa',
        },
        {
            label: 'Técnico Superior en Asistencia a la Dirección',
            value: 'Técnico Superior en Asistencia a la Dirección',
        },
        {
            label: 'Técnico Superior en Automatización y Robótica Industrial',
            value: 'Técnico Superior en Automatización y Robótica Industrial',
        },
        { label: 'Técnico Superior en Audiología Protésica', value: 'Técnico Superior en Audiología Protésica' },
        {
            label: 'Técnico Superior en Caracterización y Maquillaje Profesional',
            value: 'Técnico Superior en Caracterización y Maquillaje Profesional',
        },
        { label: 'Técnico Superior en Comercio Internacional', value: 'Técnico Superior en Comercio Internacional' },
        {
            label: 'Técnico Superior en Construcciones Metálicas',
            value: 'Técnico Superior en Construcciones Metálicas',
        },
        {
            label: 'Técnico Superior en Coordinación de Emergencias y Protección Civil',
            value: 'Técnico Superior en Coordinación de Emergencias y Protección Civil',
        },
        {
            label: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma',
            value: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma',
        },
        {
            label: 'Técnico Superior en Desarrollo de Aplicaciones Web',
            value: 'Técnico Superior en Desarrollo de Aplicaciones Web',
        },
        {
            label: 'Técnico Superior en Desarrollo de Proyectos de Instalaciones Térmicas y de Fluidos',
            value: 'Técnico Superior en Desarrollo de Proyectos de Instalaciones Térmicas y de Fluidos',
        },
        { label: 'Técnico Superior en Dietética (LOGSE)', value: 'Técnico Superior en Dietética (LOGSE)' },
        { label: 'Técnico Superior en Dirección de Cocina', value: 'Técnico Superior en Dirección de Cocina' },
        {
            label: 'Técnico Superior en Dirección de Servicios en Restauración',
            value: 'Técnico Superior en Dirección de Servicios en Restauración',
        },
        { label: 'Técnico Superior en Diseño y Amueblamiento', value: 'Técnico Superior en Diseño y Amueblamiento' },
        {
            label: 'Técnico Superior en Diseño y Edición de Publicaciones Impresas y Multimedia',
            value: 'Técnico Superior en Diseño y Edición de Publicaciones Impresas y Multimedia',
        },
        {
            label: 'Técnico Superior en Diseño y Gestión de la Producción Gráfica',
            value: 'Técnico Superior en Diseño y Gestión de la Producción Gráfica',
        },
        {
            label: 'Técnico Superior en Diseño en Fabricación Mecánica',
            value: 'Técnico Superior en Diseño en Fabricación Mecánica',
        },
        {
            label: 'Técnico Superior en Documentación y Administración Sanitarias',
            value: 'Técnico Superior en Documentación y Administración Sanitarias',
        },
        { label: 'Técnico Superior en Educación Infantil', value: 'Técnico Superior en Educación Infantil' },
        {
            label: 'Técnico Superior en Educación y Control Ambiental',
            value: 'Técnico Superior en Educación y Control Ambiental',
        },
        {
            label: 'Técnico Superior en Eficiencia Energética y Energía Solar Térmica',
            value: 'Técnico Superior en Eficiencia Energética y Energía Solar Térmica',
        },
        { label: 'Técnico Superior en Electromedicina Clínica', value: 'Técnico Superior en Electromedicina Clínica' },
        {
            label: 'Técnico Superior en Enseñanza y Animación Sociodeportiva',
            value: 'Técnico Superior en Enseñanza y Animación Sociodeportiva',
        },
        { label: 'Técnico Superior en Energías Renovables', value: 'Técnico Superior en Energías Renovables' },
        {
            label: 'Técnico Superior en Estética Integral y Bienestar',
            value: 'Técnico Superior en Estética Integral y Bienestar',
        },
        {
            label: 'Técnico Superior en Estilismo y Dirección de Peluquería',
            value: 'Técnico Superior en Estilismo y Dirección de Peluquería',
        },
        {
            label: 'Técnico Superior en Fabricación de productos farmacéuticos, biotecnológicos y afines',
            value: 'Técnico Superior en Fabricación de productos farmacéuticos, biotecnológicos y afines',
        },
        {
            label: 'Técnico Superior en Formación para la Movilidad Segura y Sostenible',
            value: 'Técnico Superior en Formación para la Movilidad Segura y Sostenible',
        },
        {
            label: 'Técnico Superior en Ganadería y Asistencia en Sanidad Animal',
            value: 'Técnico Superior en Ganadería y Asistencia en Sanidad Animal',
        },
        {
            label: 'Técnico Superior en Gestión de Alojamientos Turísticos',
            value: 'Técnico Superior en Gestión de Alojamientos Turísticos',
        },
        {
            label: 'Técnico Superior en Gestión de Ventas y Espacios Comerciales',
            value: 'Técnico Superior en Gestión de Ventas y Espacios Comerciales',
        },
        { label: 'Técnico Superior en Gestión del Agua', value: 'Técnico Superior en Gestión del Agua' },
        {
            label: 'Técnico Superior en Gestión Forestal y del Medio Natural',
            value: 'Técnico Superior en Gestión Forestal y del Medio Natural',
        },
        {
            label: 'Técnico Superior en Guía, Información y Asistencias Turísticas',
            value: 'Técnico Superior en Guía, Información y Asistencias Turísticas',
        },
        { label: 'Técnico Superior en Higiene Bucodental', value: 'Técnico Superior en Higiene Bucodental' },
        {
            label: 'Técnico Superior en Iluminación, Captación y Tratamiento de Imagen',
            value: 'Técnico Superior en Iluminación, Captación y Tratamiento de Imagen',
        },
        {
            label: 'Técnico Superior en Imagen para el Diagnóstico y Medicina Nuclear',
            value: 'Técnico Superior en Imagen para el Diagnóstico y Medicina Nuclear',
        },
        { label: 'Técnico Superior en Integración Social', value: 'Técnico Superior en Integración Social' },
        {
            label: 'Técnico Superior en Laboratorio Clínico y Biomédico',
            value: 'Técnico Superior en Laboratorio Clínico y Biomédico',
        },
        {
            label: 'Técnico Superior en Laboratorio de Análisis y de Control de Calidad',
            value: 'Técnico Superior en Laboratorio de Análisis y de Control de Calidad',
        },
        {
            label: 'Técnico Superior en Mantenimiento de Instalaciones Térmicas y de Fluidos',
            value: 'Técnico Superior en Mantenimiento de Instalaciones Térmicas y de Fluidos',
        },
        {
            label: 'Técnico Superior en mantenimiento de sistemas electrónicos y aviónicos en aeronaves',
            value: 'Técnico Superior en mantenimiento de sistemas electrónicos y aviónicos en aeronaves',
        },
        {
            label: 'Técnico Superior en Mantenimiento Electrónico',
            value: 'Técnico Superior en Mantenimiento Electrónico',
        },
        { label: 'Técnico Superior en Marketing y Publicidad', value: 'Técnico Superior en Marketing y Publicidad' },
        { label: 'Técnico Superior en Mecatrónica Industrial', value: 'Técnico Superior en Mecatrónica Industrial' },
        { label: 'Técnico Superior en Mediación Comunicativa', value: 'Técnico Superior en Mediación Comunicativa' },
        {
            label: 'Técnico Superior en Óptica de anteojería (LOGSE)',
            value: 'Técnico Superior en Óptica de anteojería (LOGSE)',
        },
        {
            label: 'Técnico Superior en Organización del Mantenimiento de Maquinaria de Buques y Embarcaciones',
            value: 'Técnico Superior en Organización del Mantenimiento de Maquinaria de Buques y Embarcaciones',
        },
        {
            label: 'Técnico Superior en Organización y Control de Obras de Construcción',
            value: 'Técnico Superior en Organización y Control de Obras de Construcción',
        },
        {
            label: 'Técnico Superior en Ortoprótesis y Productos de Apoyo',
            value: 'Técnico Superior en Ortoprótesis y Productos de Apoyo',
        },
        {
            label: 'Técnico Superior en Paisajismo y Medio Rural',
            value: 'Técnico Superior en Paisajismo y Medio Rural',
        },
        { label: 'Técnico Superior en Patronaje y Moda', value: 'Técnico Superior en Patronaje y Moda' },
        {
            label: 'Técnico Superior en Prevención de riesgos profesionales (LOGSE)',
            value: 'Técnico Superior en Prevención de riesgos profesionales (LOGSE)',
        },
        {
            label: 'Técnico Superior en Procesos y Calidad en la Industria Alimentaria',
            value: 'Técnico Superior en Procesos y Calidad en la Industria Alimentaria',
        },
        {
            label: 'Técnico Superior en Producción de Audiovisuales y Espectáculos',
            value: 'Técnico Superior en Producción de Audiovisuales y Espectáculos',
        },
        {
            label: 'Técnico Superior en Programación de la Producción en Fabricación Mecánica',
            value: 'Técnico Superior en Programación de la Producción en Fabricación Mecánica',
        },
        {
            label: 'Técnico Superior en Programación de la Producción en Moldeo de Metales y Polímeros',
            value: 'Técnico Superior en Programación de la Producción en Moldeo de Metales y Polímeros',
        },
        { label: 'Técnico Superior en Prótesis Dentales', value: 'Técnico Superior en Prótesis Dentales' },
        {
            label: 'Técnico Superior en Proyectos de Edificación',
            value: 'Técnico Superior en Proyectos de Edificación',
        },
        { label: 'Técnico Superior en Proyectos de Obra Civil', value: 'Técnico Superior en Proyectos de Obra Civil' },
        {
            label: 'Técnico superior en Promoción de Igualdad de Género',
            value: 'Técnico superior en Promoción de Igualdad de Género',
        },
        { label: 'Técnico Superior en Química Industrial', value: 'Técnico Superior en Química Industrial' },
        {
            label: 'Técnico Superior en Química y Salud Ambiental',
            value: 'Técnico Superior en Química y Salud Ambiental',
        },
        {
            label: 'Técnico Superior en Radioterapia y Dosimetría',
            value: 'Técnico Superior en Radioterapia y Dosimetría',
        },
        {
            label: 'Técnico Superior en Realización de Proyectos Audiovisuales y Espectáculos',
            value: 'Técnico Superior en Realización de Proyectos Audiovisuales y Espectáculos',
        },
        {
            label: 'Técnico Superior en Sistemas de Telecomunicaciones e Informáticos',
            value: 'Técnico Superior en Sistemas de Telecomunicaciones e Informáticos',
        },
        {
            label: 'Técnico Superior en Sistemas Electrotécnicos y Automatizados',
            value: 'Técnico Superior en Sistemas Electrotécnicos y Automatizados',
        },
        {
            label: 'Técnico Superior en Sonido para Audiovisuales y Espectáculos',
            value: 'Técnico Superior en Sonido para Audiovisuales y Espectáculos',
        },
        { label: 'Técnico Superior en Termalismo y Bienestar', value: 'Técnico Superior en Termalismo y Bienestar' },
        {
            label: 'Técnico Superior en Transporte Marítimo y Pesca de Altura',
            value: 'Técnico Superior en Transporte Marítimo y Pesca de Altura',
        },
        { label: 'Técnico Superior en Transporte y Logística', value: 'Técnico Superior en Transporte y Logística' },
        {
            label: 'Técnico Superior en Vestuario a Medida y de Espectáculos',
            value: 'Técnico Superior en Vestuario a Medida y de Espectáculos',
        },
        { label: 'Técnico Superior en Vitivinicultura', value: 'Técnico Superior en Vitivinicultura' },
    ];

    public static SECURE2FA_MODES = [{ label: 'Código 6 cifras', value: 'code' }];

    public static DIARY_TYPES = [
        // Incidencias
        { label: '🟠 Incidencias - No coge bandeja del almuerzo', value: 1, color: '#FFCC00' },
        { label: '🟠 Incidencias - No coge bandeja de la cena', value: 2, color: '#FFCC00' },
        { label: '🟠 Incidencias - Retraso', value: 3, color: '#FFCC00' },
        { label: '🟠 Incidencias - No pasa la tarjeta', value: 4, color: '#FFCC00' },
        { label: '🟠 Incidencias - Asiste al estudio o llega tarde', value: 5, color: '#FFCC00' },
        { label: '🟠 Incidencias - No firma el permiso de almuerzo tarde', value: 6, color: '#FFCC00' },
        { label: '🟠 Incidencias - Conducta grave', value: 7, color: '#FFCC00' },

        // 🩺 Enfermedad
        { label: '🩺 Enfermedad - Asiste al médico', value: 8, color: '#E53935' },
        { label: '🩺 Enfermedad - Se marcha a casa por enfermedad', value: 9, color: '#E53935' },
        { label: '🩺 Enfermedad - Se queda en la habitación con permiso', value: 10, color: '#E53935' },

        // 📚 Estudio
        { label: '📚 Estudio - Pide permiso para estudio nocturno', value: 11, color: '#3F51B5' },
        { label: '📚 Estudio - No asiste', value: 12, color: '#3F51B5' },
        { label: '📚 Estudio - Llega tarde', value: 13, color: '#3F51B5' },

        // 🏠 Habitación
        { label: '🏠 Habitación - Cambio de habitación', value: 14, color: '#8E24AA' },

        // 🍽️ Alimentación
        { label: '🍽️ Alimentación - Necesita desayunar antes', value: 15, color: '#43A047' },
        { label: '🍽️ Alimentación - Necesita bandeja en el almuerzo', value: 16, color: '#43A047' },
        { label: '🍽️ Alimentación - Necesita bandeja en la cena', value: 17, color: '#43A047' },
        { label: '🍽️ Alimentación - Necesita dieta blanda', value: 18, color: '#43A047' },
        { label: '🍽️ Alimentación - Necesita dieta especial', value: 19, color: '#43A047' },
    ];
}
