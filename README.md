# UNGraduado

Proyecto orientado a la gestión de planes de estudio, materias y prerequisitos académicos. La estructura actual del repositorio está organizada en tres bloques principales: configuración del editor, backend Java y base de datos SQL.

## Estructura del repositorio

<<<<<<< HEAD
```text
ED_UNGraduado/
├── .vscode/                 # Ajustes de VS Code
├── backend/                 # Aplicación Java y lógica de dominio
│   ├── src/main/java/       # Modelos, servicios, repositorios y estructuras
│   ├── src/main/resources/  # Configuración de Spring
│   └── src/test/java/       # Pruebas
├── frontend/                # Interfaz React construida con Vite
│   └── src/
│       ├── components/      # Componentes reutilizables
│       ├── pages/           # Vistas de los planes
│       ├── routes/          # Definición de rutas
│       └── services/        # Clientes para llamadas HTTP
├── Sql/                     # Diagrama y scripts de base de datos
└── README.md
```
=======
## LINK VIDEO SEGUNDA ENTREGA
https://youtu.be/ED8TqQvXHfs

## Integrantes
>>>>>>> d2d8041 (LINK DEL VIDEO - SEGUNDA ENTREGA)

## Componentes

### Frontend (`frontend/`)

Interfaz desarrollada con React 19 y Vite. El código actual incluye:

- `src/App.jsx`: flujo principal para seleccionar un plan, consultar materias, preparar una malla personalizada y ver materias inscritas o aprobadas. Valida prerrequisitos y un límite de créditos en la selección del semestre.
- `src/pages/`: vistas para inicio, resumen del plan, materias, prerrequisitos, configuración y simulación de semestres.
- `src/components/`: elementos reutilizables, como botones y componentes de plan académico.
- `src/routes/AppRoutes.jsx`: definición de rutas para las vistas del plan.
- `src/services/`: funciones para realizar solicitudes al backend.
- Archivos CSS por componente y página, además de estilos globales.

La configuración por plan de materias por semestre se guarda en `localStorage`. El límite de créditos configurable aún no está habilitado en la pantalla.

### Backend (`backend/`)

Aplicación Java 17 con Spring Boot, Maven, Spring Data JPA y el conector de MySQL.

- `src/main/java/com/UNGraduado/backend/models/`: entidades JPA `Materia`, `PlanEstudio`, `MateriaPorPlan` y `Prerrequisito`.
- `repositories/`: repositorios Spring Data para acceder a materias y planes.
- `services/`: interfaces e implementaciones para operaciones de materias y planes, incluidos créditos totales y materias de un plan.
- `dto/`: objetos de transferencia para representar materias y créditos de planes.
- `datastructures/`: lista enlazada y colas propias; `KahnSemesterCalculator` usa estas estructuras y el algoritmo de Kahn para agrupar materias por semestre y detectar ciclos en los prerrequisitos.
- `BackendApplication.java`: punto de entrada de Spring Boot.
- `src/test/java/`: pruebas existentes para la aplicación y las estructuras de datos.
- `pom.xml` y `mvnw`/`mvnw.cmd`: configuración Maven y wrapper para ejecutar Maven sin instalarlo globalmente.

**Estado de integración:** no hay controladores REST en el código fuente actual. Por tanto, aunque los servicios y el frontend contienen llamadas HTTP, los endpoints que espera la interfaz todavía no están expuestos por el backend.

### Base de datos (`Sql/`)

- `ModeloRelacional.png`: diagrama de las tablas `PlanEstudio`, `Materia`, `MateriaPorPlan` y `Prerequisito`.
- `Sql_code`: crea el esquema `graduacion`, las tablas y sus claves primarias y foráneas.
- `Sql_dataInsertion`: carga planes, materias, asociaciones y prerrequisitos de ejemplo.

**Precaución:** `Sql_code` comienza eliminando el esquema `graduacion` si ya existe. Ejecutarlo borra sus datos actuales; úsalo solo en un entorno de desarrollo y después de confirmar que no necesitas conservar esa base.

### Configuración del editor (`.vscode/`)

`settings.json` contiene ajustes de VS Code para el análisis de nulidad de Java.

## Requisitos

- Java 17 o superior.
- Node.js compatible con Vite 8 (Node.js 20.19+ o 22.12+ recomendado) y npm.
- MySQL para crear y cargar el esquema si se va a trabajar con datos persistentes.
- No es necesario instalar Maven globalmente: el wrapper está incluido en `backend/`.

## Puesta en marcha

### 1. Preparar la base de datos

Desde un cliente MySQL, revisa `Sql/Sql_code` y ejecútalo solo si puedes reemplazar el esquema `graduacion`. Luego ejecuta `Sql/Sql_dataInsertion` para cargar los datos de ejemplo.

### 2. Configurar y ejecutar el backend

La configuración actual de `backend/src/main/resources/application.properties` solo establece el nombre de la aplicación; los parámetros de conexión a MySQL están comentados. Antes de iniciar el backend, configura allí la URL, el usuario y la contraseña de una base de datos local (no subas credenciales al repositorio).

En Windows PowerShell:

```powershell
cd backend
.\mvnw.cmd test
.\mvnw.cmd spring-boot:run
```

En macOS o Linux:

```bash
cd backend
./mvnw test
./mvnw spring-boot:run
```

### 3. Instalar y ejecutar el frontend

```bash
cd frontend
npm ci
npm run dev
```

Vite muestra en la terminal la dirección local para abrir en el navegador. Otros comandos disponibles desde `frontend/`:

```bash
npm run build
npm run lint
npm run preview
```

## Pendientes conocidos

- Completar los controladores REST requeridos por el frontend y conectar esas rutas con los servicios del backend.
- Configurar la conexión a MySQL antes de iniciar la aplicación con persistencia.
- Revisar la configuración del frontend: sus páginas usan `react-router-dom` y `react-icons`, que no aparecen declaradas en `frontend/package.json`; además, `Home.jsx` importa `src/components/SearchBar`, archivo que no está presente en la estructura actual. La aplicación principal montada por `src/main.jsx` es `App.jsx`, no `AppRoutes.jsx`.
- Unificar las URL base del backend: los helpers usan por defecto el puerto `8080`, mientras que las páginas consultan `localhost:8088`.

Por estos pendientes, el frontend y el backend aún no constituyen un flujo integrado listo para ejecución de extremo a extremo.
