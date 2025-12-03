import { Locales, type IntlayerConfig } from "intlayer";

/**
 * Intlayer Configuration (v7)
 * Documentation: https://intlayer.org/doc/concept/configuration
 */

const config: IntlayerConfig = {
    internationalization: {
        locales: [Locales.ENGLISH, Locales.TURKISH],
        defaultLocale: Locales.ENGLISH,
    },
    routing: {
        // 'prefix-no-default' is standard: /tr/about for Turkish, /about for English
        mode: "prefix-no-default",
    },
};

export default config;
