const dateFmt = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Argentina/San_Luis' });

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '' : dateFmt.format(date);
}

export function paragraphs(text: string | undefined): string[] {
  return (text ?? '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}
