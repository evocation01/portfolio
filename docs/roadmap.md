# **🚀 Project Roadmap: Personal Portfolio**

This document outlines the development phases to take this portfolio from a functional prototype to a production-grade, high-performance application.

## **Phase 1: Core Functionality Completion (Immediate)**

_Goal: Complete the "CRUD" cycle and ensure basic user interaction works._

-   [X] **1.1 Edit Project Page:**
    -   [X] Create `app/[locale]/admin/projects/[id]/edit/page.tsx`.
    -   [X] Create a Server Action `updateProject` in `lib/actions.ts`.
    -   [X] Refactor `ProjectForm` to be pre-filled with existing data.
    -   **Testing Checklist:**
        -   [x] Navigate to `/admin`. Click the "Edit" button on a project.
        -   [x] Verify the form is pre-filled with the correct project data.
        -   [x] Change a few fields (e.g., title, tags) and click "Update Project".
        -   [x] Verify you are redirected to `/admin` and the changes are visible.

-   [X] **1.2 Delete Functionality:**
    -   [X] Add a "Delete" button to the Dashboard cards.
    -   [X] Create `deleteProject` Server Action that also deletes the image from Vercel Blob.
    -   [X] Add a "toast" library to provide visual feedback for successful deletions.
    -   **Testing Checklist:**
        -   [x] Navigate to `/admin`.
        -   [x] Click the "Delete" button on a project.
        -   [x] Verify a confirmation dialog appears (`Are you sure...?`).
        -   [x] Click "OK". Verify a toast notification appears ("Project deleted successfully.").
        -   [x] Verify the project is removed from the list.
        -   [x] Check your Vercel Blob storage dashboard to confirm the associated image was also deleted.

-   [X] **1.3 Custom Login Page:**
    -   [X] Create `app/[locale]/login/page.tsx` using Shadcn UI components.
    -   [X] Configure the `pages` option in `lib/auth.ts`.
    -   **Testing Checklist:**
        -   [x] Log out of the application.
        -   [x] Try to access `/admin`. Verify you are redirected to the new `/login` page.
        -   [x] Enter your credentials and log in. Verify you are redirected to `/admin`.

-   [X] **1.4 Contact Form:**
    -   [X] Create a `app/[locale]/(public)/contact/page.tsx`.
    -   [X] Implement email sending using **Resend**.
    -   **Testing Checklist:**
        -   [x] Ensure `RESEND_API_KEY` is in your `.env.local` file.
        -   [x] Ensure you have verified a domain with Resend and updated the `from` address in `lib/actions.ts`.
        -   [x] Navigate to `/contact`. Fill out and submit the form.
        -   [x] Verify you see the success message.
        -   [x] Check your inbox (`contact@hakanispir.dev`) to confirm you received the email.

## **Phase 2: Rich Media & UX Polish**

_Goal: Make the site visually engaging and easier to manage._

-   [X] **2.1 Markdown Rendering:**
    -   [X] Install `react-markdown` and `@tailwindcss/typography`.
    -   [X] Configure Tailwind CSS with the typography plugin.
    -   [X] Create a project detail page that renders markdown from the project body.
    -   **Testing Checklist:**
        -   [x] Create or edit a project and add Markdown to the "Full Body" field (e.g., `# Heading 1`, `* List item`, `**bold**`, `- list item`).
        -   [x] Navigate to the public project page (e.g., `/projects/my-awesome-project`).
        -   [x] Verify the content is rendered as styled HTML (large heading, bullet points, bold text, etc.).

-   [X] **2.2 Image Uploads:**
    -   [X] Integrate **Vercel Blob**.
    -   [X] Add a file input with preview and remove functionality to `ProjectForm`.
    -   [X] Display project thumbnails on the admin and public project grids.
    -   **Testing Checklist:**
        -   [x] Ensure `BLOB_READ_WRITE_TOKEN` is in your `.env.local`.
        -   [x] In the project form, upload an image. Verify the preview appears.
        -   [x] Click the "Remove" button on the preview. Verify the preview disappears and the image is deleted from Vercel Blob storage.
        -   [x] Upload an image and save the project. Verify the thumbnail appears on the `/admin` and homepage grids.

-   [X] **2.3 Animations:**
    -   [X] Install `framer-motion`.
    -   [X] Add a `PageTransition` component to the main public layout for fade effects.
    -   [X] Add a `whileHover` scale effect to public project cards.
    -   **Testing Checklist:**
        -   [x] Navigate between public pages (Home, Projects, Contact). Verify the smooth fade-in/out transition.
        -   [x] Hover your mouse over project cards on the homepage. Verify the subtle zoom/scale animation.

-   [X] **2.4 Loading States:**
    -   [X] Create `loading.tsx` files for the admin dashboard and public projects page.
    -   **Testing Checklist:**
        -   [x] Perform a hard refresh on the `/admin` page. Verify you briefly see a skeleton layout before the projects load.
        -   [x] Perform a hard refresh on the `/projects` page. Verify you see a skeleton layout.

## **Phase 3: Expansion **

-   [X] **3.1 Resume Viewer:**
    -   [X] Implement a "View in New Tab" and "Download CV" button on the About page.
    -   [X] Link to a static PDF file in `/public/assets`.
    -   **Testing Checklist:**
        -   [ ] Navigate to the `/about` page.
        -   [ ] Click "View in New Tab". Verify the CV opens correctly in a new browser tab.
        -   [ ] Click "Download CV". Verify the PDF file downloads to your computer.

-   [X] **3.2 Add a flag to show projects on the homepage:**
    -   [X] Add a toggle in the admin dashboard to control whether projects are displayed on the homepage.
    -   [X] Add a new column `showOnHomepage` to the `projects` table.
    -   [X] Update the homepage query to only show projects where `showOnHomepage` is true and limit to 6.
    -   [X] Add a checkbox in the project edit form to toggle `showOnHomepage`.
    -   [X] Implement pagination on the `/projects` page.
    -   **Testing Checklist:**
        -   [ ] In the admin form, toggle the "Show on Homepage" switch for a few projects.
        -   [ ] Verify only the selected projects (up to 6) appear on the homepage.
        -   [ ] Navigate to the `/projects` page.
        -   [ ] If you have more than 6 projects, verify the pagination controls appear.
        -   [ ] Test navigating between pages (e.g., to page 2).

-   [X] **3.3 Project Filtering:**
    -   [X] Add a filter system to the projects page to filter by tags or categories.
    -   [X] Implement a search functionality to filter projects by title or description.
    -   **Testing Checklist:**
        -   [ ] Navigate to the `/projects` page.
        -   [ ] Use the search bar; type a keyword and verify the project list updates.
        -   [ ] Click a tag button. Verify the list filters to show only projects with that tag.
        -   [ ] Combine a search and a tag filter.
        -   [ ] Click the "All" button or an active tag to clear the filter.

-   [X] **3.4 Project i18n Setup**
    -   [X] Create `.content.ts` files for all public pages (`header`, `about`, `contact`, `projects`).
    -   [X] Refactor all public-facing components to use the `useIntlayer` (client) or `getIntlayer` (server) hooks.
    -   [X] Remove all hardcoded English text from the UI.
    -   **Testing Checklist:**
        -   [ ] Use the language switcher to toggle between "EN" and "TR".
        -   [ ] Verify all text in the Header, Homepage, About, Contact, and Projects pages updates to the correct language.

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
-   [ ] **5.2 Guestbook:**
    -   Create a public page where visitors can sign a guestbook.
    -   Use Auth.js (GitHub provider) to let _others_ log in to comment.
-   [ ] **5.3 Blog / Thoughts:**
    -   Add a standard "Blog" section distinct from "Projects".

## **🛠 Maintenance & Tech Debt**

-   [X] **Type Safety:** Ensure strict typing on all Intlayer locale dictionaries.
-   [ ] **Testing:** Add End-to-End tests with **Playwright**.
-   [ ] **Backup:** Script to periodically backup the Neon database.