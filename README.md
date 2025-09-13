SEC-NEXUS
Project Overview
SEC-NEXUS is a robust and scalable event management platform meticulously designed for educational institutions, specifically catering to the needs of St. Edmund's College, Shillong. This application streamlines the entire event lifecycle, from creation and promotion to user registration and administration. It provides a centralized, intuitive system for managing diverse events, fostering community engagement, and enhancing organizational efficiency within the academic environment.

**

Live Demo
Experience the application live at: sec-nexus10.vercel.app

Key Features
Comprehensive User Authentication: Implements secure and efficient user registration and login flows using Clerk, ensuring data integrity and personalized user experiences.

Dynamic Event Management: Offers full CRUD (Create, Read, Update, Delete) capabilities for events, allowing administrators and authorized users to manage event details, schedules, and capacities with ease.

Advanced Filtering System: Events can be meticulously organized and filtered by various attributes, including custom categories, affiliated clubs, and academic departments, facilitating effortless discovery and navigation for users.

Intuitive Admin Dashboard: A dedicated, secure administrative interface provides powerful tools for overseeing all aspects of the platform, including user management and event moderation (approval/rejection).

Seamless User Data Synchronization: Features robust mechanisms for synchronizing user data between Clerk and the application's database, maintaining an up-to-date user base.

Integrated Image Uploads: Incorporates a streamlined process for uploading and managing event-related imagery via Uploadthing, enhancing visual appeal and information richness.

Responsive and Modern User Interface: Developed with a mobile-first approach using Next.js and Tailwind CSS, ensuring an optimal and consistent viewing experience across a wide range of devices.

Technologies & Stack
SEC-NEXUS is built upon a modern and efficient full-stack architecture, leveraging the following key technologies:

Frontend:

Next.js: A React framework for building server-side rendered and statically generated web applications.

React: A JavaScript library for building user interfaces.

TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Shadcn UI: A collection of re-usable UI components.

Backend & Database:

Next.js API Routes: For building server-side API endpoints.

MongoDB: A NoSQL document database.

Mongoose: An object data modeling (ODM) library for MongoDB and Node.js.

Clerk: For user authentication and management.

Uploadthing: A service for handling file uploads.

Project Structure
The project follows a standard Next.js App Router structure:

sec-nexus/
├── app/                  # Core application directory
│   ├── (auth)/           # Authentication routes (sign-in, sign-up)
│   ├── (root)/           # Main application routes (home, events, profile)
│   ├── admin/            # Admin-specific routes
│   └── api/              # API endpoints for backend logic
├── components/           # Reusable React components
│   ├── shared/           # Components used across multiple pages
│   └── ui/               # Base UI components from Shadcn
├── lib/                  # Server-side logic, utilities, and database configuration
│   ├── actions/          # Server Actions for data fetching and mutation
│   ├── database/         # Mongoose models and connection setup
│   └── validator.ts      # Zod schemas for form validation
├── public/               # Static assets (images, icons)
├── constants.ts          # Application-wide constants
├── middleware.ts         # Authentication and routing middleware
└── ...                   # Configuration files

Getting Started
To set up and run the SEC-NEXUS project on your local machine, please follow these instructions.

Prerequisites
Ensure you have the following software installed:

Node.js: Version 18 or higher.

npm or Yarn.

MongoDB: A local instance or a cloud-hosted solution like MongoDB Atlas.

Installation
Clone the Repository:

git clone [https://github.com/itssambuddha/SEC-NEXUS.git](https://github.com/itssambuddha/SEC-NEXUS.git)
cd SEC-NEXUS/sec-nexus

Install Dependencies:

npm install
# or
yarn install

Environment Configuration
Create a .env.local file in the sec-nexus directory and add the following environment variables:

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

Running the Application
Start the development server:

npm run dev
# or
yarn dev

The application will be available at http://localhost:3000.

Usage Guide
Register and Log In: Create an account or sign in to access the platform's features.

Browse Events: View a list of all events, with filtering options.

Create Events: Authenticated users can create new events through the "Create Event" page.

Manage Events: Event creators can edit and delete their events.

Admin Dashboard: Administrators have access to a dashboard to approve, reject, or delete any event.

Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes and commit them (git commit -m 'Add some feature').

Push to the branch (git push origin feature/your-feature-name).

Open a Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
