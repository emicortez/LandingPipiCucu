import {defineField, defineType} from 'sanity';
import {empretiendaUrlValidation, httpsUrlValidation, imageWithAlt} from './fields';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  groups: [
    {name: 'brand', title: 'Marca', default: true},
    {name: 'contact', title: 'Contacto y enlaces'},
    {name: 'seo', title: 'Buscadores (SEO)'},
  ],
  fields: [
    defineField({
      name: 'brandName',
      title: 'Nombre de la marca',
      type: 'string',
      group: 'brand',
      description: 'Por ejemplo: "Pipí Cucú".',
    }),
    defineField({
      name: 'descriptor',
      title: 'Descripción de la marca',
      type: 'string',
      group: 'brand',
      description: 'Acompaña al nombre. Por ejemplo: "Pintura decorativa".',
    }),
    imageWithAlt({name: 'logo', title: 'Logo', group: 'brand', hotspot: false}),
    imageWithAlt({
      name: 'alternativeLogo',
      title: 'Logo alternativo',
      group: 'brand',
      hotspot: false,
      description: 'Versión del logo para fondos oscuros.',
    }),
    defineField({
      name: 'storeUrl',
      title: 'Tienda Empretienda',
      type: 'url',
      group: 'contact',
      description: 'Dirección principal de la tienda online.',
      validation: (rule) => [
        rule.required().error('Pegá la dirección de la tienda.'),
        httpsUrlValidation(rule),
      ],
    }),
    defineField({
      name: 'customOrdersUrl',
      title: 'Página de personalizados en Empretienda',
      type: 'url',
      group: 'contact',
      description: 'Opcional. La página de la tienda que explica cómo pedir obras personalizadas.',
      validation: empretiendaUrlValidation,
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram',
      type: 'url',
      group: 'contact',
      validation: httpsUrlValidation,
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      type: 'string',
      group: 'contact',
      description:
        'Solo números, con código de país (por ejemplo 549 + característica + número). Mientras esté vacío, el botón de WhatsApp queda oculto en la web.',
      validation: (rule) =>
        rule
          .regex(/^\d{10,15}$/)
          .error('Solo números, con código de país, sin + ni espacios. Ej: 549...'),
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      type: 'string',
      group: 'contact',
      description: 'Por ejemplo: "Buena Esperanza, San Luis, Argentina".',
    }),
    defineField({
      name: 'businessHours',
      title: 'Horarios de atención',
      type: 'string',
      group: 'contact',
      description: 'Opcional. Si queda vacío, no se muestra.',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Textos para buscadores',
      type: 'object',
      group: 'seo',
      description: 'Se usan en las páginas que no tienen textos propios.',
      fields: [
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          validation: (rule) => rule.max(60).warning('Conviene no superar 60 caracteres.'),
        }),
        defineField({
          name: 'description',
          title: 'Descripción',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.max(160).warning('Conviene no superar 160 caracteres.'),
        }),
      ],
    }),
    imageWithAlt({
      name: 'socialImage',
      title: 'Imagen para compartir',
      group: 'seo',
      hotspot: false,
      description: 'Se ve al compartir la web en redes. Recomendado: 1200 x 630 px.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Configuración del sitio'};
    },
  },
});
