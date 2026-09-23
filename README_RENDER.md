# Steak House - despliegue en Render

Este sitio es estatico: no necesita instalacion ni build.

## Opcion recomendada

1. Sube esta carpeta a un repositorio de GitHub.
2. En Render, crea un nuevo **Blueprint** o **Static Site** desde ese repositorio.
3. Si usas Blueprint, Render leera `render.yaml`.
4. Si lo configuras manualmente:
   - Runtime: Static
   - Build Command: dejar vacio
   - Publish Directory: `.`

## Archivos principales

- `index.html`: contenido y menu.
- `style.css`: identidad visual y responsive.
- `script.js`: navegacion, menu movil y pestanas del menu.
- `render.yaml`: configuracion para Render.
