import {defineType,defineField} from 'sanity';
// Every text is optional: an empty field shows the site's original text.
const emphasisHelp='Para poner palabras en cursiva, encerralas entre asteriscos: Láminas *elegidas*.';
const text=(name:string,title:string,group:string,description:string,max:number,long=false)=>defineField({
 name,title,group,type:long?'text':'string',rows:long?3:undefined,
 description:`${description} Si queda vacío se usa el texto original.`,
 validation:r=>r.max(max).warning(`Conviene no superar ${max} caracteres para que no se desarme el diseño.`),
});
export const siteSettings=defineType({name:'siteSettings',title:'Configuración del sitio (crear solo 1)',type:'document',
 groups:[
  {name:'links',title:'Enlaces',default:true},
  {name:'hero',title:'Portada'},
  {name:'selections',title:'Láminas elegidas'},
  {name:'story',title:'Nosotras'},
  {name:'custom',title:'Personalizados'},
  {name:'news',title:'Novedades'},
  {name:'footer',title:'Pie de página'},
 ],
 fields:[
  defineField({name:'logo',title:'Logo',type:'image',group:'links',description:'Se muestra en el pie de página.'}),
  defineField({name:'storeUrl',title:'Tienda Empretienda',type:'url',group:'links',validation:r=>r.required().uri({scheme:['https']})}),
  defineField({name:'instagramUrl',title:'Instagram',type:'url',group:'links',validation:r=>r.uri({scheme:['https']})}),
  defineField({name:'whatsappUrl',title:'WhatsApp (opcional)',type:'url',group:'links',validation:r=>r.uri({scheme:['https']})}),
  text('storeButtonLabel','Texto del botón "Tienda"','links','Botón a la tienda del menú superior y de la portada.',20),

  defineField({name:'heroArtwork',title:'Obra de portada',type:'reference',to:[{type:'artwork'}],group:'hero',
   description:'La lámina grande que aparece arriba de todo en la página de inicio. Si queda vacía, o la obra está oculta, se usa la primera obra destacada.'}),
  text('heroEyebrow','Texto chico sobre el titular','hero','Ejemplo: Lámina Nº 01.',30),
  defineField({name:'headline',title:'Titular principal',type:'string',group:'hero',
   description:`${emphasisHelp} Sin asteriscos, la última palabra va en cursiva. Si queda vacío se usa el texto original.`,
   validation:r=>r.max(60).warning('Conviene no superar 60 caracteres para que no se desarme el diseño.')}),
  defineField({name:'subheadline',title:'Descripción de inicio',type:'text',rows:3,group:'hero',
   description:'Texto bajo el titular. Si queda vacío se usa el texto original.',
   validation:r=>r.max(180).warning('Conviene no superar 180 caracteres para que no se desarme el diseño.')}),
  text('heroPrimaryLabel','Botón "Ver las obras"','hero','Botón que lleva al catálogo.',30),
  text('heroArtworkStoreLabel','Enlace de la obra de portada a la tienda','hero','Texto bajo la ficha de la obra de portada.',40),

  text('selectionsTitle','Título de la sección','selections',emphasisHelp,40),
  text('selectionsLinkLabel','Enlace "Ver todo"','selections','Enlace al catálogo completo.',30),

  text('storyTitle','Título de la sección','story',emphasisHelp,50),
  defineField({name:'foundersText',title:'Texto sobre nosotras',type:'text',rows:3,group:'story',
   description:'Primer párrafo. Si queda vacío se usa el texto original.',
   validation:r=>r.max(300).warning('Conviene no superar 300 caracteres para que no se desarme el diseño.')}),
  text('storyText','Segundo párrafo','story','Texto debajo del anterior.',300,true),
  text('instagramLabel','Enlace a Instagram','story','Texto del enlace a Instagram.',30),

  text('customTitle','Título de la sección','custom',emphasisHelp,50),
  text('customText','Texto','custom','Explica cómo pedir una pieza personalizada.',300,true),
  text('customButtonLabel','Texto del botón','custom','Botón que lleva a la tienda.',45),

  text('newsTitle','Título de la sección','news',emphasisHelp,40),
  text('newsLinkLabel','Enlace "Ver todas"','news','Enlace a todas las novedades.',30),

  text('footerTitle','Título','footer',emphasisHelp,50),
  text('footerText','Texto','footer','Texto bajo el título.',200,true),
  text('footerButtonLabel','Texto del botón','footer','Botón a la tienda.',30),
  text('footerNote','Nota final','footer','Línea chica al final de la página.',120),
 ]});
