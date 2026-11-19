# Pipí Cucú — Especificaciones del proyecto web

**Versión del documento:** 1.0  
**Fecha:** 19 de noviembre de 2026  
**Estado:** especificación inicial del MVP y hoja de ruta evolutiva  
**Proyecto de referencia:** `pipicucu-astro-proyecto.zip`

## 1. Resumen ejecutivo

Desarrollar para **Pipí Cucú — Pintura decorativa**, emprendimiento artístico de Buena Esperanza (San Luis, Argentina), un sitio web profesional de estética editorial contemporánea que conserve su identidad de marca. El sitio funcionará como **presentación de marca, galería y catálogo visual completo administrable**, no como un nuevo ecommerce: las compras se realizarán en su tienda existente de **Empretienda**.

**Referencias de negocio:**
- Tienda: https://pipicucupc.empretienda.com.ar/
- Instagram: https://www.instagram.com/pipicucu_pc

**Regla central:** la web inspira, presenta, permite descubrir y deriva; Empretienda procesa la venta.

## 2. Objetivos

1. Construir una presencia de marca tan cuidada como sus obras: artística, refinada, cálida y moderna.
2. Exhibir el catálogo visual mediante filtros, búsqueda y fichas individuales.
3. Mostrar el trabajo y la historia de **Deby y Agos**, madre e hija, evitando imágenes y textos recortados.
4. Dar visibilidad a los **trabajos personalizados** y novedades.
5. Facilitar la actualización de contenido por las propietarias desde un administrador privado.
6. Enlazar productos y llamados a la acción con Empretienda o Instagram/WhatsApp cuando corresponda.
7. Mantener una web accesible, rápida, responsive y fácil de ampliar.

### No objetivos de la V1

- No implementar carrito, checkout, cobros ni pedidos en Astro.
- No administrar stock comercial, logística, facturación o promociones transaccionales.
- No replicar precios o disponibilidad que puedan diferir de Empretienda.
- No comprar Higgsfield ni depender de vídeos generados por IA.
- No desarrollar un panel de usuario propietario desde cero: se utilizará Sanity Studio.

## 3. Públicos y recorridos

**Visitante:** entra desde Instagram o búsquedas → descubre la marca y obras → filtra o busca → abre ficha → hace clic en «Ver en tienda» → compra en Empretienda. Alternativamente consulta un encargo personalizado mediante el canal de contacto.

**Propietaria / editora:** inicia sesión en Sanity Studio → crea o edita obra/categoría/novedad → añade fotografías y URL de tienda → publica → el hosting reconstruye la web cuando se configure el webhook → verifica la página publicada.

**Desarrollador:** mantiene el frontend, mejora el sistema visual, configura dominios/hosting y conserva el desacoplamiento del CMS y de la tienda.

## 4. Dirección de arte e identidad

### Identidad a preservar

- Monograma original **PC.**, nombre **Pipí Cucú** y descriptor **Pintura decorativa**.
- Rosa empolvado, negro/carbón y superficies marfil.
- Ilustraciones botánicas y mariposas como acentos puntuales, no decoración repetitiva.
- Fotografías **auténticas** de cuadros, pinturas y creadoras.
- Comunicación cercana, artística y en español rioplatense cuando corresponda.

### Paleta inicial de trabajo

| Rol | Color | HEX propuesto |
|---|---|---|
| Fondo de marca | Rosa empolvado | `#EECDD3` |
| Texto principal | Carbón | `#28242A` |
| Fondo neutro | Marfil | `#F8F5F1` |
| Acentos | Rosa profundo | `#B56F82` |

**Son valores propuestos para la implementación, no colores oficiales medidos del logo.**

### Tipografía y composición

- Títulos: serif editorial con carácter (propuesta actual: **Playfair Display**).
- Interfaz, navegación y cuerpo: sans legible (propuesta actual: **DM Sans**).
- Jerarquía tipográfica clara, buen contraste, mucho espacio negativo.
- Obras visualmente protagonistas, layouts asimétricos pero legibles y controlados.
- Movimientos y efectos discretos, nunca a costa de claridad o rendimiento.
- Evitar estética de plantilla o flyer: no saturar de iconos, gradientes, cajas y ornamentos.

### Tratamiento de imágenes: requisito de calidad

**No usar capturas de publicaciones de Instagram como si fueran fotografías limpias.** En versiones preliminares aparecieron textos de capturas y rostros cortados en «Sobre nosotras» y «Personalizados». Usar fotografías originales o recortes preparados manualmente; preservar la obra completa en la ficha y controlar los encuadres en el hero. No recortar caras, firmas, logos o textos accidentalmente. Sustituir el retrato de baja resolución por la fotografía original cuando se consiga.

## 5. Arquitectura de información

| Ruta | Función | Estado en proyecto base |
|---|---|---|
| `/` | Home: hero, obras destacadas, historia, colecciones, personalizados y contenidos | Incluida |
| `/productos/` | Galería/catálogo completo con búsqueda y filtros | Incluida |
| `/productos/[slug]/` | Detalle de obra con fotos, atributos y CTA externo | Incluida |
| `/novedades/` | Índice de novedades | Incluida |
| `/novedades/[slug]/` | Detalle de novedad | Incluida |
| `/404` | Página de error | Incluida |
| `/nosotras/` | Historia ampliada independiente | Propuesta futura |
| `/personalizados/` | Información independiente para encargos | Propuesta futura |
| `/contacto/` | Contacto independiente | Propuesta futura |

La home ya puede presentar información de «Nosotras» y personalizados sin que existan páginas independientes. No prometer rutas adicionales hasta desarrollarlas.

### Categorías iniciales de referencia

Partir de las categorías de la tienda actual —General, Navidad, Regionales y Cuadros, con subcategorías existentes cuando corresponda—, pero cargar las **categorías efectivas y actualizadas** en Sanity y permitir que las propietarias las modifiquen. Las agrupaciones editoriales (florales, animales, lunas, etc.) solo se incorporarán como categorías oficiales si ellas las aprueban.

## 6. Requisitos funcionales

### Home

- Navegación responsive con logo y CTA a tienda.
- Hero expresivo con obra real, mensaje de marca y CTA principal.
- Selección de obras destacadas.
- Presentación de las creadoras.
- Bloque de personalizados que derive al canal que indiquen las dueñas.
- Sección de novedades, si hay contenido publicado.
- Pie de página con redes sociales, tienda y datos confirmados.

### Catálogo

- Listado de obras visibles y publicadas.
- Filtrado por categoría y búsqueda de texto sin servidor adicional.
- Tarjetas con imagen, nombre y navegación al detalle.
- Diseños que respeten obras horizontales, verticales, cuadradas y circulares.
- Estado vacío si no hay resultados.
- Móvil usable sin hover.

### Ficha individual

- Nombre, descripción, fotografía principal y galería si existe.
- Categoría y atributos opcionales como técnica y dimensiones.
- CTA «Ver en tienda» hacia URL individual de Empretienda si está definida; en caso contrario enlace a la tienda general, identificado correctamente.
- Canal alternativo de consulta, si está configurado.
- Metadatos SEO y texto alternativo apropiados.

### Novedades

- Publicación/despublicación de anuncios.
- Título, resumen, imagen, fecha y contenido.
- Posibilidad de enlace complementario a la tienda o red social.

### Panel editorial

- Acceso autenticado a Sanity Studio.
- Crear, editar, publicar, ocultar y ordenar obras.
- Gestionar categorías y novedades.
- Cambiar logo, enlaces y textos que estén modelados en la configuración.
- Previsualizar imágenes y validar campos antes de publicar.
- La administración no permite cobrar ni modificar pedidos en Empretienda.

## 7. Esquema de contenido en Sanity

| Documento | Campos previstos |
|---|---|
| `artwork` | título, slug, portada, galería, categoría, descripción, técnica, dimensiones, URL externa, destacada, visible, orden |
| `category` | nombre, slug, descripción, portada, orden |
| `news` | título, slug, resumen, cuerpo, imagen, fecha, URL, publicada |
| `siteSettings` | logo, URL de tienda, Instagram, WhatsApp preparado, titular, subtítulo e historia |

**Fuente de verdad:** Sanity controla la presentación editorial de la web. **Empretienda** controla la transacción, precios, stock y envíos. No existe una integración de sincronización comercial en el MVP.

## 8. Stack y decisiones técnicas

- **Frontend:** Astro 7 y TypeScript.
- **Estilos:** Tailwind CSS 4 + CSS propio editorial y tokens visuales.
- **CMS:** Sanity Content Lake y Sanity Studio independiente.
- **Consultas:** `@sanity/client` y GROQ para contenido publicado.
- **Renderizado:** estático; compilación a `dist/`.
- **Hosting candidato:** Cloudflare Pages, Netlify u otro alojamiento estático compatible (aún sin configurar).
- **Interacciones:** JavaScript ligero para búsqueda/filtros y CSS para microinteracciones; no exigir React, GSAP o Lenis en la V1.
- **Imágenes:** originales optimizados y variantes responsive cuando corresponda.
- **Accesibilidad:** semántica HTML, teclado, foco visible, contraste y `prefers-reduced-motion`.
- **Analítica/SEO:** metadatos, Open Graph, sitemap, robots y analítica respetuosa de privacidad antes del lanzamiento.

El repositorio de ejemplo de Midudev es una **inspiración técnica y de calidad de implementación**; no se copia su dirección visual ni se necesita Higgsfield.

## 9. Estructura real del código entregado

```text
pipicucu-astro/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── WorkCard.astro
│   │   └── WorkGrid.astro
│   ├── data/demo.ts
│   ├── layouts/SiteLayout.astro
│   ├── lib/content.ts
│   ├── pages/
│   │   ├── index.astro
│   │   ├── productos/index.astro
│   │   ├── productos/[slug].astro
│   │   ├── novedades/index.astro
│   │   ├── novedades/[slug].astro
│   │   └── 404.astro
│   └── styles/global.css
├── public/images/
├── studio/
│   ├── schemaTypes/
│   │   ├── artwork.ts
│   │   ├── category.ts
│   │   ├── news.ts
│   │   └── siteSettings.ts
│   ├── sanity.config.ts
│   └── package.json
├── .env.example
├── astro.config.mjs
├── package.json
├── README.md
└── ESPECIFICACION.md
```

## 10. Instalación local

### Sitio Astro

```bash
npm install
cp .env.example .env
npm run dev
```

Abrir `http://localhost:4321`. Para validar producción:

```bash
npm run build
npm run preview
```

### Sanity Studio

Crear un proyecto en Sanity y configurar su `projectId` y dataset.

```bash
cd studio
npm install
cp .env.example .env
npm run dev
```

Acceso local habitual: `http://localhost:3333`.

### Variables de entorno del frontend

```dotenv
PUBLIC_SANITY_PROJECT_ID=tu_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2025-02-19
PUBLIC_SITE_URL=https://tu-dominio.com.ar
```

**Seguridad:** no poner claves privadas en variables `PUBLIC_*`. Revisar permisos y acceso al dataset. El despliegue de Sanity y los permisos reales de las cuentas están pendientes.

## 11. Datos demo y actualizaciones

El proyecto incluye imágenes proporcionadas y datos locales de demostración para arrancar **sin cuenta de Sanity**. Los nombres descriptivos, clasificaciones o textos demo pueden no coincidir con productos publicados y deben confirmarse con las propietarias.

Al configurar `PUBLIC_SANITY_PROJECT_ID`, el frontend obtiene el contenido publicado desde Sanity. No sustituir silenciosamente errores de la API con productos inventados.

Como el frontend es estático, cada actualización del CMS requiere reconstruir y publicar el sitio. **Pendiente:** configurar un webhook seguro de Sanity al build hook del hosting elegido. Sin ese paso, los cambios no se reflejarán automáticamente.

## 12. Rendimiento, diseño responsive y QA

### Puntos de control

- Revisar al menos 360, 390, 430, 768, 1280 y 1440 px.
- No mostrar scroll horizontal accidental, elementos solapados ni fotografías recortadas indebidamente.
- Verificar navegación por teclado, textos alternativos, contraste y lectura con ayudas técnicas.
- Optimizar tamaño/formato de imágenes; evitar scripts y animaciones innecesarios.
- Cuidar tamaño de objetivos táctiles y estados de carga/vacío.
- Revisar enlaces de todas las obras a Empretienda.
- Comprobar metadatos de cada ruta, encabezados y estructura semántica.
- Validar rendimiento real con Lighthouse y dispositivos móviles antes de publicar.

### Criterios mínimos de aceptación

1. Home y catálogo usan correctamente el estilo PC y obras reales.
2. Hay búsqueda, filtros y fichas funcionales para las obras cargadas.
3. Todos los CTA comerciales navegan a Empretienda, sin carrito interno.
4. Una editora puede publicar una obra y una novedad en Sanity sin programar.
5. La actualización aparece tras el build configurado.
6. La sección de creadoras no incorpora textos ajenos ni recortes de capturas.
7. El sitio funciona correctamente en móvil, tablet y escritorio.
8. Las dueñas aprueban los textos, imágenes, marca y enlaces definitivos.

## 13. Estado actual y pendientes reales

**Incluido en el ZIP base:** proyecto Astro con páginas y componentes, estilos, imágenes locales, datos demo, integración de consulta a Sanity y configuración de Sanity Studio con schemas principales.

**No verificado automáticamente en el entorno de creación:** instalación de dependencias, `npm run build`, comprobación en navegadores/tamaños reales. **No asumir que está listo para producción hasta realizar estas pruebas.**

**Pendiente de configurar:** proyecto y usuarios reales de Sanity, hosting y dominio, webhook de rebuild, URLs individuales verificadas de Empretienda, catálogo real, autorizaciones/archivos originales de fotografía, SEO final y pruebas de QA.

## 14. Roadmap de evolución

**Fase A — Validación visual:** revisar hero, logo, composición, tratamiento de fotografías, contraste y responsive con las propietarias.

**Fase B — Catálogo real:** reemplazar demostraciones con obras, nombres, categorías, fotografías y URLs oficiales.

**Fase C — Autogestión:** configurar el proyecto Sanity, editar/presentar contenido, roles, webhook y capacitación.

**Fase D — Publicación:** QA, SEO, despliegue, dominio y observabilidad.

**Posibles mejoras posteriores:** sección de personalizados independiente, perfiles ampliados de las creadoras, colecciones curatoriales, nuevas opciones de búsqueda, preview editorial de contenido y eventual sincronización limitada con Empretienda solo si la plataforma y sus APIs lo permiten.

---

**Principio rector:** *Pipí Cucú debe sentirse como una galería/atelier contemporáneo de verdad, con su propio estilo; no como una tienda genérica ni una colección de publicaciones de Instagram incrustadas.*
