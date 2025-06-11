import { createI18n } from 'vue-i18n'

// Translation files
import enMenu from '@/locales/en/enMenu.json'
import viMenu from '@/locales/vi/viMenu.json'
import enLogin from '@/locales/en/enLogin.json'
import viLogin from '@/locales/vi/viLogin.json'

const i18n = createI18n({
  legacy: false,              // use Composition API ($t, useI18n)
  globalInjection: true,      // allow $t in templates without manual import
  locale: 'en',               // default language
  fallbackLocale: 'vi',       // fallback
  messages: {
    en: {
      login: enLogin,
      menu: enMenu

    },
    vi: {
      login: viLogin,
      menu: viMenu
    }
  }
})

export default i18n