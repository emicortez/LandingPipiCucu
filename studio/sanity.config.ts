import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {schemaTypes} from './schemaTypes';
export default defineConfig({name:'pipicucu',title:'Pipí Cucú · Administración',projectId:process.env.SANITY_STUDIO_PROJECT_ID || 'REEMPLAZAR_PROJECT_ID',dataset:process.env.SANITY_STUDIO_DATASET || 'production',plugins:[structureTool()],schema:{types:schemaTypes}});
