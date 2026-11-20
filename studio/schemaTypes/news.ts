import {defineArrayMember, defineField, defineType} from 'sanity';
import {httpsUrlValidation, imageWithAlt, seoField, slugField} from './fields';

export const news = defineType({
  name: 'news',
  title: 'Novedades',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required().error('Escribí el título de la novedad.'),
    }),
    slugField('title'),
    defineField({
      name: 'excerpt',
      title: 'Resumen',
      type: 'text',
      rows: 3,
      description: 'Dos o tres líneas que se ven en el listado de novedades.',
      validation: (rule) => [
        rule.required().error('Escribí un resumen corto.'),
        rule.max(200).warning('Conviene no superar 200 caracteres.'),
      ],
    }),
    imageWithAlt({name: 'coverImage', title: 'Imagen de portada', description: 'Opcional.'}),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Subtítulo', value: 'h2'},
            {title: 'Subtítulo chico', value: 'h3'},
            {title: 'Cita', value: 'blockquote'},
          ],
          lists: [
            {title: 'Viñetas', value: 'bullet'},
            {title: 'Numerada', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Negrita', value: 'strong'},
              {title: 'Cursiva', value: 'em'},
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Enlace',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'Dirección',
                    type: 'url',
                    description: 'Un enlace https:// o un correo (mailto:nombre@ejemplo.com).',
                    validation: (rule) =>
                      rule
                        .required()
                        .uri({scheme: ['https', 'mailto']})
                        .error('Usá un enlace que empiece con https:// o mailto:'),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      description: 'Las novedades se ordenan por esta fecha, de la más nueva a la más vieja.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required().error('Elegí la fecha de publicación.'),
    }),
    defineField({
      name: 'featured',
      title: 'Destacada',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'externalUrl',
      title: 'Enlace externo',
      type: 'url',
      description: 'Opcional. Por ejemplo, la publicación original en Instagram.',
      validation: httpsUrlValidation,
    }),
    seoField(),
  ],
  orderings: [
    {
      title: 'Más recientes',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', date: 'publishedAt', media: 'coverImage'},
    prepare({title, date, media}) {
      const subtitle = date ? new Date(date).toLocaleDateString('es-AR') : undefined;
      return {title: title || 'Novedad sin título', subtitle, media};
    },
  },
});
