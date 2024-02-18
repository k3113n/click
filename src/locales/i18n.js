import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import translations from './translations.json';

const i18n = new I18n(translations);
i18n.locale = getLocales()[0].languageCode;
i18n.fallbacks = true;

export default i18n;