/** Returns the URL only when it is absolute https (or mailto when allowed); otherwise undefined. */
export function safeExternalUrl(value: unknown, opts: { allowMailto?: boolean; host?: string } = {}): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  try {
    const url = new URL(value.trim());
    if (opts.allowMailto && url.protocol === 'mailto:') return url.href;
    if (url.protocol !== 'https:') return undefined;
    if (opts.host && url.hostname !== opts.host) return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

export const STORE_HOST = 'pipicucupc.empretienda.com.ar';

/** wa.me link for an international digits-only number; undefined when not configured or malformed. */
export function whatsappHref(number: string | undefined, message?: string): string | undefined {
  if (!number || !/^\d{10,15}$/.test(number)) return undefined;
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

/** Joins a path to the configured site origin. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  return new URL(path, site ?? 'http://localhost:4321').href;
}
