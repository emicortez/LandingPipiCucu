export interface Category { name: string; slug: string; description?: string; image?: string; }
export interface Work { _id: string; title: string; slug: string; category: string; image: string; images?: string[]; description: string; technique?: string; dimensions?: string; externalUrl?: string; featured?: boolean; displayOrder?: number; }
export interface News { _id: string; title: string; slug: string; excerpt: string; body?: string; image?: string; publishedAt?: string; externalUrl?: string; }
export interface Settings { storeUrl:string; instagramUrl:string; whatsappUrl?:string; headline:string; subheadline:string; foundersText:string; logoUrl:string; }
export const defaults:Settings = {
 storeUrl:'https://pipicucupc.empretienda.com.ar/', instagramUrl:'https://www.instagram.com/pipicucu_pc',
 headline:'Arte para espacios con historia.', subheadline:'Piezas pintadas a mano, creadas para guardar recuerdos y transformar espacios.',
 foundersText:'Somos Deby y Agos, madre e hija. Compartimos la pasión por el arte y por crear piezas con una historia especial.',
 logoUrl:'/images/logo-original.webp'
};
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
