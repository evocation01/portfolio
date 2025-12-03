# **🚀 Project Roadmap: Personal Portfolio**

This document outlines the development phases to take this portfolio from a functional prototype to a production-grade, high-performance application.

## **Phase 1: Core Functionality Completion (Immediate)**

_Goal: Complete the "CRUD" cycle and ensure basic user interaction works._

-   [X] **1.1 Edit Project Page:**
    -   [X] Create `app/[locale]/admin/projects/[id]/edit/page.tsx`.
    -   [X] Create a Server Action `updateProject` in `lib/actions.ts`.
    -   [X] Refactor `ProjectForm` to be pre-filled with existing data.
    -   **Testing Checklist:**
        -   [ ] Navigate to `/admin`. Click the "Edit" button on a project.
        -   [ ] Verify the form is pre-filled with the correct project data.
        -   [ ] Change a few fields (e.g., title, tags) and click "Update Project".
        -   [ ] Verify you are redirected to `/admin` and the changes are visible.

-   [X] **1.2 Delete Functionality:**
    -   [X] Add a "Delete" button to the Dashboard cards.
    -   [X] Create `deleteProject` Server Action that also deletes the image from Vercel Blob.
    -   **Testing Checklist:**
        -   [ ] Navigate to `/admin`.
        -   [ ] Click the "Delete" button on a project.
        -   [ ] Verify a confirmation dialog appears (`Are you sure...?`).
        -   [ ] Click "OK". Verify the project is removed from the list.
        -   [ ] Check your Vercel Blob storage dashboard to confirm the associated image was also deleted.

-   [X] **1.3 Custom Login Page:**
    -   [X] Create `app/[locale]/login/page.tsx` using Shadcn UI components.
    -   [X] Configure the `pages` option in `lib/auth.ts`.
    -   **Testing Checklist:**
        -   [ ] Log out of the application.
        -   [ ] Try to access `/admin`. Verify you are redirected to the new `/login` page.
        -   [ ] Enter your credentials and log in. Verify you are redirected to `/admin`.

-   [X] **1.4 Contact Form:**
    -   [X] Create a `app/[locale]/(public)/contact/page.tsx`.
    -   [X] Implement email sending using **Resend**.
    -   **Testing Checklist:**
        -   [ ] Ensure `RESEND_API_KEY` is in your `.env.local` file.
        -   [ ] Ensure you have verified a domain with Resend and updated the `from` address in `lib/actions.ts`.
        -   [ ] Navigate to `/contact`. Fill out and submit the form.
        -   [ ] Verify you see the success message.
        -   [ ] Check your inbox (`contact@hakanispir.dev`) to confirm you received the email.

## **Phase 2: Rich Media & UX Polish**

_Goal: Make the site visually engaging and easier to manage._

-   [X] **2.1 Markdown Rendering:**
    -   [X] Install `react-markdown` and `@tailwindcss/typography`.
    -   [X] Configure Tailwind CSS with the typography plugin.
    -   [X] Create a project detail page that renders markdown from the project body.
    -   **Testing Checklist:**
        -   [ ] Create or edit a project and add Markdown to the "Full Body" field (e.g., `# Heading 1`, `* List item`).
        -   [ ] Navigate to the public project page (e.g., `/projects/my-awesome-project`).
        -   [ ] Verify the content is rendered as styled HTML (large heading, bullet points, etc.).

-   [X] **2.2 Image Uploads:**
    -   [X] Integrate **Vercel Blob**.
    -   [X] Add a file input with preview and remove functionality to `ProjectForm`.
    -   [X] Display project thumbnails on the admin and public project grids.
    -   **Testing Checklist:**
        -   [ ] Ensure `BLOB_READ_WRITE_TOKEN` is in your `.env.local`.
        -   [ ] In the project form, upload an image. Verify the preview appears.
        -   [ ] Click the "Remove" button on the preview. Verify the preview disappears and the image is deleted from Vercel Blob storage.
        -   [ ] Upload an image and save the project. Verify the thumbnail appears on the `/admin` and homepage grids.

-   [X] **2.3 Animations:**
    -   [X] Install `framer-motion`.
    -   [X] Add a `PageTransition` component to the main public layout for fade effects.
    -   [X] Add a `whileHover` scale effect to public project cards.
    -   **Testing Checklist:**
        -   [ ] Navigate between public pages (Home, Projects, Contact). Verify the smooth fade-in/out transition.
        -   [ ] Hover your mouse over project cards on the homepage. Verify the subtle zoom/scale animation.

-   [X] **2.4 Loading States:**
    -   [X] Create `loading.tsx` files for the admin dashboard and public projects page.
    -   **Testing Checklist:**
        -   [ ] Perform a hard refresh on the `/admin` page. Verify you briefly see a skeleton layout before the projects load.
        -   [ ] Perform a hard refresh on the `/projects` page. Verify you see a skeleton layout.

## **Phase 3: SEO & Performance (Production Ready)**

_Goal: Ensure the site ranks well on Google and loads instantly._

-   [ ] **3.1 Dynamic Metadata:**
    -   Use `generateMetadata` in `projects/[slug]/page.tsx` to set dynamic `<title>` and `<meta name="description">` based on the project.
-   [ ] **3.2 Open Graph (OG) Images:**
    -   Use `@vercel/og` to generate social media preview cards dynamically (showing the project title and tags).
-   [ ] **3.3 Sitemap & Robots:**
    -   Generate `sitemap.xml` and `robots.txt` dynamically using Next.js built-in APIs.
-   [ ] **3.4 Analytics:**
    -   Enable **Vercel Analytics** and **Speed Insights** in the dashboard.

## **Phase 4: Expansion (Optional ideas)**

_Goal: Add community features._

-   [ ] **4.1 Guestbook:**
    -   Create a public page where visitors can sign a guestbook.
    -   Use Auth.js (GitHub provider) to let _others_ log in to comment (requires expanding the users table logic).
-   [ ] **4.2 Blog / Thoughts:**
    -   Add a standard "Blog" section distinct from "Projects".
-   [ ] **4.3 Resume Viewer:**
    -   Add a PDF viewer or a dedicated HTML resume page that can be printed to PDF.

## **🛠 Maintenance & Tech Debt**

-   [ ] **Type Safety:** Ensure strict typing on all Intlayer locale dictionaries.
-   [ ] **Testing:** Add End-to-End tests with **Playwright**.
-   [ ] **Backup:** Script to periodically backup the Neon database.