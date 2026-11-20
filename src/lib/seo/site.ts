/**
 * Indexing policy, decided at build time.
 * - Cloudflare Pages: only the production branch is indexable (CF_PAGES_BRANCH === PRODUCTION_BRANCH).
 * - Elsewhere: indexable unless PUBLIC_INDEXABLE=false.
 */
const env = typeof process !== 'undefined' ? process.env : {};
const productionBranch = env.PRODUCTION_BRANCH || 'main';

export const indexable: boolean = env.CF_PAGES
  ? env.CF_PAGES_BRANCH === productionBranch
  : env.PUBLIC_INDEXABLE !== 'false';

export const SITE_LOCALE = 'es_AR';
