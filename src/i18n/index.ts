import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import nl from "./locales/nl.json";
import es from "./locales/es.json";
import ar from "./locales/ar.json";
import ua from "./locales/ua.json";
import fr from "./locales/fr.json";
import pt from "./locales/pt.json";

i18n.use(initReactI18next).init({
  resources: {
    EN: { translation: en },
    NL: { translation: nl },
    ES: { translation: es },
    AR: { translation: ar },
    UA: { translation: ua },
    FR: { translation: fr },
    PT: { translation: pt },
  },
  lng: "NL",
  fallbackLng: "EN",
  interpolation: { escapeValue: false },
});

export default i18n;
