import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import ar from '../locales/ar.json';
import enIN from '../locales/en-IN.json';
import enSG from '../locales/en-SG.json';
import enUS from '../locales/en-US.json';
import ja from '../locales/ja.json';
import ko from '../locales/ko.json';
import ms from '../locales/ms.json';
import ru from '../locales/ru.json';
import th from '../locales/th.json';
import ur from '../locales/ur.json';
import zhCN from '../locales/zh-CN.json';
import zhHK from '../locales/zh-HK.json';
import { LANGUAGE_CODES } from './siteConfig.js';

const DEFAULT_LANGUAGE = 'en';
const localeModules = {
  en,
  'en-US': enUS,
  'en-SG': enSG,
  'en-IN': enIN,
  'zh-CN': zhCN,
  'zh-HK': zhHK,
  ja,
  ko,
  ms,
  th,
  ar,
  ru,
  ur,
};

const supportedLanguages = new Set(LANGUAGE_CODES);
const storedLanguage = localStorage.getItem('language');
const initialLanguage = supportedLanguages.has(storedLanguage)
  ? storedLanguage
  : DEFAULT_LANGUAGE;

const resources = Object.fromEntries(
  LANGUAGE_CODES.map((code) => [code, { translation: localeModules[code] }]),
);

i18next
  .use(initReactI18next)
  .init({
    lng: initialLanguage,
    fallbackLng: DEFAULT_LANGUAGE,
    resources,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    parseMissingKeyHandler: (key) => {
      return key;
    },
    returnNull: false,
    returnEmptyString: false,
  });

export default i18next;
