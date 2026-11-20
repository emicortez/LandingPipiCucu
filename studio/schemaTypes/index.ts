import {artistProfile} from './artistProfile';
import {artwork} from './artwork';
import {category} from './category';
import {homePage} from './homePage';
import {news} from './news';
import {siteSettings} from './siteSettings';

export {artistProfile, artwork, category, homePage, news, siteSettings};

/** Document types edited as a single fixed document. */
export const SINGLETON_TYPES = new Set(['homePage', 'siteSettings']);

export const schemaTypes = [artwork, category, news, artistProfile, homePage, siteSettings];
