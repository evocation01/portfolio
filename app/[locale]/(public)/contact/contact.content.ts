import { t, type Dictionary } from "intlayer";

const contactContent = {
    key: "contact",
    content: {
        title: t({
            en: "Contact Me",
            tr: "İletişime Geçin",
        }),
        description: t({
            en: "Have a question or want to work together? Send me a message!",
            tr: "Bir sorunuz mu var veya birlikte mi çalışmak istiyorsunuz? Bana bir mesaj gönderin!",
        }),
        nameLabel: t({
            en: "Name",
            tr: "İsim",
        }),
        emailLabel: t({
            en: "Email",
            tr: "E-posta",
        }),
        subjectLabel: t({
            en: "Subject",
            tr: "Konu",
        }),
        messageLabel: t({
            en: "Message",
            tr: "Mesaj",
        }),
        sendButton: t({
            en: "Send Message",
            tr: "Mesaj Gönder",
        }),
        successMessage: t({
            en: "Your message has been sent successfully!",
            tr: "Mesajınız başarıyla gönderildi!",
        }),
        successDescription: t({
            en: "I'll get back to you as soon as possible.",
            tr: "En kısa sürede size geri döneceğim.",
        }),
        sendAnother: t({
            en: "Send another message",
            tr: "Başka bir mesaj gönder",
        }),
        emailFooter: t({
            en: "Your message will be sent to {emailLink}",
            tr: "Mesajınız {emailLink} adresine gönderilecektir",
        }),
    },
} satisfies Dictionary;

export default contactContent;
