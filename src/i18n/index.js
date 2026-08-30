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

const DEFAULT_LANGUAGE = 'en';
const supportedLanguages = new Set([
  'en', 'zh-CN', 'zh-HK', 'ar', 'en-IN', 'en-SG', 'en-US',
  'ja', 'ko', 'ms', 'ru', 'th', 'ur'
]);
const storedLanguage = localStorage.getItem('language');
const initialLanguage = supportedLanguages.has(storedLanguage)
  ? storedLanguage
  : DEFAULT_LANGUAGE;
// 语言资源
const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
  'en-IN': {
    translation: enIN,
  },
  'en-SG': {
    translation: enSG,
  },
  'en-US': {
    translation: enUS,
  },
  ja: {
    translation: ja,
  },
  ko: {
    translation: ko,
  },
  ms: {
    translation: ms,
  },
  ru: {
    translation: ru,
  },
  th: {
    translation: th,
  },
  ur: {
    translation: ur,
  },
  'zh-CN': {
    translation: zhCN,
  },
  'zh-HK': {
    translation: zhHK,
  }
};

i18next
  .use(initReactI18next)  // 将 i18next 和 React 连接
  .init({
    lng: initialLanguage,  // 首次访问默认使用 English，保留用户已保存的有效选择
    fallbackLng: DEFAULT_LANGUAGE,  // 如果当前语言没有翻译，使用英文回退
    resources,
    keySeparator: false,  // 关闭键分隔符（如果不需要嵌套）
    interpolation: {
      escapeValue: false,  // 不需要转义
    },
    react: {
      useSuspense: false,  // 关闭 Suspense
    },
    parseMissingKeyHandler: (key) => {
      return key; // 没有翻译就返回原文
    },
    returnNull: false,
    returnEmptyString: false,
  });

export default i18next;
