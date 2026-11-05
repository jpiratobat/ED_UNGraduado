# ED_UNGraduado

Proyecto orientado a la gestión de planes de estudio, materias y prerequisitos académicos. La estructura actual del repositorio está organizada en tres bloques principales: configuración del editor, backend Java y base de datos SQL.

## Estructura del proyecto

```text
ED_UNGraduado/
├── .vscode/
│   └── settings.json
├── backend/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   └── src/
│       ├── main/
│       │   ├── java/com/UNGraduado/backend/
│       │   └── resources/application.properties
│       └── test/java/com/UNGraduado/backend/
├── Sql/
│   ├── ModeloRelacional.png
│   ├── Sql_code
│   └── Sql_dataInsertion
├── README.md
└── .git/
```

## Descripción de cada carpeta

### `.vscode/`
Contiene la configuración específica del editor para trabajar con el proyecto.

- `settings.json`: ajustes del entorno de VS Code; en este caso, habilita el análisis nulo automático para Java y mejora la experiencia de desarrollo.

### `backend/`
Es el módulo principal del sistema. Aquí se encuentra la API desarrollada en Java con Spring Boot.

#### Subestructura

- `pom.xml`: configuración de Maven con dependencias del proyecto, versiones y elementos del build.
- `src/main/java/`: código fuente de la aplicación.
  - `BackendApplication.java`: clase principal del backend, encargada de iniciar Spring Boot.
  - `com/UNGraduado/backend/datastructures/`: implementaciones de estructuras de datos como `Stack` y `QueueSinglyLinkedList`.
- `src/main/resources/application.properties`: configuración general de la aplicación.
- `src/test/java/`: pruebas del sistema.
  - `models/`: entidades del dominio, tales como `Materia`, `PlanEstudio`, `MateriaPorPlan` y `Prerrequisito`.
  - `datastructures/`: tests para verificar el comportamiento de las estructuras de datos.

#### Función
Esta carpeta concentra la lógica de negocio y el modelo académico del proyecto. Permite representar materias, planes de estudio y sus relaciones, además de soportar estructuras auxiliares para algoritmos o manipulación de datos.

### `Sql/`
Contiene la parte de persistencia y definición del modelo de datos relacional.

- `ModeloRelacional.png`: diagrama visual del esquema de la base de datos.
- `Sql_code`: script SQL para crear la base de datos y las tablas principales.
- `Sql_dataInsertion`: script de inserción de datos iniciales con materias, planes de estudio y prerequisitos.

#### Función
Define la estructura relacional del sistema y sirve como base para almacenar la información académica que maneja el backend.

## Objetivo general del proyecto
El repositorio busca apoyar la administración académica mediante la representación de:
- planes de estudio,
- materias,
- relación entre materias y planes,
- y prerequisitos entre cursos.

Actualmente, la base del proyecto ya incluye la parte del backend, la estructura del modelo de datos y la configuración mínima para comenzar a desarrollar la aplicación.

## Estado actual
El proyecto se encuentra en una fase inicial de desarrollo, pero con una estructura base ya definida y organizada para continuar con la implementación funcional.
