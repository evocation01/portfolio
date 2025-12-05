import { t, type Dictionary } from 'intlayer';

const homePageContent = {
  key: 'home-page',
  content: {
    hiImHakan: t({ en: "Hi, I'm Hakan 👋" }),
    aFullStackDeveloperPassionate: t({ en: "A Full-Stack Developer passionate about building robust web applications with modern technologies." }),
    viewMyWork: t({ en: "View My Work" }),
    contactMe: t({ en: "Contact Me" })
  },
} satisfies Dictionary;

export default homePageContent;
