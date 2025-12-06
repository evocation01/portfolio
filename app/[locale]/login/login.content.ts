import { t, type Dictionary } from "intlayer";

const loginContent = {
    key: "login",
    content: {
        metaTitle: t({
            en: "Login",
            tr: "Giriş Yap",
        }),
        metaDescription: t({
            en: "Secure login to access the administration panel of Hakan İspir's portfolio.",
            tr: "Hakan İspir'in portföyünün yönetim paneline erişmek için güvenli giriş.",
        }),
        slug: t({
            en: "login",
            tr: "giris",
        }),
        title: t({
            en: "Login",
            tr: "Giriş Yap",
        }),
        description: t({
            en: "Enter your email and password to access the admin panel.",
            tr: "Yönetici paneline erişmek için e-postanızı ve şifrenizi girin.",
        }),
        emailLabel: t({
            en: "Email",
            tr: "E-posta",
        }),
        emailPlaceholder: t({
            en: "m@example.com",
            tr: "m@ornek.com",
        }),
        passwordLabel: t({
            en: "Password",
            tr: "Şifre",
        }),
        loginButton: t({
            en: "Login",
            tr: "Giriş Yap",
        }),
        backToHomepage: t({
            en: "Back to homepage",
            tr: "Anasayfaya dön",
        }),
    },
} satisfies Dictionary;

export default loginContent;
