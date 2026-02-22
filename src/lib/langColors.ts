export async function fetchLangColors(): Promise<Record<string, string | null>> {
  const res = await fetch('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json');
  if (!res.ok) return {};

  const data: Record<string, { color: string | null }> = await res.json();
  const colors: Record<string, string | null> = {};
  for (const [lang, { color }] of Object.entries(data)) {
    colors[lang] = color;
  }
  return colors;
}
