# Contenido de muestra — para completar

Todo lo de esta lista se escribió para poder diseñar las secciones. **No está confirmado por Deby y Agos.** En la web aparece con una etiqueta "muestra". Las páginas de muestra no se indexan en Google y no están en el sitemap.

Cuando el contenido real esté cargado en Sanity, el contenido de muestra deja de mostrarse solo (las novedades, la técnica y las medidas de las obras). Lo que dice "código" hay que reemplazarlo o pasarlo a Sanity.

| Dónde | Qué es | Archivo | Cómo se reemplaza |
| --- | --- | --- | --- |
| Novedades (home, `/novedades/` y 3 páginas) | 3 publicaciones: serie de lunas, adornos de Navidad, cuidado de cuadros | `src/data/sample.ts` (`sampleNews`) | Cargar novedades reales en Sanity → Novedades |
| Ficha de cada obra de muestra | Técnica y medidas | `src/data/sample.ts` (`sampleSpecs`) | Cargar las obras reales en Sanity con su técnica y medidas |
| Personalizados → Preguntas frecuentes | 3 respuestas de muestra (qué se puede pedir, plazos, boceto). "¿Hacen envíos?" es real (dato de Empretienda) | `src/data/sample.ts` (`customOrdersFaq`) | Código: confirmar las respuestas con las dueñas y poner `sample: false` |
| Nosotras → La historia del taller | 4 hitos con años inventados (2018, 2021, 2023, 2026) | `src/data/sample.ts` (`workshopTimeline`) | Código: reemplazar con la historia real y quitar la etiqueta del título |
| Contacto → Dónde estamos | Horarios de atención | `src/data/sample.ts` (`sampleHours`) | Sanity → Configuración del sitio → Horarios (cuando se completa, la muestra desaparece) |

Además siguen siendo provisorios (ya marcados antes): los títulos y descripciones de las 5 obras de ejemplo y las descripciones de las categorías (`src/data/fallback.ts`).
