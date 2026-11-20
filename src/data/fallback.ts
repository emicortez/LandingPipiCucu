/**
 * Local content used when Sanity is not configured (development, previews) and as the
 * default for every editable text. Provenance of each fact is noted inline:
 *  - [owners]      published by Deby and Agos on their own Instagram posts.
 *  - [empretienda] read from https://pipicucupc.empretienda.com.ar/ (2026-11-20); external, to confirm.
 *  - [demo]        placeholder written for this site; replace from Sanity.
 */
import type { Artwork, ArtistProfile, Category, HomePage, News, SiteSettings } from '../types/content';
import mariposa from '../assets/works/mariposa.webp';
import florales from '../assets/works/florales.webp';
import amapolas from '../assets/works/amapolas.webp';
import lunas from '../assets/works/lunas.webp';
import gato from '../assets/works/gato.webp';
import founders from '../assets/people/deby-y-agos.webp';
import type { ImageMetadata } from 'astro';

const STORE = 'https://pipicucupc.empretienda.com.ar';
const img = (meta: ImageMetadata, alt: string) => ({ src: meta, width: meta.width, height: meta.height, alt });

export const foundersPhoto = img(founders, 'Deby y Agos, madre e hija, sonriendo juntas al aire libre');

export const fallbackSettings: SiteSettings = {
  brandName: 'Pipí Cucú',
  descriptor: 'Pintura decorativa', // [owners] logo lettering
  instagramUrl: 'https://www.instagram.com/pipicucu_pc',
  whatsappNumber: undefined, // shown on the store; hidden here until the owners confirm it
  storeUrl: `${STORE}/`,
  customOrdersUrl: `${STORE}/pedidos-de-cuadros-personalizados`, // [empretienda]
  location: 'Buena Esperanza, San Luis, Argentina', // [empretienda]
  businessHours: undefined,
  defaultSeo: {
    title: 'Pipí Cucú — Cuadros y objetos pintados a mano en Buena Esperanza, San Luis',
    description:
      'Pintura decorativa hecha a mano por Deby y Agos, madre e hija, en Buena Esperanza, San Luis. Cuadros, objetos y obras personalizadas.',
  },
};

export const fallbackHome: HomePage = {
  heroTitle: 'Pintamos recuerdos, historias y lugares que merecen permanecer.', // [owners]
  heroDescription:
    'Cuadros y objetos pintados a mano por Deby y Agos, madre e hija, en Buena Esperanza, San Luis.',
  heroArtworkSlug: 'mariposa-azul',
  featuredArtworkSlugs: [],
  featuredCategorySlugs: [],
  aboutPreview: {
    title: 'Somos Deborah y Agostina',
    text: 'Madre e hija. Creamos cuadros y objetos pintados a mano con dedicación. Cada pieza es única, como vos.', // [empretienda]
  },
  customOrdersSection: {
    title: 'Un cuadro pensado para tu pared',
    text: 'Charlamos sobre tus ideas, colores, medidas y estilo, y diseñamos juntos la pieza. Trabajamos en acrílico, acuarela, óleo y técnicas mixtas.', // [empretienda]
  },
  finalCTA: {
    title: 'Elegí tu obra en la tienda online',
    text: 'Precios, medios de pago y envíos se gestionan en nuestra tienda de Empretienda.',
  },
};

// [empretienda] category names, order and URLs. Descriptions are [demo].
export const fallbackCategories: Category[] = [
  { id: 'cat-cuadros', name: 'Cuadros', slug: 'cuadros', description: 'Pinturas para colgar: naturaleza, infantiles y piezas únicas.', sortOrder: 1, storeUrl: `${STORE}/cuadros`, cover: img(florales, 'Cuatro paneles con ramos de flores pintados a mano, sostenidos contra el cielo'), seo: {} },
  { id: 'cat-regionales', name: 'Regionales', slug: 'regionales', description: 'Obras de tradición y paisaje criollo.', sortOrder: 2, storeUrl: `${STORE}/regionales`, seo: {} },
  { id: 'cat-navidad', name: 'Navidad', slug: 'navidad', description: 'Adornos y piezas pintadas para las fiestas.', sortOrder: 3, storeUrl: `${STORE}/navidad`, seo: {} },
  { id: 'cat-general', name: 'General', slug: 'general', description: 'Objetos decorativos para el día a día: porta llaves, bandejas y más.', sortOrder: 4, storeUrl: `${STORE}/general`, seo: {} },
];

const cuadros = { name: 'Cuadros', slug: 'cuadros' };
const work = (w: Omit<Artwork, 'tags' | 'featured' | 'customOrderAvailable' | 'seo' | 'category'> & Partial<Artwork>): Artwork => ({
  tags: [], featured: false, customOrderAvailable: false, seo: {}, category: cuadros, ...w,
});

// [demo] titles are descriptive placeholders; the photos are real works by the owners.
export const fallbackArtworks: Artwork[] = [
  work({ id: 'demo-mariposa', title: 'Mariposa azul', slug: 'mariposa-azul', sortOrder: 1, featured: true,
    shortDescription: 'Obra circular con una mariposa azul entre flores blancas.',
    description: 'Obra circular con una mariposa azul de alas abiertas entre flores blancas y hojas, sobre un fondo gris perla.',
    images: [img(mariposa, 'Obra circular con una mariposa azul y flores blancas, sostenida a mano contra el cielo')] }),
  work({ id: 'demo-florales', title: 'Cuatro ramos', slug: 'cuatro-ramos', sortOrder: 2, featured: true,
    shortDescription: 'Cuatro paneles con ramos de flores sobre fondo rosado.',
    description: 'Serie de cuatro paneles con ramos de flores pintados sobre un fondo rosado texturado, pensados para colgar juntos.',
    images: [img(florales, 'Cuatro paneles con ramos de flores pintados a mano, sostenidos contra el cielo')] }),
  work({ id: 'demo-amapolas', title: 'Entre amapolas', slug: 'entre-amapolas', sortOrder: 3, featured: true,
    shortDescription: 'Una mujer con sombrero sentada en un campo de amapolas.',
    description: 'Pintura de una mujer de espaldas, con sombrero de paja y vestido claro, sentada en un campo de amapolas rojas.',
    images: [img(amapolas, 'Pintura de una mujer con sombrero de paja en un campo de amapolas rojas, apoyada sobre el pasto')] }),
  work({ id: 'demo-lunas', title: 'Fases de la luna', slug: 'fases-de-la-luna', sortOrder: 4, featured: true,
    shortDescription: 'Fases lunares plateadas sobre un cielo negro estrellado.',
    description: 'Cinco fases de la luna en tonos plateados sobre un fondo negro con estrellas doradas.',
    images: [img(lunas, 'Cuadro vertical con cinco fases de la luna sobre fondo negro con estrellas doradas')] }),
  // Not featured: the source photo has a mouse cursor baked over the ear (needs a clean photo).
  work({ id: 'demo-gato', title: 'Retrato de gato', slug: 'retrato-de-gato', sortOrder: 5,
    shortDescription: 'Retrato de un gato atigrado sobre fondo oscuro con marco ornamentado.',
    description: 'Retrato de un gato atigrado de ojos verdes sobre fondo oscuro, con un marco pintado con motivos ornamentales.',
    images: [img(gato, 'Retrato pintado de un gato atigrado de ojos verdes sobre fondo oscuro, apoyado sobre el pasto')] }),
];

// [owners] biographies from their own Instagram presentation posts.
export const fallbackArtists: ArtistProfile[] = [
  { id: 'artist-deby', name: 'Deby', role: 'Profesora de pintura decorativa y arte mix media', sortOrder: 1,
    biography: 'Locutora nacional, profesora de pintura decorativa y de arte mix media. Apasionada por el arte decorativo, me encanta transformar lo cotidiano en algo extraordinario. Junto a mi hija Agos comenzamos un emprendimiento donde creamos cuadros y objetos únicos que reflejen la elegancia y el estilo de cada amante de la pintura.' },
  { id: 'artist-agos', name: 'Agos', role: 'Biotecnóloga y pintora', sortOrder: 2,
    biography: 'Soy biotecnóloga y estoy por empezar mi doctorado en ciencias biológicas. De mi mamá heredé la pasión por el arte. Pintar es mi cable a tierra y es la forma más linda que tengo de expresarme.' },
];

export const fallbackNews: News[] = [];

/** [empretienda] meaning of the brand name, from the store's "¿Quiénes somos?" page. */
export const nameDefinition = {
  term: 'pipí cucú',
  note: 'expresión argentina',
  senses: [
    'Expresión utilizada para describir un trabajo decorativo de pintura que se caracteriza por su alta calidad, prolijidad y estética impecable.',
    'Referente a una creación que transmite elegancia visual y un acabado refinado, combinando técnica y estilo.',
  ],
  example: 'Ese cuadro quedó pipí cucú, con pinceladas precisas y colores armónicos.',
};

/** [empretienda] custom-order process. No prices or lead times are published. */
export const customOrders = {
  techniques: ['Acrílico', 'Acuarela', 'Óleo', 'Técnicas mixtas'],
  steps: [
    { title: 'Escribinos', text: 'Mandanos un mensaje privado contándonos qué te imaginás.' },
    { title: 'Coordinamos una cita', text: 'Puede ser virtual o presencial.' },
    { title: 'Diseñamos juntos', text: 'Charlamos sobre tus ideas, colores, medidas y estilo para pensar el cuadro.' },
  ],
  bring: ['La idea o el recuerdo que querés pintar', 'Fotos de referencia, si las tenés', 'Dónde va a ir y qué medida imaginás', 'Colores o estilo que te gustan'],
};
