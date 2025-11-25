# Prime Grocery Store

This is a full-stack e-commerce website for a grocery store, built with Next.js 14, TypeScript, and Tailwind CSS. It includes a complete admin panel for managing products, categories, gallery images, and offers.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Panel

The admin panel is located at `/admin`. To access the protected routes, you'll need to log in at `/admin/login`.

### Admin Credentials

The default admin credentials are:

-   **Email:** `admin@example.com`
-   **Password:** `password`

These can be configured in the `.env.local` file. See the `.env.example` file for a list of all required environment variables.

## Project Structure

The project follows the Next.js App Router structure.

-   `app/`: Contains all the routes and pages for the application.
    -   `app/(main)/`: The main pages of the website (home, products, etc.).
    -   `app/admin/`: The pages for the admin dashboard.
    -   `app/api/`: The API routes for the backend.
-   `components/`: Reusable components used throughout the application.
-   `data/`: JSON files used for data persistence.
-   `utils/`: Utility functions.

## Vercel Deployment

The project is ready for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will be deployed automatically.
