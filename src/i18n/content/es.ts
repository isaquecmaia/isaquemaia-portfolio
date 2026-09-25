import type { ContentOverride } from '../content';

// Español. Solo el texto vive aquí; estructura, enlaces, colores y logos vienen de la base en portugués.
export const es: ContentOverride = {
    profile: {
        role: 'Inteligencia de Negocios · BI, FP&A y Operaciones',
        city: 'Belo Horizonte, Brasil',
        thesis: 'Construyo la infraestructura de datos y las herramientas internas de una fintech de pagos: del pipeline diario al estado de resultados, del CRM al tablero de la dirección.',
        facts: [
            { label: 'Actualmente', value: 'Virtù Pagamentos (antes Pagaa)' },
            { label: 'Enfoque', value: 'BI, FP&A, Customer Success y automatización' },
            { label: 'Base', value: 'Belo Horizonte, Brasil' },
            { label: 'Estado', value: 'Abierto a conversar' },
        ],
        kpis: [
            { label: 'commits en la plataforma interna', note: 'Sistema propio que reemplazó a Looker Studio, construido entre abril y septiembre de 2026.' },
            { label: 'de 3.102 filas sin divergencias', note: 'Motor de margen contrastado con el informe oficial del adquirente, agosto de 2026.' },
            { label: 'actualización diaria automatizada', note: 'Pipeline en Python que lee la API del adquirente y reconstruye el DW, las comisiones y el scorecard.' },
            { label: 'minutos por revisión de calidad, con IA', note: 'Proyecto de automatización de revisiones de atención en QuintoAndar, 2025.' },
        ],
        about: [
            'Empecé como aprendiz en Expertise, analizando y validando encuestas, y allí desarrollé mi inglés. En QuintoAndar, en el área de Calidad y Capacitación, participé en el proyecto que usó IA para automatizar las revisiones de atención: cada análisis pasó de unos 40 a 3 minutos.',
            'Hoy, en Virtù (antes Pagaa), construí desde cero la infraestructura de BI de la empresa y la plataforma interna que reemplazó a Looker Studio. El alcance creció hacia FP&A: estado de resultados de la operación, proyecciones de caja y cuentas por cobrar, margen y unit economics. Sigo construyendo mi carrera en el camino de FP&A con datos.',
            'Lo que me mueve va más allá del cargo. Me gusta pensar en sistemas: entender cómo se conectan datos, producto, finanzas y operación, y convertir esa conexión en procesos más confiables y automatizados.',
        ],
        languages: [
            { name: 'Portugués', level: 'Nativo' },
            { name: 'Inglés', level: 'Avanzado' },
            { name: 'Español', level: 'Estudiando' },
        ],
    },
    experience: [
        {
            period: 'Desde 2025',
            sector: 'PayFac · antes Pagaa',
            role: 'Analista de Inteligencia de Negocios (contratista)',
            summary: 'Infraestructura de BI, herramientas internas y FP&A en una fintech de procesamiento de pagos.',
            outcomes: [
                'Infraestructura de BI construida desde cero: data warehouse, base de scorecard y un pipeline diario (D-1) que consolida los datos transaccionales de varios adquirentes.',
                'Migración de Looker Studio a una plataforma propia de tableros en React, Tailwind y Recharts, que lee directamente las bases del data warehouse.',
                'Tablero de Customer Success con un radar de riesgo en cuatro cuadrantes, que el equipo comercial usa para priorizar cuentas.',
                'FP&A: estado de resultados de la operación (ingreso bruto, costo del servicio, ingreso neto), proyecciones de flujo de caja y cuentas por cobrar, análisis de margen y unit economics.',
                'Pipeline de generación de leads con la Meta Ad Library y arquitectura propia de CRM y Customer Success dentro de la plataforma interna.',
            ],
        },
        {
            period: 'Mar a nov de 2025',
            sector: 'PropTech · 9 meses',
            role: 'Aprendiz, Efficiency Ops',
            summary: 'Calidad y Capacitación: revisiones de atención, análisis de calidad y seguimiento operativo.',
            outcomes: [
                'Proyecto de automatización de revisiones con IA: cada análisis pasó de unos 40 a 3 minutos, con más volumen revisado y más visibilidad del proceso.',
                'Revisiones de atención, análisis de calidad, mapeo de errores de la plataforma e informes y tableros de seguimiento.',
                'Mejoras de procesos, automatizaciones y controles internos con Google Sheets, Looker Studio, Notion y formularios automatizados.',
            ],
        },
        {
            period: 'Oct 2021 a mar 2023',
            sector: '1 año y 6 meses',
            role: 'Aprendiz, Asistente Administrativo',
            summary: 'Análisis y validación de encuestas, con los resultados consolidados en planillas.',
            outcomes: [
                'Análisis y validación de encuestas: evaluación de las entrevistas y de la conducción de cada proceso según los criterios de la empresa.',
                'Consolidación y seguimiento de los resultados en planillas, organizando los datos y los indicadores de las encuestas.',
                'Reuniones semanales de presentación y discusión de los resultados con el equipo.',
            ],
        },
    ],
    cases: [
        {
            title: 'La infraestructura de BI de una fintech PayFac, desde cero',
            dek: 'Un pipeline diario que lee al adquirente, limpia el histórico y entrega tres bases listas antes de que empiece la jornada.',
            period: 'Desde 2025',
            role: 'Diseño e implementación, de punta a punta',
            stack: ['Python', 'SQL', 'PostgreSQL (Supabase)', 'API del adquirente', 'Google Sheets'],
            context:
                'Cuando llegué, la operación dependía de planillas que cada adquirente enviaba en un formato distinto y de informes de comisiones armados a mano. Los tableros estaban en Looker Studio, y cada actualización exigía que alguien subiera un archivo.',
            problem:
                'Dirección, comercial y CS decidían sobre números que llegaban tarde y cambiaban según quién armara la planilla. Sin una base diaria confiable, no había forma de seguir el TPV, los ingresos o la salud de cada cliente.',
            choice:
                'En lugar de automatizar las planillas, las saqué del camino. Un pipeline en Python lee directamente la API del adquirente cada mañana y reconstruye las bases que consumen los tableros. Y reemplacé Looker Studio por una plataforma propia en React que lee esas bases sin intermediarios.',
            actions: [
                'Construí con IA el pipeline en Python: paginación y control de límite de solicitudes de la API, ejecución diaria (D-1) a las 6 h y reprocesamiento de ventanas pasadas cuando el adquirente corrige algo.',
                'Armé el data warehouse transaccional como una base de solo agregado, deduplicada por el identificador de cada transacción.',
                'Generé la base de comisiones con las cuentas por cobrar de los próximos 365 días y el scorecard de clientes, recalculado desde cero en cada ejecución.',
                'Apliqué reglas de ingreso por método de pago (crédito, débito, PIX y boleto) a partir de la tabla de tasas de cada cliente.',
                'Migré los tableros de Looker Studio a la plataforma propia en React, Tailwind y Recharts, leyendo las mismas bases en PostgreSQL (Supabase).',
            ],
            decisions: [
                {
                    title: 'Solo agregar, nunca sobrescribir',
                    body: 'El data warehouse crece por agregado y deduplica por el identificador de la transacción. Así se pueden reprocesar los últimos siete días cuando el adquirente corrige algo, sin duplicar nada y sin tocar el resto del histórico.',
                },
                {
                    title: 'La regla en el pipeline, no en el tablero',
                    body: 'Ingreso por método, estado del cliente y comisiones se calculan una sola vez, en el pipeline. Los tableros solo leen. Así dos pantallas nunca muestran números distintos para la misma pregunta.',
                },
                {
                    title: 'Estado del cliente por regla explícita',
                    body: 'Onboarding, ramp-up y activo se definen con umbrales documentados de volumen y de tiempo desde la primera venta. Cuando alguien pregunta por qué un cliente cambió de nivel, la respuesta está en la regla.',
                },
                {
                    title: 'Publicación atómica',
                    body: 'La carga en la base reemplaza todo o no reemplaza nada. Un fallo a mitad de la carga ya no deja el tablero vacío hasta el siguiente reprocesamiento.',
                },
            ],
            figures: [
                { caption: 'Flujo diario: de la API del adquirente a las bases que consume la plataforma interna.' },
                { label: 'En pantalla', caption: 'Rendimiento consolidado, alimentado por las bases del pipeline. Pantalla real de la plataforma con datos ficticios, generados solo para esta muestra.' },
            ],
            outcome:
                'Se acabaron las cargas manuales. Cada día, antes de la jornada, el data warehouse, las comisiones y el scorecard están actualizados con el día anterior, y los tableros leen directamente de esas bases. Looker Studio salió de escena, y la plataforma propia pasó a ser el lugar donde la empresa sigue la operación.',
            results: [
                { label: 'actualización diaria, sin carga manual' },
                { label: 'bases reconstruidas por ejecución' },
                { label: 'días de cuentas por cobrar proyectadas' },
            ],
            retro: 'Haría la publicación atómica desde el primer día. Durante un tiempo, una carga que fallaba a mitad dejaba el tablero vacío hasta el reprocesamiento, y eso costó una confianza que se podría haber cuidado.',
        },
        {
            title: 'Conciliación financiera y el motor de margen',
            dek: 'Varios adquirentes, un solo número de ingresos y una fórmula heredada de una planilla que nadie había contrastado con la fuente.',
            period: '2025 y 2026',
            role: 'Investigación, diseño e implementación',
            context:
                'Cuando asumí el área, el estado de resultados dependía de cruzar a mano, cada día, los informes de los adquirentes con la base interna. El margen por transacción salía de una planilla con pestañas encadenadas, armada antes de mi llegada, y los números de TPV cambiaban después de informados.',
            problem:
                'El margen y los ingresos sostienen decisiones de precio y de cartera. Si el número cambia después del cierre, o no coincide con lo que facturó el adquirente, nadie sabe en qué versión confiar.',
            choice:
                'Saqué la regla de margen de la planilla y especifiqué un motor de cálculo aislado y testeable, implementado con IA. Y, en lugar de contrastarlo con la planilla heredada, lo contrasté con la única fuente que no puede estar equivocada: el informe oficial del adquirente.',
            actions: [
                'Automaticé la consolidación de los adquirentes con validación de integridad del schema e informes estructurados para el análisis del estado de resultados.',
                'Investigué las discrepancias de volumen y encontré contracargos procesados con fecha retroactiva, que alteraban el TPV de días ya informados.',
                'Recalibré las métricas y ajusté el proceso de reporting para reflejar los datos corregidos.',
                'Pasé la regla de margen, que vivía en pestañas de planilla, a un motor de cálculo aislado y testeable.',
                'Contrasté el motor con el informe oficial del adquirente de agosto de 2026 y corregí la fórmula que venía de la planilla heredada, que no coincidía con la cuenta real.',
            ],
            decisions: [
                {
                    title: 'Contrastar con la fuente oficial, no con la planilla',
                    body: 'La primera versión del motor reproducía fielmente la planilla heredada y coincidía con ella en todas las filas. Aun así, las dos estaban mal: la fórmula original aplicaba un factor que el adquirente no aplica. Validar con el informe oficial reemplazó esa cuenta por una resta simple, con 3.102 de 3.102 filas sin divergencias.',
                },
                {
                    title: 'Fallar en voz alta, no corregir en silencio',
                    body: 'Un lote fuera del schema se rechaza y aparece como alerta, en vez de corregirse automáticamente. Cuesta un paso más, pero nadie descubre semanas después que un número fue inventado.',
                },
                {
                    title: 'Contracargos en el mes del evento',
                    body: 'Contracargos y disputas se cuentan en el mes en que ocurrieron, no en el mes de la venta. Esa convención, aplicada igual en todas las pantallas, terminó con la sensación de que el pasado cambiaba solo.',
                },
            ],
            figures: [
                { caption: 'Pipeline de conciliación con validación y clasificación de divergencias.' },
                { caption: 'TPV informado frente a ajustado después de contracargos retroactivos. Datos ilustrativos.' },
            ],
            outcome:
                'Se acabó el procesamiento manual diario, y el margen calculado pasó a ser el margen que el adquirente realmente facturó: 3.102 de 3.102 filas del informe de agosto de 2026 sin divergencias. Con los contracargos contados en el mes del evento, el TPV ya informado dejó de cambiar solo.',
            results: [
                { label: 'de 3.102 filas sin divergencias' },
                { value: 'Cero', label: 'procesamiento manual diario' },
                { label: 'convención de contracargos en todas las pantallas' },
            ],
            retro: 'Validaría con el informe oficial del adquirente ya en la primera versión del motor. La planilla heredada parecía correcta justamente porque todo el mundo la usaba desde hacía tiempo.',
        },
        {
            title: 'De la planilla al sistema: la plataforma interna de Virtù',
            dek: 'Empezó como el reemplazo de Looker Studio por tableros propios. En cinco meses se convirtió en el sistema donde opera la empresa.',
            period: 'Abr a sep de 2026',
            role: 'Producto, especificación e implementación con IA',
            access: 'Sistema interno con acceso restringido y código privado. Las pantallas de abajo funcionan con datos ficticios, sin información de clientes.',
            context:
                'La empresa seguía el rendimiento en tableros de Looker Studio alimentados por planillas, y el CRM vivía en Notion, sin conexión con lo que cada cliente realmente transaccionaba. Cada pregunta nueva de la dirección o del área comercial terminaba en otra planilla.',
            problem:
                'Cada equipo miraba una fuente distinta y nadie veía al cliente completo: qué transaccionaba, cuánto margen dejaba y en qué etapa estaba. Reunir rendimiento, clientes, comisiones, caja y embudo comercial en un solo lugar se volvió una condición para decidir rápido.',
            choice:
                'En lugar de otra herramienta lista, especifiqué el sistema y lo construí con IA, sobre las mismas bases del pipeline D-1. Front en React y TypeScript, API propia en Express y base de datos en Supabase con permisos por perfil. Las reglas de negocio (margen, cadencia del CRM, radar de CS) viven en funciones aisladas que se pueden probar sin tocar la base.',
            actions: [
                'Tableros de TPV, ingresos y margen por cliente, vendedor y adquirente, con lecturas semanales y mensuales y un forecast con metas editables.',
                'Customer Success con un radar de riesgo en cuatro cuadrantes y alertas diarias automáticas para las cuentas que requieren atención.',
                'CRM propio: embudo de etapas, kanban de activación, ficha del cliente con lo transaccionado y el margen real, alianzas con comisión por negociación y la cola de acciones del día.',
                'Weekly Review conectada al CRM, con Pipe Report y composición de TPV y margen.',
                'Área financiera con comisiones, caja con los pagos del adquirente ejecución por ejecución y el motor de margen.',
                'Seguridad de sistema interno: tokens de acceso de corta duración, protección CSRF, RLS en la base e intentos de inicio de sesión limitados.',
            ],
            decisions: [
                {
                    title: 'Reglas de negocio puras, base de datos en los bordes',
                    body: 'El motor de margen, la cadencia del CRM y el radar de CS son funciones sin acceso a la base, testeables con datos de ejemplo. Las rutas solo leen y escriben. Cambiar una regla no exige tocar la infraestructura.',
                },
                {
                    title: 'Conciliar en lugar de acumular',
                    body: 'La cadencia del CRM no crea tareas: describe las que deberían existir y guarda solo la diferencia. Ejecutarla dos veces seguidas crea cero tareas la segunda vez, y esa es la prueba principal del motor.',
                },
                {
                    title: 'Semana parcial contra semana parcial',
                    body: 'La comparación semanal mira la semana anterior solo hasta el mismo día de la semana de hoy. Un lunes ya no se compara con una semana completa y nadie se asusta sin motivo.',
                },
            ],
            figures: [
                { caption: 'Mapa de la plataforma: las áreas del sistema y lo que resuelve cada una.' },
                { label: 'Customer Success', caption: 'Radar de riesgo: Alerta, Atención, Silencio, Pre-churn y OK, con la cartera detallada justo debajo. Los tres primeros salen de los cuatro cuadrantes; Silencio y Pre-churn marcan cuentas inactivas. Pantalla real de la plataforma con datos ficticios, generados solo para esta muestra.' },
                { label: 'La regla del radar', caption: 'Los cuatro cuadrantes cruzan el cumplimiento de la meta de TPV con el de la meta de margen y generan tres estados: OK, Atención (cuando solo falla una de las metas, en dos cuadrantes) y Alerta. Silencio y Pre-churn quedan fuera del radar: marcan cuentas sin transacciones hace 5 días o más. Puntos ilustrativos.' },
                { label: 'CRM', caption: 'Acciones de hoy: la cola armada por la cadencia del CRM, ordenada por plazo, escalamiento e ingresos en riesgo. Pantalla real de la plataforma con datos ficticios, generados solo para esta muestra.' },
                { label: 'Rituales', caption: 'Lectura semanal de ingresos y margen frente a la semana anterior comparable y la meta. Pantalla real de la plataforma con datos ficticios, generados solo para esta muestra.' },
            ],
            outcome:
                'La plataforma pasó a ser el lugar donde trabaja toda la empresa. Looker Studio y el CRM en Notion se apagaron, y dirección, comercial, CS y finanzas empezaron a mirar los mismos números. Rituales como la Weekly Review y el cierre de comisiones se volvieron más rápidos, y el radar de CS empezó a señalar las cuentas en riesgo antes de que dejaran de transaccionar.',
            results: [{ label: 'herramientas reemplazadas: Looker Studio y el CRM en Notion' }, { label: 'áreas en una sola plataforma' }, { label: 'commits en cinco meses' }],
            retro: 'Separaría desde el principio las reglas que comparten la pantalla y el servidor. Hoy el radar de CS y la lectura semanal existen en dos copias, una de cada lado, y cada cambio de regla hay que replicarlo a mano.',
        },
    ],
    capabilities: [
        {
            title: 'Datos',
            items: [
                { name: 'SQL · PostgreSQL', where: 'Data warehouse y bases en Supabase' },
                { name: 'Python', where: 'Pipeline D-1 y reconstrucción de bases' },
                { name: 'APIs de adquirentes', where: 'Extracción paginada y diaria' },
                { name: 'Modelado de datos', where: 'DW transaccional, scorecard, CRM' },
                { name: 'Calidad de datos', where: 'Validación de schema antes de los tableros' },
            ],
        },
        {
            title: 'BI y FP&A',
            items: [
                { name: 'Tableros propios', where: 'Plataforma interna en React y Recharts' },
                { name: 'Estado de resultados y flujo de caja', where: 'FP&A de la operación, cuentas por cobrar' },
                { name: 'Margen y unit economics', where: 'Motor de margen, análisis para la dirección' },
                { name: 'Excel · Google Sheets', where: 'Análisis y rutinas de la operación' },
                { name: 'Looker Studio', where: 'Tableros anteriores, QuintoAndar' },
            ],
        },
        {
            title: 'Automatización e IA',
            items: [
                { name: 'IA en revisiones de calidad', where: 'QuintoAndar, de 40 a 3 minutos' },
                { name: 'Alertas automáticas', where: 'Radar diario de Customer Success' },
                { name: 'Meta Ad Library', where: 'Pipeline de leads para PayFac' },
                { name: 'Notion', where: 'CRM y CS antes del sistema propio' },
            ],
        },
        {
            title: 'Especificación e IA',
            items: [
                { name: 'Especificación técnica', where: 'Requisitos, reglas y casos de prueba de la plataforma' },
                { name: 'Arquitectura de datos', where: 'Modelo del DW, bases y permisos por perfil' },
                { name: 'Implementación con IA', where: 'Plataforma interna y este sitio, en React y TypeScript' },
                { name: 'Validación técnica', where: 'Revisión del resultado y contraste con fuentes oficiales' },
            ],
        },
    ],
    certificates: [{ date: 'oct 2025' }, { title: 'Análisis de Datos', date: 'ago 2025' }],
    recommendations: [
        {
            relation: 'Supervisor directo',
            date: 'nov 2025',
            excerpt: 'Isaque es un profesional ejemplar, sumamente organizado, comprometido con los plazos y con entregas siempre consistentes.',
            full: [
                'Muestra un gran interés por la innovación y la creatividad, y es una persona naturalmente curiosa, lo que lo distingue de los demás.',
                'Tiene una energía positiva contagiosa y una actitud colaborativa admirable, siempre dispuesto a compartir conocimientos y a contribuir al desarrollo del equipo.',
                'Sus principales habilidades incluyen: comunicación clara y eficaz; flexibilidad ante los cambios; apertura a la retroalimentación constructiva; gran dominio de procesos, documentación, calidad, mejora continua y capacitación.',
                'En resumen, Isaque es un profesional completo, con mentalidad de crecimiento y un espíritu de equipo que marca la diferencia en cualquier entorno de trabajo.',
            ],
        },
    ],
    sectionTitles: {
        trabalho: 'Trabajo seleccionado',
        experiencia: 'Experiencia',
        ferramentas: 'Cómo trabajo',
        sobre: 'Sobre mí',
        correspondencias: 'Correspondencia',
        formacao: 'Formación',
    },
    ticker: ['Pipeline D-1', 'Data warehouse', 'Estado de resultados', 'Radar de Customer Success', 'Motor de margen', 'CRM propio', 'Flujo de caja y cuentas por cobrar', 'Weekly Review', 'Automatización con IA', 'Unit economics'],
    figures: {
        biFlow: [
            { title: 'Fuentes', nodes: ['API del adquirente', 'Tabla de tasas por cliente', 'Registro de clientes'] },
            { title: 'Pipeline D-1', nodes: ['Extracción paginada', 'Deduplicación por transacción', 'Ingreso por método'] },
            { title: 'Bases', nodes: ['DW transaccional', 'Comisiones y cuentas por cobrar', 'Scorecard de clientes'] },
            { title: 'Base de datos', nodes: ['PostgreSQL en Supabase', 'Publicación atómica', 'Permisos por perfil'] },
            { title: 'Consumo', nodes: ['Plataforma interna', 'Customer Success', 'FP&A y dirección'] },
        ],
        reconFlow: [
            { title: 'Entrada', nodes: ['Informes de los adquirentes', 'Base interna'] },
            { title: 'Validación', nodes: ['Tipos y campos', 'Fechas y moneda', 'Lote inválido → alerta'] },
            { title: 'Cruce', nodes: ['Clave exacta', 'Aproximado, marcado', 'Transacción por transacción'] },
            { title: 'Divergencias', nodes: ['Monto', 'Fecha', 'Estado', 'Ausente'] },
            { title: 'Salida', nodes: ['Estado de resultados consolidado', 'TPV informado + ajustado'] },
        ],
        platformMap: [
            { title: 'Rendimiento', items: ['TPV, ingresos y margen', 'Lecturas semanales y mensuales', 'Forecast con metas'] },
            { title: 'Customer Success', items: ['Radar de riesgo', 'Alertas diarias', 'Vista por cliente'] },
            { title: 'CRM', items: ['Embudo y activación', 'Ficha del cliente', 'Alianzas y acciones del día'] },
            { title: 'Rituales', items: ['Weekly Review', 'Pipe Report', 'Ajustes de la semana'] },
            { title: 'Finanzas', items: ['Comisiones', 'Caja y pagos', 'Motor de margen'] },
            { title: 'Datos', items: ['Transacciones', 'Glosario de métricas', 'Cargas atómicas'] },
        ],
        radar: {
            aria: 'Esquema del radar de Customer Success en cuatro cuadrantes',
            ok: 'OK',
            attention: 'ATENCIÓN',
            alert: 'ALERTA',
            xAxis: 'META DE TPV CUMPLIDA →',
            yAxis: 'META DE MARGEN →',
            legend: [
                ['OK', 'Metas de TPV y de margen cumplidas.'],
                ['Atención', 'Una de las dos metas fuera de objetivo.'],
                ['Alerta', 'Las dos por debajo: acción inmediata.'],
                ['Silencio', 'De 5 a 20 días sin transacciones.'],
                ['Pre-churn', '21 días o más sin transacciones.'],
            ],
        },
        gap: { aria: 'Gráfico ilustrativo de TPV informado frente a ajustado', reported: 'TPV informado en el día', adjusted: 'TPV ajustado', day: 'día' },
        shots: {
            cs: 'Pantalla de Customer Success con el radar de riesgo y la tabla de la cartera',
            acoes: 'Pantalla de acciones de hoy del CRM con la cola de tareas por cliente',
            weekly: 'Tablero semanal de ingresos y margen con la meta de la semana',
            performance: 'Pantalla de rendimiento consolidado con TPV, ingresos, margen y tasa de aprobación',
        },
    },
};
