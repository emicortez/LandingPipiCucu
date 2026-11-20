import {defineArrayMember, defineField, defineType} from 'sanity';
import {altField, empretiendaUrlValidation, imageWithAlt, slugField} from './fields';

export const artwork = defineType({
  name: 'artwork',
  title: 'Obras',
  type: 'document',
  groups: [
    {name: 'main', title: 'Obra', default: true},
    {name: 'details', title: 'Detalles'},
    {name: 'store', title: 'Tienda'},
    {name: 'seo', title: 'Buscadores (SEO)'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la obra',
      type: 'string',
      group: 'main',
      validation: (rule) => rule.required().error('Escribí el nombre de la obra.'),
    }),
    {...slugField('title'), group: 'main'},
    defineField({
      name: 'images',
      title: 'Fotos',
      type: 'array',
      group: 'main',
      description:
        'La primera foto es la principal. Mostrá la obra completa, con buena luz y sin texto encima.',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [altField()],
        }),
      ],
      options: {layout: 'grid'},
      validation: (rule) => rule.required().min(1).error('Cargá al menos una foto de la obra.'),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      group: 'main',
      to: [{type: 'category'}],
      validation: (rule) => rule.required().error('Elegí una categoría.'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción corta',
      type: 'string',
      group: 'main',
      description: 'Una frase que se ve en el catálogo.',
      validation: (rule) => rule.max(160).warning('Conviene no superar 160 caracteres.'),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 6,
      group: 'main',
      description: 'Texto de la ficha de la obra. Dejá una línea en blanco para empezar un párrafo nuevo.',
    }),
    defineField({
      name: 'technique',
      title: 'Técnica',
      type: 'string',
      group: 'details',
      description: 'Opcional. Por ejemplo: "Acrílico sobre madera".',
    }),
    defineField({
      name: 'dimensions',
      title: 'Medidas',
      type: 'string',
      group: 'details',
      description: 'Opcional. Por ejemplo: "40 x 50 cm".',
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      group: 'details',
      description: 'Opcional. Palabras que ayudan a encontrar la obra en la búsqueda (por ejemplo: flores, gato).',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'featured',
      title: 'Destacada',
      type: 'boolean',
      group: 'details',
      description: 'Marcala para resaltarla en el catálogo.',
      initialValue: false,
    }),
    defineField({
      name: 'visible',
      title: 'Visible en la web',
      type: 'boolean',
      group: 'details',
      description: 'Si la apagás, la obra deja de mostrarse en la web sin borrarla.',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Orden',
      type: 'number',
      group: 'details',
      description: 'Los números más bajos aparecen primero. Por defecto: 100.',
      initialValue: 100,
    }),
    defineField({
      name: 'externalStoreUrl',
      title: 'Enlace a la obra en Empretienda',
      type: 'url',
      group: 'store',
      description:
        'Pegá el enlace de esta obra en tu tienda. Si lo dejás vacío, la web lleva a la página de la categoría en la tienda o, si no hay, a la tienda general.',
      validation: empretiendaUrlValidation,
    }),
    defineField({
      name: 'customOrderAvailable',
      title: 'Se puede pedir personalizada',
      type: 'boolean',
      group: 'store',
      description: 'Marcalo si aceptan encargos parecidos a esta obra.',
      initialValue: false,
    }),
    defineField({
      name: 'seoTitle',
      title: 'Título para buscadores',
      type: 'string',
      group: 'seo',
      description: 'Opcional. Si queda vacío se usa el nombre de la obra.',
      validation: (rule) => rule.max(60).warning('Conviene no superar 60 caracteres.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descripción para buscadores',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Opcional. Si queda vacía se usa la descripción corta.',
      validation: (rule) => rule.max(160).warning('Conviene no superar 160 caracteres.'),
    }),
    imageWithAlt({
      name: 'seoImage',
      title: 'Imagen para compartir',
      group: 'seo',
      description: 'Opcional. Si queda vacía se usa la primera foto. Ideal 1200 x 630 px.',
    }),
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'sortOrderAsc',
      by: [
        {field: 'sortOrder', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
    {
      title: 'Nombre (A-Z)',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.name',
      visible: 'visible',
      media: 'images.0',
    },
    prepare({title, category, visible, media}) {
      const parts = [category || 'Sin categoría'];
      if (visible === false) parts.push('(oculta)');
      return {title: title || 'Obra sin nombre', subtitle: parts.join(' '), media};
    },
  },
});
