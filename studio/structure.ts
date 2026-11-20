import type {StructureResolver} from 'sanity/structure';

/** Desk structure: two fixed singletons, then the editable collections. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Página de inicio')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage').title('Página de inicio')),
      S.listItem()
        .title('Configuración del sitio')
        .id('siteSettings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings').title('Configuración del sitio'),
        ),
      S.divider(),
      S.documentTypeListItem('artwork').title('Obras'),
      S.documentTypeListItem('category').title('Categorías'),
      S.documentTypeListItem('news').title('Novedades'),
      S.documentTypeListItem('artistProfile').title('Artistas'),
    ]);
