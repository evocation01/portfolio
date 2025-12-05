import { t, type Dictionary } from 'intlayer';

const contactPageContent = {
  key: 'contact-page',
  content: {
    contactMe: t({ en: "Contact Me" }),
    haveAQuestionOrWant: t({ en: "Have a question or want to work together? Send me a message!" }),
    yourMessageHasBeenSent: t({ en: "Your message has been sent successfully!" }),
    illGetBackToYou: t({ en: "I'll get back to you as soon as possible." }),
    sendAnotherMessage: t({ en: "Send another message" }),
    yourName: t({ en: "Your Name" }),
    yourMessageHere: t({ en: "Your message here..." }),
    sendMessage: t({ en: "Send Message" }),
    yourMessageWillBeSent: t({ en: "Your message will be sent to" })
  },
} satisfies Dictionary;

export default contactPageContent;
