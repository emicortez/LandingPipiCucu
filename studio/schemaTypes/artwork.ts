import {defineType,defineField} from 'sanity';
export const artwork=defineType({name:'artwork',title:'Obras y productos',type:'document',fields:[
 defineField({name:'title',title:'Título',type:'string',validation:r=>r.required()}),
 defineField({name:'slug',title:'URL de la obra',type:'slug',options:{source:'title'},validation:r=>r.required()}),
 defineField({name:'mainImage',title:'Foto principal',type:'image',options:{hotspot:true},validation:r=>r.required()}),
 defineField({name:'gallery',title:'Más imágenes',type:'array',of:[{type:'image',options:{hotspot:true}}]}),
 defineField({name:'description',title:'Descripción',type:'text',rows:4}),
 defineField({name:'category',title:'Categoría',type:'reference',to:[{type:'category'}],validation:r=>r.required()}),
 defineField({name:'technique',title:'Técnica',type:'string'}),
 defineField({name:'dimensions',title:'Medidas',type:'string'}),
 defineField({name:'externalUrl',title:'Enlace directo en Empretienda (opcional)',description:'Si está vacío se enviará a la tienda general.',type:'url',validation:r=>r.uri({scheme:['https']})}),
 defineField({name:'featured',title:'Destacada en la home',type:'boolean',initialValue:false}),
 defineField({name:'visible',title:'Mostrar en la web',type:'boolean',initialValue:true}),
 defineField({name:'displayOrder',title:'Orden de exhibición',type:'number',initialValue:100}),
],preview:{select:{title:'title',media:'mainImage'}}});
