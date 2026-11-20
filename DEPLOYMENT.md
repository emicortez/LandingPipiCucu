# Despliegue — Cloudflare Pages

## 1. Variables de entorno

Sitio (Cloudflare Pages → Settings → Environment variables, o `.env` local):

| Variable | Ejemplo | Para qué |
| --- | --- | --- |
| `SITE_URL` | `https://pipicucu.com.ar` | Origen canónico (canonical, OG, sitemap). Default: `https://pipicucu.pages.dev` |
| `PUBLIC_SANITY_PROJECT_ID` | `abcd1234` | Sin esto se usa el contenido local de demo |
| `PUBLIC_SANITY_DATASET` | `production` | |
| `PUBLIC_SANITY_API_VERSION` | `2025-02-19` | |
| `PRODUCTION_BRANCH` | `main` | Solo esa rama es indexable en Cloudflare |
| `PUBLIC_INDEXABLE` | `false` | Fuera de Cloudflare, fuerza `noindex` + `Disallow` |
| `PUBLIC_PLAUSIBLE_DOMAIN` | `pipicucu.com.ar` | Opcional: activa la analítica sin cookies |
| `PUBLIC_PLAUSIBLE_SRC` | `https://plausible.io/js/script.js` | Opcional: script autoalojado |

Studio (`studio/.env`): `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`.

Ninguna variable lleva tokens: el sitio lee contenido **publicado** de un dataset público. Nunca poner un token de Sanity en una variable `PUBLIC_*`.

> `.env.example` no se actualizó en esta entrega (está protegido por la configuración de permisos del repositorio). Copiar la tabla anterior.

## 2. Proyecto en Cloudflare Pages

- Framework preset: Astro · Build command: `npm run build` · Output: `dist` · Node: `NODE_VERSION=22` o superior.
- `public/_headers` aplica CSP y cabeceras de seguridad. Si se agrega un servicio externo (otro analytics, fuentes, video), sumar su dominio a la CSP.
- Previews de ramas: quedan `noindex` automáticamente (`CF_PAGES_BRANCH` ≠ `PRODUCTION_BRANCH`).

## 3. Sanity

1. `cd studio && npx sanity init --env` (o crear el proyecto en sanity.io/manage) y completar `studio/.env`.
2. Dataset `production` con visibilidad **pública** (solo lectura de publicados).
3. API → CORS origins: agregar `http://localhost:3333` y la URL del Studio desplegado.
4. Members: dar rol **Editor** a Deby y Agos (login con Google o email de Sanity). No se crea autenticación propia.
5. `npm run deploy` dentro de `studio/` publica el Studio en `https://<nombre>.sanity.studio`.

## 4. Publicar al guardar (webhook)

1. Cloudflare Pages → Settings → Builds → **Deploy hooks** → crear "sanity-publish" sobre la rama de producción. La URL es secreta: no compartirla ni commitearla.
2. sanity.io/manage → API → **Webhooks** → nuevo:
   - URL: la del deploy hook · Dataset: `production` · Trigger on: Create, Update, Delete.
   - Filter: `_type in ["artwork","category","news","artistProfile","homePage","siteSettings"] && !(_id in path("drafts.**"))` (solo publicados, sin borradores → evita builds innecesarios).
   - HTTP method: POST · API version: la misma del sitio.
3. Protección: Cloudflare no verifica la firma de Sanity, así que la seguridad es el secreto de la URL. Si se necesita verificación de firma, interponer un Worker que valide el header `sanity-webhook-signature` con el secreto del webhook y recién ahí llame al deploy hook.
4. No hay bucles posibles: el build solo lee de Sanity, nunca escribe.

Una obra nueva aparece en la web cuando termina el build (normalmente 1–3 minutos).

## 5. Dominio

Cloudflare Pages → Custom domains. Después: actualizar `SITE_URL`, redeploy, enviar `https://<dominio>/sitemap.xml` a Search Console.

## 6. Problemas frecuentes

| Síntoma | Causa probable |
| --- | --- |
| El build falla con error de Sanity | `projectId` mal escrito o dataset privado. Es intencional: no se publica un sitio con obras faltantes |
| Un cambio no aparece | El documento quedó en borrador, o el webhook no disparó (ver "Attempts log" del webhook) |
| Las imágenes de Sanity no cargan | CSP: `img-src` debe incluir `https://cdn.sanity.io` |
| El sitio aparece con `noindex` | Rama distinta de `PRODUCTION_BRANCH` o `PUBLIC_INDEXABLE=false` |
| Tests E2E no encuentran navegador | Usan Microsoft Edge del sistema; en CI: `PW_CHANNEL=chromium npx playwright install chromium` |
