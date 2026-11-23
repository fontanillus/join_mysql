# Ejercicios prácticos de MySQL

**Formación SOC · Bases de Datos**

Web educativa estática para publicar los ejercicios prácticos de MySQL del curso, organizada por bloques (bases de datos de práctica). Pensada para crecer progresivamente con nuevos ejercicios.

## 🧱 Tecnologías

- HTML5 semántico
- [Tailwind CSS](https://tailwindcss.com/) (CDN)
- JavaScript (sin frameworks)
- [Prism.js](https://prismjs.com/) para el resaltado de sintaxis SQL
- GitHub Pages para la publicación

No hay backend ni base de datos conectada: todo el contenido es estático.

## 📁 Estructura del proyecto

```
├── index.html                  # Página principal con las tarjetas de bloques
├── universidad.html            # Página del bloque Universidad
├── sql/
│   └── universidad.sql         # Script SQL original (descargable)
├── assets/
│   ├── css/
│   │   └── custom.css          # Ajustes sobre Tailwind y Prism
│   └── js/
│       ├── app.js              # Lógica compartida (tarjetas, filtros, copiar)
│       └── data/
│           ├── blocks.js       # Registro de bloques (arquitectura modular)
│           └── universidad.js  # Ejercicios del bloque Universidad
└── README.md
```

## ➕ Cómo añadir un nuevo bloque de ejercicios

La web es modular: los bloques se definen en archivos de datos y las páginas solo los renderizan. Para añadir un bloque (por ejemplo, **Nómina**):

1. **Coloca el script SQL** en la carpeta `sql/`:

   ```
   sql/nomina.sql
   ```

2. **Crea el archivo de datos** `assets/js/data/nomina.js` siguiendo el patrón de `universidad.js`:

   ```js
   window.EXERCISES_NOMINA = {
     id: "nomina",
     titulo: "Ejercicios Nómina",
     descripcion: "…",
     sqlFile: "sql/nomina.sql",
     categorias: [
       { id: "ddl", nombre: "DDL · Estructura" },
       { id: "dml", nombre: "DML · Datos" }
     ],
     ejercicios: [
       {
         titulo: "…",
         enunciado: "…",
         categoria: "ddl",
         sql: `-- SQL literal del ejercicio`
       }
     ]
   };
   ```

3. **Crea la página** `nomina.html` copiando `universidad.html` y cambiando:
   - El `<title>`, la `meta description` y los textos de cabecera.
   - El enlace de descarga (`sql/nomina.sql`).
   - Los scripts finales:

   ```html
   <script src="assets/js/data/nomina.js"></script>
   <script src="assets/js/app.js"></script>
   <script>
     initExercisePage(window.EXERCISES_NOMINA);
   </script>
   ```

4. **Actualiza el registro** `assets/js/data/blocks.js`: cambia el bloque de `"proximamente"` a `"disponible"` e indica `pagina` y `sql`. La tarjeta de la página principal se genera automáticamente.

5. Si procede, actualiza el enlace «Nómina» en la barra de navegación de las páginas HTML.

## ✍️ Convenciones SQL del proyecto

- Palabras reservadas y funciones en **MAYÚSCULAS**.
- Nombres de tablas y columnas en **minúsculas**.
- Código correctamente indentado.
- Evitar `SELECT *` salvo en consultas de verificación.
- **Respetar las soluciones originales de los ejercicios**: el SQL mostrado en la web debe ser literal al archivo `.sql` correspondiente.

## 🚀 Publicación en GitHub Pages

1. Crea un repositorio en GitHub y sube el proyecto:

   ```bash
   git init
   git add .
   git commit -m "Web de ejercicios de MySQL"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

2. En GitHub: **Settings → Pages → Build and deployment**, selecciona
   *Deploy from a branch*, rama `main` y carpeta `/ (root)`.

3. La web quedará publicada en:

   ```
   https://TU_USUARIO.github.io/TU_REPOSITORIO/
   ```

## 🖥️ Desarrollo en local

Al ser un proyecto estático basta con abrir `index.html` en el navegador, o servirlo en local:

```bash
python -m http.server 8000
# http://localhost:8000
```

## 📚 Bloques

| Bloque      | Estado          | Contenido                                                        |
| ----------- | --------------- | ---------------------------------------------------------------- |
| Universidad | ✅ Disponible   | DDL, DML, claves foráneas, INNER JOIN, LEFT JOIN y RIGHT JOIN     |
| Nómina      | 🔜 Próximamente | Se incorporará en una próxima ampliación                          |
