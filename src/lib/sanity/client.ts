import { createClient, type SanityClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

/**
 * Read-only client used at build time. No token: the dataset must be public-read,
 * and only published documents are queried. Null when Sanity is not configured.
 */
export const sanity: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2025-02-19',
      useCdn: false, // builds must see what was just published
      perspective: 'published',
    })
  : null;
