import {defineField, defineType} from 'sanity';
import {empretiendaUrlValidation, imageWithAlt, seoField, slugField} from './fields';

export const category = defineType({
  name: 'category',
  title: 'Categorías',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required().error('Escribí el nombre de la categoría.'),
    }),
    slugField('name'),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      description: 'Opcional. Se muestra en la página de la categoría.',
    }),
    imageWithAlt({
      name: 'coverImage',
      title: 'Imagen de portada',
      description: 'Opcional. Una obra que represente a la categoría.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Orden',
      type: 'number',
      description: 'Los números más bajos aparecen primero.',
      initialValue: 100,
    }),
    defineField({
      name: 'visible',
      title: 'Visible en la web',
      type: 'boolean',
      description: 'Si la apagás, la categoría deja de mostrarse en la web sin borrarla.',
      initialValue: true,
    }),
    defineField({
      name: 'storeUrl',
      title: 'Enlace en Empretienda',
      type: 'url',
      description: 'Página de esta categoría en Empretienda.',
      validation: empretiendaUrlValidation,
    }),
    seoField(),
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'sortOrderAsc',
      by: [
        {field: 'sortOrder', direction: 'asc'},
        {field: 'name', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'name', visible: 'visible', media: 'coverImage'},
    prepare({title, visible, media}) {
      return {title: title || 'Categoría sin nombre', subtitle: visible === false ? '(oculta)' : undefined, media};
    },
  },
});
