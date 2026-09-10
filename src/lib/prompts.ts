import type { EntryType } from '@/types';
import type { Framework } from '@/types';
import type { Translations } from '@/lib/i18n';

export function getStylePrompts(entryType: EntryType, t: Translations) {
  const f = t.frameworks?.[entryType];
  if (!f || !f.fields) {
    return [{ label: t.entryTypes[entryType].description, hint: t.newEntry.startAnywhere }];
  }

  const list: { label: string; hint: string }[] = [];
  for (const value of Object.values(f.fields as Record<string, unknown>)) {
    const v = value as any;
    if (!v || typeof v !== 'object') continue;
    const label = v.label || v.question;
    if (!label) continue;
    const hint =
      v.placeholder || v.hint || v.description || v.emotionPlaceholder || '';
    list.push({ label: String(label), hint: hint ? String(hint) : '' });
  }

  return list.length
    ? list
    : [{ label: t.entryTypes[entryType].description, hint: t.newEntry.startAnywhere }];
}

export function getWhyThisWorks(
  entryType: EntryType,
  selectedFramework: Framework | undefined,
  t: Translations
) {
  if (selectedFramework) {
    return {
      label: t.newEntry.whyThisWorks,
      claim: selectedFramework.description,
      citation: selectedFramework.evidenceBase?.sources?.[0]?.title,
      note: undefined,
    };
  }

  const f = t.frameworks?.[entryType];
  if (f?.quote) {
    return {
      label: t.newEntry.whyThisWorks,
      claim: f.quote,
      citation: f.source,
      note: f.citation,
    };
  }
  if (f?.intro) {
    return {
      label: t.newEntry.whyThisWorks,
      claim: f.intro,
      citation: f.source,
      note: undefined,
    };
  }

  return {
    label: t.newEntry.whyThisWorks,
    claim: t.entryTypes[entryType].description,
    citation: t.newEntry.evidence,
    note: undefined,
  };
}
