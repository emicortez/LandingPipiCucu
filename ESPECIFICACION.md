# Brief funcional y de diseño — Pipí Cucú

## Objetivo
Una landing editorial profesional para un taller de pintura decorativa de Buena Esperanza (San Luis), que presente la historia de Deby y Agos, permita descubrir el catálogo visual completo y lleve cada intención de compra a Empretienda. **No construimos carrito, pago, ni inventario transaccional.**

## Identidad
- Conservar el monograma PC y el nombre Pipí Cucú.
- Paleta propuesta: rosa empolvado #EECDD3, carbón #28242A, marfil #F8F5F1, rosa acento #B56F82.
- Tipografía: Playfair Display para títulos editoriales + DM Sans para UI y cuerpo.
- Arte fotográfico real. Flores y mariposas solo como guiños de identidad, evitando plantillas genéricas.
- Composición asimétrica y amplio espacio negativo, transiciones discretas, móvil primero.

## Usuarios y necesidades
1. Visitante: descubre creaciones y creadoras, explora por categoría o búsqueda, accede a la ficha y continúa en Empretienda.
2. Propietarias: ingresan a Sanity Studio y crean/actualizan obras, categorías, destacados y novedades sin programar.
3. Desarrollador: mantiene un frontend Astro estático y despliegues reproducibles.

## Rutas
- `/`: hero, obras seleccionadas, historia, colección visual, personalizados y novedades si existen.
- `/productos/`: filtro y búsqueda en cliente, todas las obras publicadas desde el CMS.
- `/productos/[slug]/`: imagen principal, galería si existe, descripción, técnica/dimensiones opcionales, salida a tienda.
- `/novedades/`, `/novedades/[slug]/`: anuncios publicados.
- `/404`: error.

## CMS (Sanity Studio)
- `artwork`: título, slug, portada, galería, categoría, descripción, técnica, medidas, URL externa, destacada, visible, orden.
- `category`: nombre, slug, descripción, portada, orden.
- `news`: título, slug, resumen, cuerpo, foto, fecha, URL, publicada.
- `siteSettings`: logo, tienda, Instagram, WhatsApp (preparado), titular, subtítulo e historia.

## Flujo de edición
1. Crear categoría; 2. Crear obra; 3. Subir imagen; 4. Marcar visible; 5. Publicar; 6. Rebuild del hosting vía webhook configurado; 7. Verificar ficha y CTA.

## Integraciones y límites
- Empretienda es la fuente comercial para catálogo de venta, disponibilidad, precios, pagos y envíos.
- Sanity es fuente de exhibición editorial; **no hay sincronización automática**.
- La búsqueda es sobre contenido ya generado; no requiere servicio externo.
- El renderizado estático necesita un deploy al publicar cambios.
- Los datos locales son demos con nombres editoriales orientativos hasta cargar productos reales.

## Calidad antes de lanzamiento
- Confirmación del copy e imágenes con las propietarias.
- Tamaños mobile 360/390/430 px, tablet 768 px, desktop 1280/1440 px.
- Navegación de teclado, foco, texto alternativo y contraste.
- Peso de imágenes, rendimiento, caché y tamaño de fuentes.
- URLs externas individuales verificadas.
- Conexión del dominio, robots/sitemap si se requiere, OpenGraph y analítica con privacidad.

## Evolución posterior
Portada editable por secciones, fotografías profesionales, colecciones reales y múltiples formatos, mejoras de filtros, vista previa editorial en CMS y posible integración comercial con la plataforma elegida si esta dispone de API adecuada.
