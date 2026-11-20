import {createClient} from '@sanity/client';
import {defaults,demoSettings,mergeSettings,demoCategories,demoNews,demoWorks,type Work,type Category,type News,type Settings} from '../data/demo';
const projectId=import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset=import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const client=projectId ? createClient({projectId,dataset,apiVersion:import.meta.env.PUBLIC_SANITY_API_VERSION || '2025-02-19',useCdn:true,perspective:'published'}) : null;
export const usingDemo = !client;
const workFields=`_id, title, "slug":slug.current, "category":category->name, "image":coalesce(mainImage.asset->url, ''), "images":gallery[].asset->url, description, technique, dimensions, externalUrl, featured, displayOrder`;
async function safeFetch<T>(query:string, fallback:T):Promise<T>{ if(!client)return fallback; try{return await client.fetch<T>(query);}catch(err){console.error('Error consultando Sanity:',err);throw err;} }
export const getWorks=()=>safeFetch<Work[]>(`*[_type == "artwork" && visible == true] | order(displayOrder asc, _createdAt desc) {${workFields}}`,demoWorks);
export const getCategories=()=>safeFetch<Category[]>(`*[_type == "category"] | order(displayOrder asc, name asc) {name,"slug":slug.current, description,"image":image.asset->url}`,demoCategories);
export const getNews=()=>safeFetch<News[]>(`*[_type == "news" && published == true] | order(publishedAt desc) {_id,title,"slug":slug.current,excerpt,body,"image":image.asset->url,publishedAt,externalUrl}`,demoNews);
const settingsFields=`storeUrl,instagramUrl,whatsappUrl,"logoUrl":logo.asset->url,storeButtonLabel,"heroArtworkSlug":heroArtwork->slug.current,heroEyebrow,headline,subheadline,heroPrimaryLabel,heroArtworkStoreLabel,selectionsTitle,selectionsLinkLabel,storyTitle,foundersText,storyText,instagramLabel,customTitle,customText,customButtonLabel,newsTitle,newsLinkLabel,footerTitle,footerText,footerButtonLabel,footerNote`;
export const getSettings=()=>safeFetch<Partial<Settings>|null>(`*[_type == "siteSettings"][0]{${settingsFields}}`,demoSettings).then(s=>mergeSettings(defaults,s));
export function shopLink(work:Work,settings:Settings):string{return work.externalUrl || settings.storeUrl;}
