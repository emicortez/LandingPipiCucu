import {defineField, type UrlRule} from 'sanity';

/** Host of the owners' Empretienda store. Links to the store must point here. */
export const EMPRETIENDA_HOST = 'pipicucupc.empretienda.com.ar';

/** True when `value` is empty or an https URL on the Empretienda store host. */
export function isEmpretiendaUrl(value: unknown): boolean {
  if (typeof value !== 'string' || value.trim() === '') return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.toLowerCase() === EMPRETIENDA_HOST;
  } catch {
    return false;
  }
}

/** Validation for an optional https link that must live in the Empretienda store. */
export const empretiendaUrlValidation = (rule: UrlRule) =>
  rule.uri({scheme: ['https']}).custom((value) =>
    isEmpretiendaUrl(value)
      ? true
      : `El enlace tiene que ser de tu tienda (https://${EMPRETIENDA_HOST}/...). Copialo desde la barra del navegador estando en la tienda.`,
  );

/** Validation for any optional https link. */
export const httpsUrlValidation = (rule: UrlRule) =>
  rule.uri({scheme: ['https']}).error('El enlace tiene que empezar con https://');

const ALT_HELP =
  'Describí brevemente qué se ve, como si se lo contaras a alguien que no puede ver la imagen (por ejemplo: "Cuadro de flores rosas sobre fondo verde, pintado en acrílico"). Lo usan las personas ciegas y los buscadores.';

interface ImageFieldOptions {
  name: string;
  title: string;
  description?: string;
  required?: boolean;
  hotspot?: boolean;
  group?: string;
}

/** Image field with a required "Texto alternativo" (alt) subfield. */
export function imageWithAlt({
  name,
  title,
  description,
  required = false,
  hotspot = true,
  group,
}: ImageFieldOptions) {
  return defineField({
    name,
    title,
    type: 'image',
    description,
    group,
    options: {hotspot},
    fields: [altField()],
    validation: required ? (rule) => rule.required().error('Cargá una imagen.') : undefined,
  });
}

/** The required alt subfield, reusable inside array-of-image members. */
export function altField() {
  return defineField({
    name: 'alt',
    title: 'Texto alternativo',
    type: 'string',
    description: ALT_HELP,
    validation: (rule) =>
      rule.custom((value, context) => {
        const parent = context.parent as {asset?: unknown} | undefined;
        if (parent?.asset && (typeof value !== 'string' || value.trim() === '')) {
          return 'Escribí el texto alternativo de la imagen.';
        }
        return true;
      }),
  });
}

/** SEO object: title, description and share image, all optional. */
export function seoField(group?: string) {
  return defineField({
    name: 'seo',
    title: 'Buscadores y redes (SEO)',
    type: 'object',
    group,
    description:
      'Opcional. Cómo aparece esta página en Google y al compartirla. Si lo dejás vacío se usan el nombre, la descripción y la imagen principal.',
    options: {collapsible: true, collapsed: true},
    fields: [
      defineField({
        name: 'title',
        title: 'Título para buscadores',
        type: 'string',
        validation: (rule) => rule.max(60).warning('Conviene no superar 60 caracteres.'),
      }),
      defineField({
        name: 'description',
        title: 'Descripción para buscadores',
        type: 'text',
        rows: 3,
        validation: (rule) => rule.max(160).warning('Conviene no superar 160 caracteres.'),
      }),
      imageWithAlt({
        name: 'image',
        title: 'Imagen para compartir',
        description: 'Se ve al compartir el enlace en redes. Ideal 1200 x 630 px.',
      }),
    ],
  });
}

/** Slug field generated from another field, unique per document type. */
export function slugField(source: string) {
  return defineField({
    name: 'slug',
    title: 'Dirección web (slug)',
    type: 'slug',
    description: 'Es la parte final del enlace de la página. Tocá "Generate" para crearla a partir del nombre.',
    options: {source, maxLength: 96},
    validation: (rule) => rule.required().error('Generá la dirección web con el botón "Generate".'),
  });
}
