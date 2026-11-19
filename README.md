# Pipí Cucú — Astro + Sanity CMS

Sitio de presentación y catálogo artístico **sin carrito ni cobros propios**. Las ventas se completan en Empretienda.

## Contiene

- Astro con TypeScript, Tailwind CSS 4 y CSS editorial personalizado.
- Home responsive, catálogo completo filtrable/buscable, fichas individuales de obras y novedades.
- Botones a Empretienda e Instagram. Cada obra puede tener URL de compra independiente.
- Fotografías originales enviadas por la marca y logo oficial de la preview anterior.
- Sanity Studio independiente con modelos `artwork`, `category`, `news`, `siteSettings`.
- Datos demo locales para que la web funcione sin cuenta de Sanity.

## 1. Ejecutar la web

Requiere **Node.js compatible con Astro 7** y npm.

```bash
npm install
cp .env.example .env
npm run dev
```

Abrir `http://localhost:4321`.

```bash
npm run build
npm run preview
```

El build genera `dist/` para hosting estático (Cloudflare Pages, Netlify, etc.).

> Se entrega código fuente preparado; en este entorno no se pudo instalar dependencias desde npm ni ejecutar el build. Validar versiones y compilación en un equipo con conexión a npm antes del despliegue.

## 2. Crear el CMS en Sanity

Crear una cuenta/proyecto en https://www.sanity.io/ y obtener **projectId** y dataset (generalmente `production`).

```bash
cd studio
npm install
cp .env.example .env
# completar SANITY_STUDIO_PROJECT_ID
npm run dev
```

El administrador se ejecuta por defecto en `http://localhost:3333`; Sanity gestiona el login y permisos. En producción se puede desplegar Sanity Studio en un subdominio o con `npm run deploy`.

**Importante:** crear primero categorías y un documento de configuración; luego cargar obras y marcar `visible=true`.

## 3. Conectar Astro a Sanity

En `.env` (raíz):

```env
PUBLIC_SANITY_PROJECT_ID=tu_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2025-02-19
PUBLIC_SITE_URL=https://tu-dominio.com.ar
```

Reiniciar el servidor / reconstruir. Se usa la API de contenido **publicado**. El dataset y su lectura pública deben configurarse de forma acorde a la política de Sanity. No incluir tokens privados en variables `PUBLIC_*`.

Cuando no se proporciona `PUBLIC_SANITY_PROJECT_ID`, se muestran obras locales de demostración basadas en las imágenes adjuntas. Cuando está configurado, Sanity es la fuente de datos (si la consulta falla no se sustituyen datos silenciosamente).

## 4. Actualización automática

La web usa **generación estática**. Los contenidos nuevos en Sanity requieren una reconstrucción para reflejarse en producción. Crear un webhook del proyecto Sanity hacia el disparador de build del hosting, con las protecciones disponibles del proveedor. La configuración efectiva del webhook está pendiente y depende del hosting elegido.

## 5. Estructura

```
src/
  components/   Header, Footer, WorkCard, WorkGrid
  data/         Datos demo y tipos
  layouts/      SiteLayout
  lib/          Consultas GROQ a Sanity
  pages/        Home, /productos/, /productos/[slug], /novedades/, /novedades/[slug]
  styles/       Global + Tailwind
studio/
  schemaTypes/  Campos administrables
public/images/  Fotografías y logotipo
```

## 6. Antes de publicar

- Revisar nombres y categorías provisionales (fueron creados para la preview, **no son un inventario sincronizado**).
- Cargar catálogo real completo a Sanity y URLs individuales de Empretienda. Sin URL específica, el botón va a la tienda general.
- Confirmar autorizaciones para fotografías y actualizar retrato de Deby y Agos con la foto original en alta calidad cuando esté disponible.
- Revisar datos de marca y copy con las propietarias.
- Crear los usuarios y roles de Sanity, protección anti-abuso y backups adecuados.
- Configurar dominio, DNS, webhook de build, metadatos/social share, sitemap y medición consentida si corresponde.
- Revisar accesibilidad (teclado, lectores de pantalla y contraste) y probar en dispositivos reales.

## 7. Decisiones del MVP

- Sin carrito ni checkout, sin gestión de pedidos o pagos.
- Sin sincronización automática de precios/stock con Empretienda.
- Sin CMS custom: Sanity Studio proporciona el acceso administrador.
- Sin Higgsfield, sin pago por vídeos generados con IA, sin dependencias GSAP/Lenis forzadas.
- Responsive y animaciones CSS reducidas si `prefers-reduced-motion` está activo.

## 8. Notas de assets

Las fotos de productos son muestras reales aportadas. El retrato de fundadoras fue extraído de una publicación y tiene calidad limitada; reemplazarlo por el original es recomendable.
