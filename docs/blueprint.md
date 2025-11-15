# **Portfolio Website: Phase 1 Blueprint (Focus: Core Structure & Existing Projects)**

This blueprint details the technology, architecture, and phased plan for building a highly professional, scalable, and secure portfolio website, including best practices for internationalization (i18n) and accessibility (A11y).

## **PHASE 1: FOUNDATION AND CONTENT MANAGEMENT**

The initial phase focuses on establishing the essential infrastructure to support any future project (including AlphaSignal).

### **1\. Technical Stack (Base)**

| Layer          | Technology / Tool        | Rationale                                                                                  |
| :------------- | :----------------------- | :----------------------------------------------------------------------------------------- |
| **Framework**  | **Next.js (App Router)** | Superior performance, SEO, and robust data fetching capabilities.                          |
| **Styling**    | **Tailwind CSS**         | Utility-first for rapid, responsive (mobile-first) development.                            |
| **i18n**       | **next-intlayer**        | Provides a modern and flexible approach to internationalization for Next.js.              |
| **Database**   | **Vercel Postgres**   | A serverless PostgreSQL database with a generous free tier, integrated with Vercel. |
| **Deployment** | **Vercel**               | Free, instant CI/CD deployment from GitHub.                                                |

### **2\. Internationalization (i18n) & Routing**

We implement the recommended subdirectory strategy for optimal SEO and user experience.

| Route           | Default (EN)       | Turkish (TR)          | Content Type               |
| :-------------- | :----------------- | :-------------------- | :------------------------- |
| **Home**        | /                  | /tr                   | Main landing and bio       |
| **Projects**    | /projects          | /tr/projeler          | Project gallery/listing    |
| **Case Study**  | /projects/\[slug\] | /tr/projeler/\[slug\] | Detailed project page      |
| **Admin Panel** | /admin             | N/A                   | Secured content management |

**i18n Rule: Unprefixed Default.** The root path (/) will serve the default language (English) directly, eliminating unnecessary 301/302 redirects which can hurt performance and SEO.

### **3\. Repository Strategy**

The site will be built as a Single-Repo structure to simplify Phase 1 deployment, with projects being separate modules.

1. **Repo 1 (Website Monorepo): portfolio**
    - **Content:** All Next.js files, components, styling, i18n dictionary files, and database integration logic (/admin).
    - **External Projects:** This repository links to external project repos (e.g., github.com/hakanispir/project-x).
2. **Future Project Repositories (e.g., alphasignal-dsc-ai)**
    - These projects reside in separate, dedicated repositories. The portfolio website simply consumes the public URL/API/GitHub link of these separate projects.

### **4\. Content Model (Firebase Firestore)**

Projects will be managed via the /admin panel and stored in a Firebase Firestore collection named portfolio-projects.

| Field Name                     | Type             | Purpose                                       |
| :----------------------------- | :--------------- | :-------------------------------------------- |
| slug_en                        | String           | URL identifier (e.g., web-platform-v2)        |
| title_en, title_tr             | String           | Project Title (i18n ready)                    |
| description_en, description_tr | Text             | Short summary (i18n ready)                    |
| body_en, body_tr               | Text (Markdown)  | Full case study content                       |
| tags                           | Array of Strings | Technologies used (e.g., React, GCP, FastAPI) |
| github_url                     | String           | Link to the project's dedicated repo          |
| live_url                       | String           | Link to the live demo (if applicable)         |

## **5\. Production-Grade Implementation Requirements**

### **A. Accessibility (A11y) & Responsiveness**

-   **Mobile-First Grid:** The layout must be fully fluid and designed using Tailwind's responsive prefixes (sm:, md:, lg:) to ensure optimal viewing and usability on mobile and tablet.
-   **Semantic HTML:** Use correct tags (e.g., \<nav\>, \<main\>, \<h1\>, \<h2\>) to ensure proper document structure for screen readers.
-   **Focus Management:** Ensure all interactive elements (buttons, links) have a visible focus state for keyboard navigation.
-   **Image Alt Text:** All images must have meaningful alt attributes, managed through the /admin panel.

### **B. Security & Authentication**

-   **Admin Panel Protection:** The /admin route must be protected using Firebase Authentication. Only your authorized account should be able to sign in and modify data.
-   **Input Sanitization:** Any data saved via the /admin forms must be rigorously sanitized (especially the Markdown body fields) to prevent Cross-Site Scripting (XSS) attacks when the public pages render the content.
-   **Environment Variables:** Use Next.js environment variables (NEXT_PUBLIC\_\* or standard private variables) for all Firebase keys and credentials.

### **C. Safe Koru Impact Experience Listing (Critical Compliance)**

This section must adhere strictly to the terms of the Cooperation Agreement (Articles 4 & 5\) to mitigate the **1,000,000 TRY penalty risk.**

-   **Title:** Koru Consultant – Builder Function (Independent Contractor).
-   **Description (Text Only):** Frame the work using the public mission and generalized skills.
    -   _Example:_ "Executed the **Builder Function's Decoupling Mission**, designing and implementing modular, technologically-enabled front-end solutions for corporate strategy and value creation projects. Applied expertise in scalable UI development, cloud platform support, and strategic technical planning."
-   **Forbidden Content:** Absolutely NO:
    -   Screenshots or logos of the Koru Impact website.
    -   Specific details of internal architecture (e.g., "sole dev," "backend team structure").
    -   Client names, project budgets, or internal methodologies.

## **PHASE 2: ALPHA SIGNAL INTEGRATION (Future Plan)**

Once the core portfolio site is stable, the AlphaSignal project will be integrated as a dedicated case study page and live demo.

-   **Action:** Develop the Python/FastAPI/DSC backend in a **separate repository.**
-   **Integration:** The Next.js frontend will communicate with the deployed FastAPI service via a secured API key, demonstrating real-time data processing capabilities without exposing the core logic on the portfolio website.

This blueprint is ready for implementation, ensuring that your initial focus is on the most valuable and safest parts of your professional presence.
