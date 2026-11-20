import {defineArrayMember, defineField, defineType} from 'sanity';

const DEFAULT_TEXT_NOTE = 'Si queda vacío, la web muestra su texto predeterminado.';

function textBlock(name: string, title: string, description: string) {
  return defineField({
    name,
    title,
    type: 'object',
    description: `${description} ${DEFAULT_TEXT_NOTE}`,
    options: {collapsible: true, collapsed: false},
    fields: [
      defineField({name: 'title', title: 'Título', type: 'string'}),
      defineField({name: 'text', title: 'Texto', type: 'text', rows: 4}),
    ],
  });
}

export const homePage = defineType({
  name: 'homePage',
  title: 'Página de inicio',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Título principal',
      type: 'string',
      description: `La frase grande de arriba de todo. ${DEFAULT_TEXT_NOTE}`,
      validation: (rule) => rule.max(90).warning('Conviene no superar 90 caracteres.'),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Texto de bienvenida',
      type: 'text',
      rows: 3,
      description: `Acompaña al título principal. ${DEFAULT_TEXT_NOTE}`,
      validation: (rule) => rule.max(220).warning('Conviene no superar 220 caracteres.'),
    }),
    defineField({
      name: 'heroArtwork',
      title: 'Obra principal',
      type: 'reference',
      to: [{type: 'artwork'}],
      description: 'La obra grande que se ve arriba de todo en la página de inicio. Si queda vacío, la web elige una.',
    }),
    defineField({
      name: 'featuredArtworks',
      title: 'Obras elegidas',
      type: 'array',
      description: 'Hasta 8 obras para mostrar en la página de inicio. Arrastralas para cambiar el orden. Si queda vacío, la web muestra las obras destacadas.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'artwork'}]})],
      validation: (rule) => [
        rule.max(8).error('Elegí como máximo 8 obras.'),
        rule.unique().error('Cada obra puede aparecer una sola vez.'),
      ],
    }),
    defineField({
      name: 'featuredCategories',
      title: 'Categorías elegidas',
      type: 'array',
      description: 'Categorías para mostrar en la página de inicio. Si queda vacío, la web muestra todas las visibles.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})],
      validation: (rule) => rule.unique().error('Cada categoría puede aparecer una sola vez.'),
    }),
    textBlock('aboutPreview', 'Sección "Nosotras"', 'Presentación breve de quiénes son.'),
    textBlock('customOrdersSection', 'Sección "Personalizados"', 'Invitación a pedir obras por encargo.'),
    textBlock('finalCTA', 'Cierre de la página', 'El último mensaje antes del pie de página.'),
  ],
  preview: {
    prepare() {
      return {title: 'Página de inicio'};
    },
  },
});
