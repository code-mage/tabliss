import * as browserLanguage from 'in-browser-language';
// import { addLocaleData } from 'react-intl';

// Add translation data
export const messages = {
  en: {},
  zh: {},
};

export const locales = Object.keys(messages);
export const defaultLocale = browserLanguage.pick(locales, 'en');
