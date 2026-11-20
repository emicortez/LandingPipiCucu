# Especificaciones — V1

Fuente: brief "MASTER PROMPT — PIPÍ CUCÚ" (seguimiento en `odd/tasks/pipicucu-v1.md`). Reemplaza a `ESPECIFICACION.md` y `PIPICUCU_ESPECIFICACIONES_PROYECTO.md`, que quedan como antecedentes.

## Reglas de producto

1. La web no vende: todo CTA comercial va a Empretienda. Sin carrito, checkout, pagos ni pedidos.
2. No se muestran precios ni disponibilidad (Empretienda es la fuente de verdad comercial).
3. No se inventan datos: técnica, medidas, testimonios, plazos, precios ni biografías. Un campo vacío no se muestra.
4. Las obras se muestran completas. Las capturas de Instagram con texto no se usan como fotos.
5. Las dueñas editan todo desde Sanity Studio, sin programar.

## Páginas implementadas

| Ruta | Contenido | Indexable |
| --- | --- | --- |
| `/` | Hero con obra de portada, obras del taller, colecciones, significado del nombre + nosotras, personalizados, novedades (si hay), CTA a tienda | Sí |
| `/productos/` | Catálogo completo: filtros por categoría, búsqueda por nombre (sin acentos), orden, estado vacío, URL compartible (`?categoria=&q=&orden=`) | Sí |
| `/productos/[slug]/` | Ficha: foto completa + visor ampliado, datos confirmados, descripción, CTA a tienda honesto, consulta (WhatsApp si está configurado, si no Instagram), relacionadas, breadcrumbs | Sí |
| `/categorias/[slug]/` | Categorías de la tienda (Cuadros, Regionales, Navidad, General). Sin obras cargadas: estado vacío con enlace a esa categoría en Empretienda | Solo con obras |
| `/nosotras/` | Historia, significado de "pipí cucú", perfiles de Deby y Agos con sus propios textos | Sí |
| `/personalizados/` | Proceso real (mensaje → cita virtual o presencial → diseño conjunto), qué contar, técnicas | Sí |
| `/novedades/`, `/novedades/[slug]/` | Publicaciones del CMS | Solo con contenido |
| `/contacto/` | Tienda, Instagram, WhatsApp (oculto hasta confirmar), ubicación | Sí |
| `404` | Página propia, `noindex` | No |

## Botón de compra (regla de fallback)

1. La obra tiene `externalStoreUrl` (validada: dominio `pipicucupc.empretienda.com.ar`) → "Ver esta obra en la tienda".
2. Si no, su categoría tiene `storeUrl` → "Ver {categoría} en la tienda" + aviso de que la obra todavía no tiene página propia.
3. Si no, la tienda general → "Ir a la tienda online".

## Procedencia del contenido actual

| Dato | Fuente | Estado |
| --- | --- | --- |
| "Pintamos recuerdos, historias y lugares que merecen permanecer." | Publicación de Instagram de las dueñas | Propio |
| Biografías de Deby y Agos | Publicaciones de presentación en Instagram | Propio |
| Categorías, URLs de categoría, definición del nombre, técnicas y proceso de personalizados, ubicación | Empretienda (leído el 2026-11-20) | Externo, confirmar |
| Títulos y descripciones de las 5 obras | Escritos para la demo a partir de las fotos | Provisorio |
| WhatsApp `5492658409298` | Aparece en Empretienda | No publicado hasta que lo confirmen |

## Pendientes que dependen de las dueñas

- [ ] Crear proyecto Sanity y cargar el catálogo real con URLs exactas de Empretienda.
- [ ] Logo en vector (SVG/PDF). Hoy los monogramas se extraen del raster de 595 px.
- [ ] Foto original de "Retrato de gato" sin el cursor del mouse que tiene la captura actual.
- [ ] Retrato de Deby y Agos en mejor resolución (el actual es 390×816).
- [ ] Confirmar WhatsApp para la web, horarios y si existe perfil de Google Business.
- [ ] Revisar textos de categorías (las descripciones son provisorias).
- [ ] Dominio definitivo.
