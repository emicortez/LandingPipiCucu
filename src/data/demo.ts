export interface Category { name: string; slug: string; description?: string; image?: string; }
export interface Work { _id: string; title: string; slug: string; category: string; image: string; images?: string[]; description: string; technique?: string; dimensions?: string; externalUrl?: string; featured?: boolean; displayOrder?: number; }
export interface News { _id: string; title: string; slug: string; excerpt: string; body?: string; image?: string; publishedAt?: string; externalUrl?: string; }
// Text fields are editable in Sanity (siteSettings); titles accept *asterisks* to mark the italic words.
export interface Settings {
 storeUrl:string; instagramUrl:string; whatsappUrl?:string; logoUrl:string; storeButtonLabel:string;
 heroArtworkSlug?:string; heroEyebrow:string; headline:string; subheadline:string; heroPrimaryLabel:string; heroArtworkStoreLabel:string;
 selectionsTitle:string; selectionsLinkLabel:string;
 storyTitle:string; foundersText:string; storyText:string; instagramLabel:string;
 customTitle:string; customText:string; customButtonLabel:string;
 newsTitle:string; newsLinkLabel:string;
 footerTitle:string; footerText:string; footerButtonLabel:string; footerNote:string;
}
export const defaults:Settings = {
 storeUrl:'https://pipicucupc.empretienda.com.ar/', instagramUrl:'https://www.instagram.com/pipicucu_pc',
 logoUrl:'/images/logo-original.webp', storeButtonLabel:'Tienda',
 heroEyebrow:'Lámina Nº 01',
 headline:'Arte para espacios con historia.', subheadline:'Piezas pintadas a mano, creadas para guardar recuerdos y transformar espacios.',
 heroPrimaryLabel:'Ver las obras', heroArtworkStoreLabel:'Ver esta obra en la tienda',
 selectionsTitle:'Láminas *elegidas*', selectionsLinkLabel:'Ver todo el herbario',
 storyTitle:'Deby y Agos. *Madre e hija.*',
 foundersText:'Somos Deby y Agos, madre e hija. Compartimos la pasión por el arte y por crear piezas con una historia especial.',
 storyText:'Cada obra se pinta a mano en Buena Esperanza, San Luis: flores, retratos, lunas y encargos que guardan un recuerdo.',
 instagramLabel:'Seguinos en Instagram',
 customTitle:'Tu idea, *pintada a mano.*',
 customText:'¿Tenés una historia, un recuerdo o un espacio que merece algo especial? También hacemos piezas personalizadas, y se piden igual que cualquier obra: desde nuestra tienda.',
 customButtonLabel:'Pedir un personalizado en la tienda',
 newsTitle:'Novedades', newsLinkLabel:'Ver todas',
 footerTitle:'Un poquito de *arte* para tu casa.',
 footerText:'Pintura decorativa hecha a mano por Deby y Agos en Buena Esperanza, San Luis, Argentina.',
 footerButtonLabel:'Ir a la tienda',
 footerNote:'Precios, pagos, envíos y pedidos se gestionan en nuestra tienda de Empretienda.',
};
// Demo mode only: with Sanity, an unset "Obra de portada" falls back to the first featured work instead.
export const demoSettings:Settings = {...defaults, heroArtworkSlug:'mariposa-azul'};
// Unset fields come back from Sanity as null; null, undefined and blank strings keep the default.
export function mergeSettings(base:Settings, fetched?:Partial<Record<keyof Settings,unknown>>|null):Settings{
 const merged:Record<string,unknown>={...base};
 for(const [key,value] of Object.entries(fetched||{})){
  if(value===null || value===undefined || (typeof value==='string' && value.trim()==='')) continue;
  merged[key]=value;
 }
 return merged as unknown as Settings;
}
// Contenido de demostración: títulos y categorías editoriales ORIENTATIVOS. No representan inventario ni disponibilidad.
export const demoCategories:Category[] = [
 {name:'Florales',slug:'florales',description:'Naturaleza y color.',image:'/images/florales.webp'},
 {name:'Figurativas',slug:'figurativas',description:'Historias hechas pintura.',image:'/images/amapolas.webp'},
 {name:'Retratos',slug:'retratos',description:'Detalles que cuentan.',image:'/images/gato.webp'},
 {name:'Simbólicas',slug:'simbolicas',description:'Formas y significado.',image:'/images/lunas.webp'},
];
export const demoWorks:Work[] = [
 {_id:'demo-1',title:'Flores que cuentan historias',slug:'flores-que-cuentan-historias',category:'Florales',image:'/images/florales.webp',description:'Composición de cuatro pinturas florales hechas a mano con fondos rosados texturados.',featured:true,displayOrder:1},
 {_id:'demo-2',title:'Entre amapolas',slug:'entre-amapolas',category:'Figurativas',image:'/images/amapolas.webp',description:'Pintura figurativa de una mujer en un campo de amapolas rojas.',featured:true,displayOrder:2},
 {_id:'demo-3',title:'Fases de la luna',slug:'fases-de-la-luna',category:'Simbólicas',image:'/images/lunas.webp',description:'Obra de fases lunares sobre fondo oscuro y detalles dorados.',displayOrder:3},
 {_id:'demo-4',title:'Una mirada única',slug:'una-mirada-unica',category:'Retratos',image:'/images/gato.webp',description:'Retrato pintado a mano de un gato, sobre fondo oscuro.',featured:true,displayOrder:4},
 {_id:'demo-5',title:'Mariposa azul',slug:'mariposa-azul',category:'Florales',image:'/images/mariposa.webp',description:'Obra circular con mariposa azul y flores blancas.',featured:true,displayOrder:5},
];
export const demoNews:News[] = [];
