/**
 * SAMPLE CONTENT — written for the site so every section can be designed with real-looking
 * material. None of it is confirmed by the owners. Everything here renders with a visible
 * "muestra" tag, sample pages are noindex and out of the sitemap, and SAMPLE_CONTENT.md lists
 * each item to replace (most of it moves to Sanity).
 */
import type { News } from '../types/content';
import lunas from '../assets/works/lunas.webp';
import amapolas from '../assets/works/amapolas.webp';

const block = (text: string, style: 'normal' | 'h2' | 'blockquote' = 'normal') => ({ _type: 'block' as const, style, children: [{ _type: 'span' as const, text }] });
const bullet = (text: string) => ({ _type: 'block' as const, style: 'normal' as const, listItem: 'bullet' as const, children: [{ _type: 'span' as const, text }] });

export const sampleNews: (News & { sample: true })[] = [
  {
    id: 'sample-news-1', sample: true, featured: true, seo: {},
    title: 'Una serie nueva: lunas y estrellas',
    slug: 'serie-lunas-y-estrellas',
    publishedAt: '2026-11-10T12:00:00Z',
    excerpt: 'Estamos pintando una serie de cuadros inspirados en las fases de la luna, en plateados y dorados sobre fondos oscuros.',
    cover: { src: lunas, width: lunas.width, height: lunas.height, alt: 'Cuadro con cinco fases de la luna sobre fondo negro con estrellas doradas' },
    content: [
      block('Todo empezó con un cuadro de fases lunares que pintamos para casa. Nos gustó tanto cómo quedaba el plateado sobre el negro que decidimos hacer una serie.'),
      block('Cada pieza lleva varias capas: primero el fondo, después las lunas con textura y al final los detalles dorados, estrella por estrella.', 'normal'),
      block('Las lunas tienen algo de calma. Queríamos cuadros para mirar de noche.', 'blockquote'),
      block('Muy pronto las vas a ver en la tienda online.'),
    ],
  },
  {
    id: 'sample-news-2', sample: true, featured: false, seo: {},
    title: 'Ya estamos pintando los adornos de Navidad',
    slug: 'adornos-de-navidad',
    publishedAt: '2026-11-02T12:00:00Z',
    excerpt: 'Arbolitos, colgantes y piezas para regalar: este año sumamos diseños nuevos pintados a mano.',
    content: [
      block('Como cada fin de año, el taller se llena de verde, rojo y dorado. Estamos preparando adornos y piezas chicas pensadas para regalar.'),
      block('Lo que vas a encontrar', 'h2'),
      bullet('Colgantes pintados a mano para el árbol.'),
      bullet('Arbolitos decorativos para la mesa o un estante.'),
      bullet('Piezas con nombre, para regalos personalizados.'),
      block('Te avisamos por Instagram cuando estén en la tienda.'),
    ],
  },
  {
    id: 'sample-news-3', sample: true, featured: false, seo: {},
    title: 'Cómo cuidar un cuadro pintado a mano',
    slug: 'como-cuidar-un-cuadro',
    publishedAt: '2026-10-20T12:00:00Z',
    excerpt: 'Tres cuidados simples para que tu cuadro se mantenga como el primer día.',
    cover: { src: amapolas, width: amapolas.width, height: amapolas.height, alt: 'Pintura de una mujer con sombrero en un campo de amapolas rojas' },
    content: [
      block('Un cuadro pintado a mano dura muchísimo si lo cuidás un poquito. Estos son nuestros consejos de siempre:'),
      bullet('Evitá el sol directo: con los años, la luz fuerte apaga los colores.'),
      bullet('Limpialo con un paño seco y suave, nunca con productos de limpieza.'),
      bullet('Colgalo lejos de la humedad, por ejemplo, no en una pared de baño.'),
      block('Si tenés dudas con alguna pieza, escribinos y te contamos cómo está hecha.'),
    ],
  },
];

/** Custom orders FAQ. Answers marked `sample` must be confirmed by the owners. */
export const customOrdersFaq: { q: string; a: string; sample: boolean }[] = [
  { q: '¿Qué se puede pedir personalizado?', a: 'Cuadros con mascotas, paisajes, flores, frases o un lugar especial para vos. Si tenés una idea, la charlamos.', sample: true },
  { q: '¿Cuánto tarda un encargo?', a: 'Depende de la medida y de la técnica. Lo vemos juntos en la cita, antes de empezar.', sample: true },
  { q: '¿Puedo ver un boceto antes?', a: 'Sí: antes de pintar te mostramos la idea para que nos digas si vamos bien.', sample: true },
  { q: '¿Hacen envíos?', a: 'Sí, hacemos envíos a todo el país. Se coordinan desde la tienda online.', sample: false },
];

/** Workshop timeline for /nosotras/. Years and events are placeholders. */
export const workshopTimeline: { year: string; title: string; text: string }[] = [
  { year: '2018', title: 'Las primeras clases', text: 'Deby empieza a dar clases de pintura decorativa en Buena Esperanza.' },
  { year: '2021', title: 'Agos se suma', text: 'Entre estudio y estudio, Agos vuelve a los pinceles y empiezan a pintar juntas.' },
  { year: '2023', title: 'Nace Pipí Cucú', text: 'Abren la tienda online y empiezan los pedidos personalizados.' },
  { year: '2026', title: 'Nuevas series', text: 'Lunas, flores y regionales: el taller sigue creciendo.' },
];

/** Opening hours placeholder for /contacto/. */
export const sampleHours = 'Lunes a viernes de 9 a 13 y de 17 a 20 h. Sábados de 10 a 13 h.';

/** Technique and size placeholders for the local sample works, by slug. */
export const sampleSpecs: Record<string, { technique: string; dimensions: string }> = {
  'mariposa-azul': { technique: 'Acrílico sobre MDF', dimensions: '40 cm de diámetro' },
  'cuatro-ramos': { technique: 'Acrílico sobre madera, cuatro paneles', dimensions: '30 x 30 cm cada uno' },
  'entre-amapolas': { technique: 'Óleo sobre tela', dimensions: '50 x 40 cm' },
  'fases-de-la-luna': { technique: 'Acrílico y pan de oro sobre madera', dimensions: '30 x 60 cm' },
  'retrato-de-gato': { technique: 'Acrílico sobre madera tallada', dimensions: '35 x 45 cm' },
};

