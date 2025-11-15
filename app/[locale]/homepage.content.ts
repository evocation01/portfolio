import { t, type Dictionary } from "intlayer";

const homepageContent = {
    key: "homepage",
    content: {
        title: t({
            en: "To get started, edit the page.tsx file.",
            tr: "Başlamak için page.tsx dosyasını düzenleyin.",
        }),
        description: t({
            en: "Looking for a starting point or more instructions? Head over to {templatesLink} or the {learningLink} center.",
            tr: "Bir başlangıç noktası veya daha fazla talimat mı arıyorsunuz? {templatesLink} veya {learningLink} merkezine gidin.",
        }),
    },
} satisfies Dictionary;

export default homepageContent;
