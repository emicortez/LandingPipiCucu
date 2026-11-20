# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Visitante:** llega mayormente desde Instagram o búsquedas, quiere conocer la marca y a sus creadoras, explorar las obras (por categoría o búsqueda), abrir una ficha y continuar la compra en la tienda.
- **Propietarias (Deby y Agos):** crean y actualizan obras, categorías, destacados y novedades desde Sanity Studio, sin programar.
- **Desarrollador:** mantiene el frontend estático y los despliegues.

## Product Purpose

Sitio de presentación, galería y catálogo visual de **Pipí Cucú — Pintura decorativa**, taller de pintura decorativa de Deby y Agos (madre e hija) en Buena Esperanza, San Luis, Argentina. Regla central: la web inspira, presenta, permite descubrir y deriva; **Empretienda procesa la venta**. Éxito: el visitante descubre una obra, entiende quiénes la hacen y llega a la tienda.

## Positioning

Obras pintadas a mano por una madre y una hija, piezas únicas y personalizadas con historia. Debe sentirse como una galería/atelier contemporáneo con estilo propio, no como una tienda genérica ni un muro de publicaciones de Instagram.

## Operating Context

- Tienda: https://pipicucupc.empretienda.com.ar/ (precios, stock, pagos, envíos y **todos los pedidos, incluidos los personalizados**).
- Instagram: https://www.instagram.com/pipicucu_pc (canal de descubrimiento, no de pedidos).
- Contenido editorial en Sanity; sitio estático que se reconstruye al publicar.

## Capabilities and Constraints

- Rutas: `/`, `/productos/` (filtro + búsqueda en cliente), `/productos/[slug]/`, `/novedades/`, `/novedades/[slug]/`, `/404`.
- Sin carrito, checkout, precios ni disponibilidad en la web; todo CTA comercial va a Empretienda (URL de la obra si existe, si no la tienda general).
- Las obras pueden ser horizontales, verticales, cuadradas o circulares: la obra se muestra completa en la ficha.
- Stack existente: Astro 7 estático, TypeScript, Tailwind 4 + CSS propio, Sanity. JavaScript liviano; sin React, GSAP ni Lenis.
- Sin Sanity configurado se usan datos demo con nombres y categorías orientativos; las categorías oficiales las definen las dueñas.
- Indefinido: canal WhatsApp (preparado en el CMS, sin número).

## Brand Commitments

- Monograma **PC.**, nombre **Pipí Cucú** y descriptor **Pintura decorativa**.
- Paleta fija (confirmada): rosa empolvado `#EECDD3`, carbón `#28242A`, marfil `#F8F5F1`, rosa profundo `#B56F82`.
- Tipografías fijas (confirmadas): Playfair Display para títulos, DM Sans para interfaz y cuerpo.
- Flores y mariposas solo como guiños puntuales; nada de estética de plantilla o flyer.
- Voz cercana y artística, español rioplatense.

## Evidence on Hand

- Fotos reales de obras en `public/images/` (florales, amapolas, lunas, gato, mariposa), retratos de Deby y Agos y logo original.
- El retrato de las fundadoras es de baja calidad; reemplazarlo por el original cuando exista.
- No existen testimonios, prensa, precios ni cifras: no inventarlos.

## Product Principles

1. La obra es protagonista; la interfaz se corre.
2. Toda intención de compra o pedido termina en la tienda.
3. Fotos auténticas y completas: nunca recortar caras, firmas ni la obra.
4. Las dueñas tienen que poder actualizar todo sin programar.

## Accessibility & Inclusion

Navegación por teclado, foco visible, texto alternativo, contraste suficiente y `prefers-reduced-motion`. Probar en 360, 390, 430, 768, 1280 y 1440 px.
