# SEC-NEXUS

## Project Overview

SEC-NEXUS is a robust and scalable event management platform meticulously designed for educational institutions, specifically catering to the needs of St. Edmund's College Shillong. This application streamlines the entire event lifecycle, from creation and promotion to user registration and administration. It provides a centralized, intuitive system for managing diverse events, fostering community engagement, and enhancing organizational efficiency within the academic environment.

## Live Demo

Experience the application live at: [sec-nexus10.vercel.app](https://sec-nexus10.vercel.app)

## Key Features

*   **Comprehensive User Authentication:** Implements secure and efficient user registration and login flows, ensuring data integrity and personalized user experiences.
*   **Dynamic Event Management:** Offers full CRUD (Create, Read, Update, Delete) capabilities for events, allowing administrators and authorized users to manage event details, schedules, and capacities with ease.
*   **Advanced Categorization System:** Events can be meticulously organized and filtered by various attributes, including custom categories, affiliated clubs, and academic departments, facilitating effortless discovery and navigation for users.
*   **Intuitive Admin Dashboard:** A dedicated, secure administrative interface provides powerful tools for overseeing all aspects of the platform, including user management, event moderation, and content configuration.
*   **Seamless User Data Synchronization:** Features robust mechanisms for synchronizing user data, enabling integration with existing institutional directories or external data sources to maintain an up-to-date user base.
*   **Integrated Image Uploads:** Incorporates a streamlined process for uploading and managing event-related imagery, enhancing visual appeal and information richness.
*   **Responsive and Modern User Interface:** Developed with a mobile-first approach using Next.js and Tailwind CSS, ensuring an optimal and consistent viewing experience across a wide range of devices, from desktops to smartphones.

## Technologies & Stack

SEC-NEXUS is built upon a modern and efficient full-stack architecture, leveraging the following key technologies:

*   **Frontend:**
    *   **Next.js (React Framework):** Chosen for its powerful server-side rendering (SSR) and static site generation (SSG) capabilities, optimizing performance, SEO, and developer experience.
    *   **React:** The core library for building dynamic and interactive user interfaces.
    *   **TypeScript:** Provides static typing to enhance code quality, readability, and maintainability, reducing runtime errors.
    *   **Tailwind CSS:** A highly customizable, utility-first CSS framework that enables rapid UI development and ensures a consistent design system.
    *   **Shadcn UI:** (Inferred from `components.json`) A collection of re-usable components built with Radix UI and Tailwind CSS, providing accessible and aesthetically pleasing UI elements.

*   **Backend & Database:**
    *   **Next.js API Routes:** Utilized for building robust and scalable API endpoints that serve as the backbone for data interaction.
    *   **MongoDB:** A flexible NoSQL document database, ideal for handling the diverse and evolving data structures of an event management system.
    *   **Mongoose:** An elegant MongoDB object data modeling (ODM) library for Node.js, simplifying data interaction and validation.
    *   **NextAuth.js:** A complete authentication solution for Next.js applications, supporting various authentication providers and secure session management.
    *   **Uploadthing:** A powerful and easy-to-use file upload service, handling secure and efficient storage of event images and other media.

## Getting Started

To set up and run the SEC-NEXUS project on your local machine, please follow these detailed instructions.

### Prerequisites

Ensure you have the following software installed:

*   **Node.js:** Version 18 or higher is recommended. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm** or **Yarn:** Package managers for Node.js. npm is included with Node.js; Yarn can be installed separately.
*   **MongoDB Instance:** Access to a MongoDB database. This can be a cloud-hosted solution like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recommended for ease of setup) or a locally installed MongoDB server.

### Installation Steps

1.  **Clone the Repository:**

    Begin by cloning the project repository to your local machine using Git:

    ```bash
    git clone https://github.com/your-username/SEC-NEXUS.git
    cd SEC-NEXUS/sec-nexus
    ```

2.  **Install Dependencies:**

    Navigate into the `sec-nexus` directory and install all required project dependencies:

    ```bash
    npm install
    # Alternatively, if you prefer Yarn:
    yarn install
    ```

### Environment Configuration

Create a new file named `.env.local` in the root of the `sec-nexus` directory. Populate this file with your specific environment variables as follows:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

*   `MONGODB_URI`: Your full connection string for the MongoDB database. For MongoDB Atlas, this typically starts with `mongodb+srv://`.
*   `NEXTAUTH_SECRET`: A strong, randomly generated string crucial for securing NextAuth.js sessions. You can generate a suitable secret using a command like `openssl rand -base64 32` in your terminal.
*   `UPLOADTHING_SECRET`: Your secret key obtained from your Uploadthing dashboard.
*   `UPLOADTHING_APP_ID`: Your application ID from your Uploadthing dashboard.

### Running the Application

After configuring your environment variables, you can start the development server:

```bash
npm run dev
# Alternatively, if you prefer Yarn:
yarn dev
```

The application will compile and become accessible in your web browser at `http://localhost:3000`.

## Usage Guide

Upon launching the application, users can:

*   **Register and Authenticate:** Create a new user account or log in using existing credentials to access personalized features.
*   **Explore Events:** Browse a comprehensive list of upcoming and past events.
*   **Filter and Search:** Utilize the advanced filtering options (by category, club, department) and search functionality to quickly find specific events of interest.
*   **Event Details:** Click on any event to view detailed information, including descriptions, schedules, locations, and associated media.
*   **Administrator Functions:** Users with administrative privileges can access a dedicated dashboard to approve/reject/delete events.

## Project Structure

The project is organized into a logical and maintainable structure:

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

## Contributing

I welcome contributions to SEC-NEXUS! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and ensure they adhere to the project's coding standards.
4.  Write clear, concise commit messages.
5.  Submit a pull request with a detailed description of your changes.

## License

This project is open-source and licensed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file in the root directory of the repository for the full license text.
