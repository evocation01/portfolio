import { t, type Dictionary } from "intlayer";

const adminContent = {
    key: "admin",
    content: {
        // Layout
        dashboardTitle: t({
            en: "Admin Dashboard",
            tr: "Yönetici Paneli",
        }),
        dashboardDescription: t({
            en: "Manage your content and projects.",
            tr: "İçeriğinizi ve projelerinizi yönetin.",
        }),

        // ProjectsList
        existingProjects: t({
            en: "Existing Projects",
            tr: "Mevcut Projeler",
        }),
        addNewProject: t({
            en: "Add New Project",
            tr: "Yeni Proje Ekle",
        }),
        noProjectsFound: t({
            en: "No projects found.",
            tr: "Hiç proje bulunamadı.",
        }),
        createFirstProject: t({
            en: "Create your first one",
            tr: "İlk projenizi oluşturun",
        }),
        editButton: t({
            en: "Edit",
            tr: "Düzenle",
        }),

        // ProjectForm
        editProjectTitle: t({
            en: "Edit Project",
            tr: "Projeyi Düzenle",
        }),
        createProjectTitle: t({
            en: "Create New Project",
            tr: "Yeni Proje Oluştur",
        }),
        editProjectDescription: t({
            en: "Update the details of your existing project.",
            tr: "Mevcut projenizin ayrıntılarını güncelleyin.",
        }),
        createProjectDescription: t({
            en: "Add a new project to your portfolio.",
            tr: "Portfolyonuza new bir proje ekleyin.",
        }),
        thumbnailLabel: t({
            en: "Thumbnail Image",
            tr: "Önizleme Resmi",
        }),
        thumbnailAlt: t({
            en: "Thumbnail preview",
            tr: "Önizleme",
        }),
        noImage: t({
            en: "No Image",
            tr: "Resim Yok",
        }),
        showOnHomepageLabel: t({
            en: "Show on Homepage",
            tr: "Anasayfada Göster",
        }),
        slugLabel: t({
            en: "Slug (URL)",
            tr: "Slug (URL)",
        }),
        slugPlaceholder: t({
            en: "my-awesome-project",
            tr: "harika-projem",
        }),
        tagsLabel: t({
            en: "Tags (comma separated)",
            tr: "Etiketler (virgülle ayrılmış)",
        }),
        tagsPlaceholder: t({
            en: "React, Next.js, Drizzle",
            tr: "React, Next.js, Drizzle",
        }),
        githubUrlLabel: t({
            en: "GitHub URL",
            tr: "GitHub URL'si",
        }),
        githubUrlPlaceholder: t({
            en: "https://github.com/...",
            tr: "https://github.com/...",
        }),
        liveUrlLabel: t({
            en: "Live URL",
            tr: "Canlı URL",
        }),
        liveUrlPlaceholder: t({
            en: "https://...",
            tr: "https://...",
        }),
        englishTab: t({
            en: "English 🇬🇧",
            tr: "İngilizce 🇬🇧",
        }),
        turkishTab: t({
            en: "Turkish 🇹🇷",
            tr: "Türkçe 🇹🇷",
        }),
        titleEnLabel: t({
            en: "Title (EN)",
            tr: "Başlık (EN)",
        }),
        titleTrLabel: t({
            en: "Title (TR)",
            tr: "Başlık (TR)",
        }),
        titleEnPlaceholder: t({
            en: "Project Title",
            tr: "Proje Başlığı",
        }),
        descriptionEnLabel: t({
            en: "Short Description (EN)",
            tr: "Kısa Açıklama (EN)",
        }),
        descriptionTrLabel: t({
            en: "Short Description (TR)",
            tr: "Kısa Açıklama (TR)",
        }),
        descriptionPlaceholder: t({
            en: "Brief summary for the card view...",
            tr: "Kart görünümü için kısa özet...",
        }),
        bodyEnLabel: t({
            en: "Full Body (EN)",
            tr: "Tam İçerik (EN)",
        }),
        bodyTrLabel: t({
            en: "Full Body (TR)",
            tr: "Tam İçerik (TR)",
        }),
        cancelButton: t({
            en: "Cancel",
            tr: "İptal",
        }),
        savingButton: t({
            en: "Saving...",
            tr: "Kaydediliyor...",
        }),
        updateButton: t({
            en: "Update Project",
            tr: "Projeyi Güncelle",
        }),
        createButton: t({
            en: "Create Project",
            tr: "Proje Oluştur",
        }),
        deleteButton: t({
            en: "Delete",
            tr: "Sil",
        }),
        deletingButton: t({
            en: "Deleting...",
            tr: "Siliniyor...",
        }),
        deleteConfirmation: t({
            en: "Are you sure you want to delete this project?",
            tr: "Bu projeyi silmek istediğinizden emin misiniz?",
        }),
    },
} satisfies Dictionary;

export default adminContent;

export type AdminContentType = typeof adminContent.content;
