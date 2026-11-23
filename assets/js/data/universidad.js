/* =========================================================================
   Ejercicios del bloque Universidad.
   El código SQL se mantiene literal, tal y como figura en sql/universidad.sql.
   Categorías disponibles: "ddl" | "dml" | "join"
   ========================================================================= */
window.EXERCISES_UNIVERSIDAD = {
  id: "universidad",
  titulo: "Ejercicios Universidad",
  descripcion:
    "Base de datos académica con carreras, materias, estudiantes y profesores. Se practica la creación de tablas, claves foráneas, inserción de datos y los distintos tipos de JOIN.",
  sqlFile: "sql/universidad.sql",
  categorias: [
    { id: "ddl", nombre: "DDL · Estructura" },
    { id: "dml", nombre: "DML · Datos" },
    { id: "join", nombre: "JOIN · Consultas" }
  ],
  ejercicios: [
    {
      titulo: "Crear la base de datos universidad",
      enunciado:
        "Crea la base de datos universidad con el juego de caracteres utf8mb4 y selecciónala para trabajar.",
      categoria: "ddl",
      sql: `CREATE DATABASE IF NOT EXISTS universidad
DEFAULT CHARACTER SET utf8mb4;

USE universidad;`
    },
    {
      titulo: "Crear la tabla carreras",
      enunciado:
        "Crea la tabla carreras con un identificador autoincremental como clave primaria y el nombre de la carrera.",
      categoria: "ddl",
      sql: `-- CREAR TABLA CARRERAS
CREATE TABLE carreras (
    id_carrera INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);`
    },
    {
      titulo: "Crear la tabla materia",
      enunciado:
        "Crea la tabla materia con su identificador, el nombre de la materia y la referencia a la carrera.",
      categoria: "ddl",
      sql: `-- CREAR TABLA MATERIAS 
CREATE TABLE materia (
id_materia INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
id_carrera
);`
    },
    {
      titulo: "Añadir la clave foránea a materia",
      enunciado:
        "Añade a la tabla materia la columna id_carrera con una restricción de clave foránea hacia carreras y verifica la estructura resultante.",
      categoria: "ddl",
      sql: `-- AÑADIR CLAVE FORÁNEA A MATERIA
ALTER TABLE materia
ADD COLUMN id_carrera INT,
ADD CONSTRAINT fk_materia_carrera
    FOREIGN KEY (id_carrera)
    REFERENCES carreras(id_carrera);

-- VERIFICAR
DESCRIBE materia;

SHOW CREATE TABLE materia;`
    },
    {
      titulo: "Insertar 3 carreras",
      enunciado:
        "Inserta tres carreras (Informática, Medicina y Derecho) y comprueba el contenido de la tabla.",
      categoria: "dml",
      sql: `-- INSERTAR 3 CARRERAS
INSERT INTO carreras (nombre)
VALUES
    ('Informática'),
    ('Medicina'),
    ('Derecho');

 SELECT id_carrera, nombre
FROM carreras;`
    },
    {
      titulo: "Insertar 3 materias",
      enunciado:
        "Inserta tres materias asociadas a las carreras anteriores y comprueba el contenido de la tabla.",
      categoria: "dml",
      sql: `-- INSERTAR 3 MATERIAS
INSERT INTO materia (nombre, id_carrera)
VALUES
    ('Programación', 1),
    ('Anatomía', 2),
    ('Derecho Civil', 3);

SELECT id_materia, nombre, id_carrera
FROM materia;`
    },
    {
      titulo: "INNER JOIN entre carreras y materias",
      enunciado:
        "Obtén cada carrera junto a su materia mediante un INNER JOIN y verifica el resultado mostrando también los identificadores.",
      categoria: "join",
      sql: `-- INNER JOIN
SELECT
    c.nombre AS carrera,
    m.nombre AS materia
FROM carreras AS c
INNER JOIN materia AS m
    ON c.id_carrera = m.id_carrera;

-- VERIFICAR JOIN
SELECT
    c.id_carrera,
    c.nombre AS carrera,
    m.id_materia,
    m.nombre AS materia
FROM carreras AS c
INNER JOIN materia AS m
    ON c.id_carrera = m.id_carrera;`
    },
    {
      titulo: "Crear la tabla estudiantes",
      enunciado:
        "Crea la tabla estudiantes con clave primaria autoincremental y clave foránea hacia carreras.",
      categoria: "ddl",
      sql: `-- CREAR TABLA ESTUDIANTES
CREATE TABLE estudiantes (
    id_estudiante INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_carrera INT,
    CONSTRAINT fk_estudiantes_carreras
        FOREIGN KEY (id_carrera)
        REFERENCES carreras(id_carrera)
);`
    },
    {
      titulo: "Insertar 4 estudiantes",
      enunciado:
        "Inserta cuatro estudiantes asociados a sus carreras y comprueba el contenido de la tabla.",
      categoria: "dml",
      sql: `-- INSERTAR 4 ESTUDIANTES
INSERT INTO estudiantes (nombre, id_carrera)
VALUES
    ('Ana García', 1),
    ('Pedro López', 2),
    ('María Martínez', 3),
    ('Juan Pérez', 1);

-- VERIFICAR
SELECT
    id_estudiante,
    nombre,
    id_carrera
FROM estudiantes;`
    },
    {
      titulo: "INNER JOIN entre estudiantes y carreras",
      enunciado:
        "Muestra cada estudiante con su carrera mediante un INNER JOIN y verifica el resultado con los identificadores.",
      categoria: "join",
      sql: `-- INNER JOIN ESTUDIANTES Y CARRERAS
SELECT
    e.nombre AS estudiante,
    c.nombre AS carrera
FROM estudiantes AS e
INNER JOIN carreras AS c
    ON e.id_carrera = c.id_carrera;

 -- VERIFICAR INNER JOIN ESTUDIANTES Y CARRERAS
SELECT
    e.id_estudiante,
    e.nombre AS estudiante,
    e.id_carrera,
    c.nombre AS carrera
FROM estudiantes AS e
INNER JOIN carreras AS c
    ON e.id_carrera = c.id_carrera;`
    },
    {
      titulo: "Crear la tabla profesores",
      enunciado:
        "Crea la tabla profesores con claves foráneas hacia carreras y materia.",
      categoria: "ddl",
      sql: `-- CREAR TABLA PROFESORES
CREATE TABLE profesores (
    id_profesor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_carrera INT,
    id_materia INT,
    CONSTRAINT fk_profesores_carreras
        FOREIGN KEY (id_carrera)
        REFERENCES carreras(id_carrera),
    CONSTRAINT fk_profesores_materia
        FOREIGN KEY (id_materia)
        REFERENCES materia(id_materia)
);`
    },
    {
      titulo: "Insertar la carrera Biología",
      enunciado:
        "Inserta una nueva carrera sin estudiantes ni materias asociadas y comprueba el contenido de la tabla.",
      categoria: "dml",
      sql: `USE universidad;

-- INSERTAR CARRERA BIOLOGÍA
INSERT INTO carreras (nombre)
VALUES ('Biología');

SELECT
    id_carrera,
    nombre
FROM carreras;`
    },
    {
      titulo: "LEFT JOIN entre carreras y estudiantes",
      enunciado:
        "Muestra todas las carreras con sus estudiantes. Las carreras sin estudiantes (como Biología) aparecen con NULL.",
      categoria: "join",
      sql: `-- LEFT JOIN CARRERAS Y ESTUDIANTES
SELECT
    c.id_carrera,
    c.nombre AS carrera,
    e.nombre AS estudiante
FROM carreras AS c
LEFT JOIN estudiantes AS e
    ON c.id_carrera = e.id_carrera;`
    },
    {
      titulo: "LEFT JOIN entre carreras y materias",
      enunciado:
        "Muestra todas las carreras con sus materias, incluidas las carreras que no tienen materia asociada. La segunda consulta es de verificación.",
      categoria: "join",
      sql: `-- lEFT JOIN CARRERAS Y MATERIAS
SELECT
    c.id_carrera,
    c.nombre AS carrera,
    m.nombre AS materia
FROM carreras AS c
LEFT JOIN materia AS m
    ON c.id_carrera = m.id_carrera;

SELECT *
FROM carreras
LEFT JOIN materia
    ON carreras.id_carrera = materia.id_carrera;`
    },
    {
      titulo: "Insertar la materia Matematicas",
      enunciado:
        "Inserta una materia sin carrera asociada para observar después su comportamiento en los JOIN.",
      categoria: "dml",
      sql: ` -- INSERTAR MATERIA MATEMATICAS
INSERT INTO materia (nombre)
VALUES ('Matematicas');`
    },
    {
      titulo: "INNER JOIN con una materia sin carrera",
      enunciado:
        "Repite el INNER JOIN entre carreras y materias: la nueva materia no aparece porque no tiene carrera asociada.",
      categoria: "join",
      sql: `-- JOIN CARRERA Y MATERIAS COMO LA NUEVA MATERIA NO TIENE CARRERA NO SALE LA MATERIA EN EL JOIN
SELECT
    c.id_carrera,
    c.nombre AS carrera,
    m.nombre AS materia
FROM carreras AS c
INNER JOIN materia AS m
    ON c.id_carrera = m.id_carrera;`
    },
    {
      titulo: "RIGHT JOIN entre carreras y materias",
      enunciado:
        "Muestra todas las materias con su carrera. Las materias sin carrera (como Matematicas) aparecen con NULL.",
      categoria: "join",
      sql: `-- RIGHT JOIN CARRERAS Y MATERIAS
SELECT
    c.nombre AS carrera,
    m.nombre AS materia
FROM carreras AS c
RIGHT JOIN materia AS m
    ON c.id_carrera = m.id_carrera;`
    }
  ]
};
