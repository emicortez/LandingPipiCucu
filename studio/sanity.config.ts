import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {schemaTypes, SINGLETON_TYPES} from './schemaTypes';
import {structure} from './structure';

/** Actions allowed on singleton documents (no delete, no duplicate). */
const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore', 'unpublish']);

export default defineConfig({
  name: 'pipicucu',
  title: 'Pipí Cucú · Administración',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'REEMPLAZAR_PROJECT_ID',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({structure})],
  schema: {
    types: schemaTypes,
    // Singletons are opened from the desk only; never created from "new document".
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global'
        ? prev.filter((item) => !SINGLETON_TYPES.has(item.templateId))
        : prev,
    actions: (prev, {schemaType}) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(({action}) => action && SINGLETON_ACTIONS.has(action))
        : prev,
  },
});
