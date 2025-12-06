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
        -   [x] Ensure `BLOB_READ_WRITE_TOKEN` is in your `.env.local`.
        -   [x] In the project form, upload an image. Verify the preview appears.
        -   [x] Click the "Remove" button on the preview. Verify the preview disappears and the image is deleted from Vercel Blob storage.
        -   [x] Upload an image and save the project. Verify the thumbnail appears on the `/admin` and homepage grids.

-   [x] **2.3 Animations:**

    -   [x] Install `framer-motion`.
    -   [x] Add a `PageTransition` component to the main public layout for fade effects.
    -   [x] Add a `whileHover` scale effect to public project cards.
    -   **Testing Checklist:**
        -   [x] Navigate between public pages (Home, Projects, Contact). Verify the smooth fade-in/out transition.
        -   [x] Hover your mouse over project cards on the homepage. Verify the subtle zoom/scale animation.

-   [x] **2.4 Loading States:**
    -   [x] Create `loading.tsx` files for the admin dashboard and public projects page.
    -   **Testing Checklist:**
        -   [x] Perform a hard refresh on the `/admin` page. Verify you briefly see a skeleton layout before the projects load.
        -   [x] Perform a hard refresh on the `/projects` page. Verify you see a skeleton layout.

## **Phase 3: Expansion **

-   [x] **3.1 Resume Viewer:**

    -   [x] Implement a "View in New Tab" and "Download CV" button on the About page.
    -   [x] Link to a static PDF file in `/public/assets`.
    -   **Testing Checklist:**
        -   [x ] Navigate to the `/about` page.
        -   [x ] Click "View in New Tab". Verify the CV opens correctly in a new browser tab.
        -   [x ] Click "Download CV". Verify the PDF file downloads to your computer.

-   [x] **3.2 Add a flag to show projects on the homepage:**

    -   [x] Add a toggle in the admin dashboard to control whether projects are displayed on the homepage.
    -   [x] Add a new column `showOnHomepage` to the `projects` table.
    -   [x] Update the homepage query to only show projects where `showOnHomepage` is true and limit to 6.
    -   [x] Add a checkbox in the project edit form to toggle `showOnHomepage`.
    -   [x] Implement pagination on the `/projects` page.
    -   **Testing Checklist:**
        -   [x ] In the admin form, toggle the "Show on Homepage" switch for a few projects.
        -   [x ] Verify only the selected projects (up to 6) appear on the homepage.
        -   [x ] Navigate to the `/projects` page.
        -   [x ] If you have more than 6 projects, verify the pagination controls appear.
        -   [x ] Test navigating between pages (e.g., to page 2).

-   [x] **3.3 Project Filtering:**

    -   [x] Add a filter system to the projects page to filter by tags or categories.
    -   [x] Implement a search functionality to filter projects by title or description.
    -   **Testing Checklist:**
        -   [x ] Navigate to the `/projects` page.
        -   [x ] Use the search bar; type a keyword and verify the project list updates.
        -   [x ] Click a tag button. Verify the list filters to show only projects with that tag.
        -   [x] Combine a search and a tag filter.
        -   [x] Click the "All" button or an active tag to clear the filter.

-   [x] **3.4 Project i18n Setup**
    -   [x] Create `.content.ts` files for all public pages (`header`, `about`, `contact`, `projects`).
    -   [x] Refactor all public-facing components to use the `useIntlayer` (client) or `getIntlayer` (server) hooks.
    -   [x] Remove all hardcoded English text from the UI.
    -   **Testing Checklist:**
        -   [x] Use the language switcher to toggle between "EN" and "TR".
        -   [x] Verify all text in the Header, Homepage, About, Contact, and Projects pages updates to the correct language.
        -   [x] Verify the Admin and Login pages are also translated.

## **Phase 4: SEO & Performance (Production Ready)**

_Goal: Ensure the site ranks well on Google and loads instantly._

-   [x] **4.1 Dynamic Metadata:**
    -   Use `generateMetadata` in `projects/[slug]/page.tsx` and all other public pages to set dynamic `<title>` and `<meta name="description">`.
-   [x] **4.2 Open Graph (OG) Images:**
    -   Use `@vercel/og` to generate social media preview cards dynamically.
-   [x] **4.3 Sitemap & Robots:**
    -   Generate `sitemap.xml` and `robots.txt` dynamically using Next.js built-in APIs.
-   [x] **4.4 Analytics:**
    -   Enable **Vercel Analytics** and **Speed Insights** in the dashboard.
-   **Testing Checklist:**
    -   [x ] **Metadata:**
        -   [x ] Navigate to the homepage, about page, and a project detail page.
        -   [x ] Right-click and "View Page Source".
        -   [x ] Verify the `<title>` tag is specific to the page (e.g., "About Me | Hakan İspir").
        -   [x ] Verify the `<meta name="description" ...>` tag has a relevant description.
    -   [ ] **Open Graph:**
        -   [ ] Deploy the site to Vercel.
        -   [ ] Go to the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or [Twitter Card Validator](https://cards-dev.twitter.com/validator).
        -   [ ] Enter the URL of your live homepage and a project page.
        -   [ ] Verify the preview card shows the correct title, description, and a dynamically generated image.
    -   [x ] **Sitemap & Robots:**
        -   [x ] Navigate to `/sitemap.xml` on your live site. Verify it shows a list of all your pages, including all project pages for each locale.
        -   [x ] Navigate to `/robots.txt`. Verify it points to the sitemap and disallows the `/admin` route.

## **Phase 5: More Expansion (Optional ideas)**

-   [ ] **5.1 Newsletter:**
    -   Add a newsletter subscription form using a service like ConvertKit or Mailchimp.
-   [ ] **5.2 Guestbook:**
    -   Create a public page where visitors can sign a guestbook.
    -   Use Auth.js (GitHub provider) to let _others_ log in to comment.
-   [ ] **5.3 Blog / Thoughts:**
    -   Add a standard "Blog" section distinct from "Projects".

## **🛠 Maintenance & Tech Debt**

-   [x] **Type Safety:** Ensure strict typing on all Intlayer locale dictionaries.
-   [ ] **Testing:** Add End-to-End tests with **Playwright**.
-   [x] **Backup:** Script to periodically backup the Neon database.
    -   A backup script is now located at `scripts/backup.sh`.
    -   **Prerequisites:** You must have PostgreSQL client tools installed (`pg_dump`).
    -   **Usage:** Run `bash scripts/backup.sh` from the root of the project.
    -   **Automation:** To run this periodically, set up a cron job on your machine or a server.
        -   Example cron job to run daily at 3 AM: `0 3 * * * /bin/bash /path/to/your/portfolio/scripts/backup.sh`
