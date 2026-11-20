import {defineField, defineType} from 'sanity';
import {imageWithAlt} from './fields';

export const artistProfile = defineType({
  name: 'artistProfile',
  title: 'Artistas',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required().error('Escribí el nombre.'),
    }),
    defineField({
      name: 'role',
      title: 'Rol',
      type: 'string',
      description: 'Por ejemplo: "Artista y cofundadora".',
      validation: (rule) => rule.required().error('Escribí el rol.'),
    }),
    imageWithAlt({
      name: 'photo',
      title: 'Foto',
      hotspot: true,
      description: 'Opcional. Una foto real, sin texto encima. Con el punto de foco elegís qué parte no se recorta.',
    }),
    defineField({
      name: 'biography',
      title: 'Biografía',
      type: 'text',
      rows: 6,
      description: 'Dejá una línea en blanco para empezar un párrafo nuevo.',
      validation: (rule) => rule.required().error('Escribí la biografía.'),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Orden',
      type: 'number',
      description: 'Los números más bajos aparecen primero.',
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
});
