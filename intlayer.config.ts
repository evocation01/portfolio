import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
    internationalization: {
        locales: [Locales.ENGLISH, Locales.TURKISH],
        defaultLocale: Locales.ENGLISH,
    },
    content: {
        contentDir: ["app"],
    },
    routing: {
        mode: "prefix-no-default", // default
    },
};

export default config;
