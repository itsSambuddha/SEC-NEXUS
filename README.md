# SEC-NEXUS: The Event Manager for St. Edmund's College

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## Table of Contents

1.  [🏛️ Project Overview](#️-project-overview)
2.  [🚀 Live Demo](#-live-demo)
3.  [✨ Key Features](#-key-features)
4.  [🛠️ Technologies & Stack](#️-technologies--stack)
5.  [🏗️ Project Architecture Deep Dive](#️-project-architecture-deep-dive)
    -   [Directory Structure](#directory-structure)
    -   [Frontend (`app/` and `components/`)](#frontend-app-and-components)
    -   [Backend (`lib/` and `app/api/`)](#backend-lib-and-appapi)
    -   [Configuration Files](#configuration-files)
6.  [🏁 Getting Started](#-getting-started)
7.  [📖 Usage Guide](#-usage-guide)
8.  [🙌 Contributing](#-contributing)
9.  [📜 License](#-license)

---

## 🏛️ Project Overview

SEC-NEXUS is a robust and scalable event management platform meticulously designed for educational institutions, specifically catering to the needs of St. Edmund's College, Shillong. This application streamlines the entire event lifecycle, from creation and promotion to user registration and administration. It provides a centralized, intuitive system for managing diverse events, fostering community engagement, and enhancing organizational efficiency within the academic environment.

<!-- ![Application Screenshot Placeholder](https://placehold.co/800x400/e2e8f0/4a5568?text=SEC-NEXUS%20Dashboard) -->

## 🚀 Live Demo

Experience the application live at: [sec-nexus10.vercel.app](https://sec-nexus10.vercel.app)

## ✨ Key Features

* **🔐 Comprehensive User Authentication:** Implements secure and efficient user registration and login flows using Clerk, ensuring data integrity and personalized user experiences.
* **📅 Dynamic Event Management:** Offers full CRUD (Create, Read, Update, Delete) capabilities for events, allowing administrators and authorized users to manage event details, schedules, and capacities with ease.
* **🔍 Advanced Filtering System:** Events can be meticulously organized and filtered by various attributes, including custom categories, affiliated clubs, and academic departments, facilitating effortless discovery for users.
* **🛡️ Intuitive Admin Dashboard:** A dedicated, secure administrative interface provides powerful tools for overseeing all aspects of the platform, including user management and event moderation.
* **🔄 Seamless User Data Synchronization:** Features robust mechanisms for synchronizing user data between Clerk and the application's database, maintaining an up-to-date user base.
* **🖼️ Integrated Image Uploads:** Incorporates a streamlined process for uploading and managing event-related imagery via Uploadthing.
* **📱💻 Responsive and Modern User Interface:** Developed with a mobile-first approach using Next.js and Tailwind CSS for an optimal experience on all devices.

## 🛠️ Technologies & Stack

SEC-NEXUS is built upon a modern and efficient full-stack architecture.

### Frontend

* **Next.js:** A React framework for building server-side rendered and statically generated web applications.
* **React:** A JavaScript library for building user interfaces.
* **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Shadcn UI:** A collection of re-usable UI components.

### Backend & Database

* **Next.js API Routes:** For building server-side API endpoints.
* **MongoDB:** A NoSQL document database.
* **Mongoose:** An object data modeling (ODM) library for MongoDB and Node.js.
* **Clerk:** For user authentication and management.
* **Uploadthing:** A service for handling file uploads.

---

## 🏗️ Project Architecture Deep Dive

This section provides a detailed breakdown of the project's structure and key files.

### Directory Structure

The project follows a standard Next.js App Router structure:

```
sec-nexus/
├── app/                  # Core Next.js application directory. Contains all routes, pages, and API endpoints.
│   ├── (auth)/           # Grouped routes for authentication flows (e.g., sign-in, sign-up).
│   ├── (root)/           # Main application pages and layouts (e.g., homepage, general event listings, user profiles).
│   ├── admin/            # Dedicated routes and components for the administrative dashboard.
│   └── api/              # Backend API routes for data interaction (e.g., categories, clubs, events, users).
├── components/           # Reusable React components to promote modularity and consistency.
│   ├── shared/           # Common components used across different parts of the application.
│   └── ui/               # UI components, likely derived from Shadcn UI, providing a consistent design system.
├── lib/                  # Library of utility functions, database configurations, and server actions.
│   ├── actions/          # Server-side functions for interacting with the database and performing business logic.
│   ├── config/           # Application-wide configuration files.
│   ├── database/         # Database connection setup and Mongoose models for data schemas.
│   ├── types.ts          # Centralized TypeScript type definitions for the application's data structures.
│   ├── uploadthing.ts    # Configuration and utilities for the Uploadthing file upload service.
│   └── utils.ts          # General utility functions and helpers.
├── public/               # Static assets served directly by Next.js (e.g., images, icons, fonts).
├── constants.ts          # Global constants and configuration values.
├── middleware.ts         # Next.js middleware for request processing and authentication checks.
├── next.config.ts        # Next.js framework configuration file.
├── package.json          # Defines project metadata, scripts, and dependencies.
├── tsconfig.json         # TypeScript compiler configuration.
└── ...                   # Other essential configuration files (e.g., .env.local, .gitignore, postcss.config.mjs).
```

### Frontend (`app/` and `components/`)

The frontend is built with Next.js and React, utilizing the App Router for file-based routing.

#### Routing (`app/` directory)

-   **`app/layout.tsx`**: The root layout that wraps the entire application. It sets up the Clerk provider for authentication and includes the global CSS.
-   **`app/(root)/`**: This route group contains the main pages accessible to all users.
    -   **`page.tsx`**: The homepage of the application.
    -   **`events/[id]/page.tsx`**: The event details page.
    -   **`profile/page.tsx`**: The user's profile page, displaying events they have organized.
-   **`app/(auth)/`**: This route group contains the authentication pages.
    -   **`sign-in/[[...sign-in]]/page.tsx`**: The sign-in page, using Clerk's `SignIn` component.
    -   **`sign-up/[[...sign-up]]/page.tsx`**: The sign-up page, using Clerk's `SignUp` component.
-   **`app/admin/dashboard/page.tsx`**: The admin dashboard for managing events.

#### Components (`components/` directory)

-   **`components/shared/`**: Contains reusable components used across multiple pages, such as the `Header`, `Footer`, and `EventForm`.
-   **`components/ui/`**: Contains the base UI components from Shadcn, such as `Button`, `Input`, and `Select`.

### Backend (`lib/` and `app/api/`)

The backend logic is handled by a combination of Next.js API Routes and Server Actions.

#### Server Actions (`lib/actions/`)

-   **`event.actions.ts`**: Contains Server Actions for creating, reading, updating, and deleting events.
-   **`category.actions.ts`**: Server Actions for managing event categories.
-   **`club.actions.ts`**: Server Actions for managing clubs.
-   **`department.actions.ts`**: Server Actions for managing departments.

#### Database (`lib/database/`)

-   **`index.ts`**: Handles the connection to the MongoDB database.
-   **`models/`**: Contains the Mongoose schemas for the `User`, `Event`, `Category`, `Club`, and `Department` collections.

#### API Routes (`app/api/`)

-   **`users-sync/route.ts`**: An API route for synchronizing user data from Clerk to the application's database.
-   **`uploadthing/route.ts`**: The API route for handling file uploads via Uploadthing.

### Configuration Files

-   **`next.config.ts`**: The Next.js configuration file, including settings for image optimization and the PWA plugin.
-   **`middleware.ts`**: The application's middleware, used for protecting routes and handling authentication with Clerk.
-   **`tailwind.config.ts`**: The configuration file for Tailwind CSS.
-   **`tsconfig.json`**: The TypeScript configuration file.
-   **`package.json`**: Lists the project's dependencies and scripts.

---

## 🏁 Getting Started

To set up and run the SEC-NEXUS project locally, follow these instructions.

### Prerequisites

* **Node.js:** v18 or higher.
* **npm** or **Yarn**.
* **MongoDB:** A local instance or a cloud-hosted solution.

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/itssambuddha/SEC-NEXUS.git](https://github.com/itssambuddha/SEC-NEXUS.git)
    cd SEC-NEXUS/sec-nexus
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

### Environment Configuration

Create a `.env.local` file in the `sec-nexus` directory and add the necessary environment variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Uploadthing
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

```
### Running The Application

Start the development server:

```bash
npm run dev
```
The application will be available at http://localhost:3000
.

## 📖 Usage Guide
* **Register and Log in:** Create an account or sign in..
* **Browse Events:** View and filter all events.
* **Create Event:** Authenticated Users can create new events.
* **Manage Events:**  Event creators can edit and delete their own events.
* **Admin Dashboard:** Administrators can manage all events.

## 🙌 Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the repository**
2. **Create a new branch:**
```
git checkout -b feature/your-feature-name
```

3. **Make your changes and commit them:**
```
git add .
git commit -m "Add some feature"
```

4. **Push to the branch:**
```
git push origin feature/your-feature-name
```

5. **Open a Pull Request.**

## 📜 License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE) file for details.



