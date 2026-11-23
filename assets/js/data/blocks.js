/* =========================================================================
   Registro de bloques de ejercicios.
   Para añadir un nuevo bloque:
     1. Añade un objeto a este array.
     2. Crea su página (p. ej. nomina.html) y su archivo de datos
        (assets/js/data/nomina.js) siguiendo el patrón de universidad.js.
     3. Coloca el script SQL descargable en la carpeta sql/.
   ========================================================================= */
window.DB_BLOCKS = [
  {
    id: "universidad",
    nombre: "Universidad",
    descripcion:
      "Modelado de carreras, materias, estudiantes y profesores. Claves foráneas y consultas con INNER JOIN, LEFT JOIN y RIGHT JOIN.",
    estado: "disponible", // "disponible" | "proximamente"
    pagina: "universidad.html",
    sql: "sql/universidad.sql",
    temas: ["DDL", "DML", "JOIN"],
    icono: "🎓"
  },
  {
    id: "nomina",
    nombre: "Nómina",
    descripcion:
      "Gestión de empleados, departamentos y salarios. Este bloque se incorporará próximamente al repositorio.",
    estado: "proximamente",
    pagina: null,
    sql: null,
    temas: ["DDL", "DML", "Consultas"],
    icono: "💼"
  }
];
