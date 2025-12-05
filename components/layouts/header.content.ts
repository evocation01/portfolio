import { t, type Dictionary } from "intlayer";

const headerContent = {
    key: "header",
    content: {
        home: t({
            en: "Home",
            tr: "Anasayfa",
        }),
        projects: t({
            en: "Projects",
            tr: "Projeler",
        }),
        about: t({
            en: "About",
            tr: "Hakkımda",
        }),
        contact: t({
            en: "Contact",
            tr: "İletişim",
        }),
        login: t({
            en: "Login",
            tr: "Giriş Yap",
        }),
        logout: t({
            en: "Logout",
            tr: "Çıkış Yap",
        }),
    },
} satisfies Dictionary;

export default headerContent;
