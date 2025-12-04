# **🚀 Project Roadmap: Personal Portfolio**

This document outlines the development phases to take this portfolio from a functional prototype to a production-grade, high-performance application.

## **Phase 1: Core Functionality Completion (Immediate)**

_Goal: Complete the "CRUD" cycle and ensure basic user interaction works._

-   [x] **1.1 Edit Project Page:**

    -   [x] Create `app/[locale]/admin/projects/[id]/edit/page.tsx`.
    -   [x] Create a Server Action `updateProject` in `lib/actions.ts`.
    -   [x] Refactor `ProjectForm` to be pre-filled with existing data.
    -   **Testing Checklist:**
        -   [x] Navigate to `/admin`. Click the "Edit" button on a project.
        -   [x] Verify the form is pre-filled with the correct project data.
        -   [x] Change a few fields (e.g., title, tags) and click "Update Project".
        -   [x] Verify you are redirected to `/admin` and the changes are visible.

-   [x] **1.2 Delete Functionality:**

    -   [x] Add a "Delete" button to the Dashboard cards.
    -   [x] Create `deleteProject` Server Action that also deletes the image from Vercel Blob.
    -   [x] Add a "toast" library to provide visual feedback for successful deletions.
    -   **Testing Checklist:**
        -   [x] Navigate to `/admin`.
        -   [x] Click the "Delete" button on a project.
        -   [x] Verify a confirmation dialog appears (`Are you sure...?`).
        -   [x] Click "OK". Verify a toast notification appears ("Project deleted successfully.").
        -   [x] Verify the project is removed from the list.
        -   [x] Check your Vercel Blob storage dashboard to confirm the associated image was also deleted.

-   [x] **1.3 Custom Login Page:**

    -   [x] Create `app/[locale]/login/page.tsx` using Shadcn UI components.
    -   [x] Configure the `pages` option in `lib/auth.ts`.
    -   **Testing Checklist:**
        -   [x] Log out of the application.
        -   [x] Try to access `/admin`. Verify you are redirected to the new `/login` page.
        -   [x] Enter your credentials and log in. Verify you are redirected to `/admin`.

-   [x] **1.4 Contact Form:**
    -   [x] Create a `app/[locale]/(public)/contact/page.tsx`.
    -   [x] Implement email sending using **Resend**.
    -   **Testing Checklist:**
        -   [x] Ensure `RESEND_API_KEY` is in your `.env.local` file.
        -   [x] Ensure you have verified a domain with Resend and updated the `from` address in `lib/actions.ts`.
        -   [x] Navigate to `/contact`. Fill out and submit the form.
        -   [x] Verify you see the success message.
        -   [x] Check your inbox (`contact@hakanispir.dev`) to confirm you received the email.

## **Phase 2: Rich Media & UX Polish**

_Goal: Make the site visually engaging and easier to manage._

-   [x] **2.1 Markdown Rendering:**

    -   [x] Install `react-markdown` and `@tailwindcss/typography`.
    -   [x] Configure Tailwind CSS with the typography plugin.
    -   [x] Create a project detail page that renders markdown from the project body.
    -   **Testing Checklist:**
        -   [x] Create or edit a project and add Markdown to the "Full Body" field (e.g., `# Heading 1`, `* List item`, `**bold**`, `- list item`).
        -   [x] Navigate to the public project page (e.g., `/projects/my-awesome-project`).
        -   [x] Verify the content is rendered as styled HTML (large heading, bullet points, bold text, etc.).

-   [x] **2.2 Image Uploads:**

    -   [x] Integrate **Vercel Blob**.
    -   [x] Add a file input with preview and remove functionality to `ProjectForm`.
    -   [x] Display project thumbnails on the admin and public project grids.
    -   **Testing Checklist:**
        -   [x ] Ensure `BLOB_READ_WRITE_TOKEN` is in your `.env.local`.
        -   [x ] In the project form, upload an image. Verify the preview appears.
        -   [x ] Click the "Remove" button on the preview. Verify the preview disappears and the image is deleted from Vercel Blob storage.
        -   [x ] Upload an image and save the project. Verify the thumbnail appears on the `/admin` and homepage grids.

-   [x] **2.3 Animations:**

    -   [x] Install `framer-motion`.
    -   [x] Add a `PageTransition` component to the main public layout for fade effects.
    -   [x] Add a `whileHover` scale effect to public project cards.
    -   **Testing Checklist:**
        -   [x ] Navigate between public pages (Home, Projects, Contact). Verify the smooth fade-in/out transition.
        -   [x ] Hover your mouse over project cards on the homepage. Verify the subtle zoom/scale animation.

-   [x] **2.4 Loading States:**
    -   [x] Create `loading.tsx` files for the admin dashboard and public projects page.
    -   **Testing Checklist:**
        -   [x] Perform a hard refresh on the `/admin` page. Verify you briefly see a skeleton layout before the projects load.
        -   [x] Perform a hard refresh on the `/projects` page. Verify you see a skeleton layout.

## **Phase 3: Expansion **

-   [ ] **3.1 Resume Viewer:**

    -   Add a PDF viewer (allowing downloads) or a dedicated HTML resume page that can be printed to PDF. Have it in the homepage.
    -   Have automatic integration from GDrive ideally. We could do (probably both?)

    1. Use `googleapis` to fetch the resume from Google Drive.

    -   Use `react-pdf` to render the resume as a PDF viewer.
    -   Add a preview of the resume before downloading or printing.
    -   Add a download button to save the resume as a PDF.
    -   Add a print button to print the resume directly.

    2. Create "about" page (/about) with details (as a tsx file)

-   [x] **3.2 Add a flag to show projects on the homepage:**

    -   [x] Add a toggle in the admin dashboard to control whether projects are displayed on the homepage.
    -   [x ] Add a new column `showOnHomepage` to the `projects` table.
    -   [x ] Update the homepage query to only show projects where `showOnHomepage` is true.
    -   [x ] Add a checkbox in the project edit form to toggle `showOnHomepage`.
    -   **Testing Checklist:**
        -   [x] Create a new project and verify it doesn't appear on the homepage by default.
        -   [x] Toggle `showOnHomepage` for the project and verify it appears/disappears from the homepage accordingly.
        -   [?] Verify the homepage still loads quickly even with many projects.
            -   To ensure this, lets have limiter. homepage should only show up to like 6 projects. _TODO_
                -   projects page should show up to 6 projects at a time. If more than 6, have pages like 1/2.

-   [ ] **3.3 Project Filtering:**
    -   Add a filter system to the projects page to filter by tags or categories.
    -   Implement a search functionality to filter projects by title or description.

## **Phase 4: SEO & Performance (Production Ready)**

_Goal: Ensure the site ranks well on Google and loads instantly._

-   [ ] **4.1 Dynamic Metadata:**
    -   Use `generateMetadata` in `projects/[slug]/page.tsx` to set dynamic `<title>` and `<meta name="description">` based on the project.
-   [ ] **4.2 Open Graph (OG) Images:**
    -   Use `@vercel/og` to generate social media preview cards dynamically (showing the project title and tags).
-   [ ] **4.3 Sitemap & Robots:**
    -   Generate `sitemap.xml` and `robots.txt` dynamically using Next.js built-in APIs.
-   [ ] **4.4 Analytics:**
    -   Enable **Vercel Analytics** and **Speed Insights** in the dashboard.

## **Phase 5: More Expansion (Optional ideas)**

-   [ ] **5.1 Newsletter:**
    -   Add a newsletter subscription form using a service like ConvertKit or Mailchimp.
    -   -   Add a confirmation email after subscription.
    -   -   Add a welcome email after subscription.
    -   -   Add an unsubscribe option in the welcome email.
-   [ ] **5.2 Guestbook:**
    -   Create a public page where visitors can sign a guestbook.
    -   Use Auth.js (GitHub provider) to let _others_ log in to comment. (requires expanding the users table logic).
-   [ ] **5.3 Blog / Thoughts:**
    -   Add a standard "Blog" section distinct from "Projects".
    -   Use `next-mdx-remote` to render Markdown content for blog posts.
    -   Add a `tags` field to the `posts` table to categorize blog entries.
    -   Implement a search functionality to filter blog posts by tags.

## **🛠 Maintenance & Tech Debt**

-   [x] **Type Safety:** Ensure strict typing on all Intlayer locale dictionaries.
-   [ ] **Testing:** Add End-to-End tests with **Playwright**.
-   [ ] **Backup:** Script to periodically backup the Neon database.
