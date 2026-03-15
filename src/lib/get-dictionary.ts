import 'server-only';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  pt: () => import('@/dictionaries/pt.json').then((module) => module.default),
};

// Tipagem para garantir que só aceitamos 'en' ou 'pt'
export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  // Se por algum motivo o locale não for en ou pt, ele força pt
  const loader = dictionaries[locale] || dictionaries.pt;
  return loader();
};