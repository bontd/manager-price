import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import vi from './locales/vi.json';

i18n
  .use(LanguageDetector) // tự động detect ngôn ngữ trình duyệt
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi }
    },
    fallbackLng: 'en', // fallback nếu không detect được
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
