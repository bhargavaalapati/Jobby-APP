# Jobby App: Job Portal Application

## Project Overview

Welcome to the Jobby App, a responsive and secure job portal application built with React. This project demonstrates key front-end development principles including user authentication, protected routing, dynamic data fetching, and a clean, responsive UI.

## Live Demo

You can view a live version of the application here:
[**Jobby App Live**](jobby-app-three-xi.vercel.app)

## Significant Features

* **User Authentication:** Secure login and logout functionality using JWT tokens stored in cookies.
* **Protected Routes:** Users must be authenticated to access the job listings and job details pages. Unauthorized access redirects to the login page.
* **Dynamic Job Listings:** Fetches and displays a list of available jobs from a remote API.
* **Job Details Page:** Uses dynamic routing (`/jobs/:id`) to display specific job information, including skills, company details, and similar jobs.
* **Responsive UI:** Styled with Tailwind CSS for a seamless experience across desktop and mobile devices.
* **State Management:** Utilizes React's built-in state and lifecycle methods to manage API calls, loading indicators, and error handling.

## Project Flow

1.  **Login:** The user is prompted to enter their credentials. Upon successful login, a JWT token is received and stored.
2.  **Redirection:** If the user is authenticated, they are automatically redirected to the main job listings page.
3.  **Job Listings:** The app fetches and displays a list of jobs.
4.  **Job Details:** Clicking on a job card navigates the user to a detailed page for that specific job, using the job's unique ID from the URL.
5.  **Logout:** Clicking the "Logout" button clears the authentication token, and the user is redirected back to the login page.

## Technologies Used

* **Frontend:** React.js
* **Routing:** React Router v6
* **Styling:** Tailwind CSS
* **State Management:** React Component State
* **API Calls:** JavaScript `fetch` API
* **Authentication:** `js-cookie`
* **Icons:** `react-icons`

## Prerequisites

Before you can run this project, you need to have the following installed on your machine:

* [Node.js](https://nodejs.org/) (LTS version recommended)
* npm (comes with Node.js)

## Installation & Usage

Follow these steps to get a local copy up and running:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/bhargavaalapati/Jobby-APP.git](https://github.com/bhargavaalapati/Jobby-APP.git)
    cd my-jobby-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

---

**Credits**
* This project was developed by Nxtwave(Assignment in React.JS course) X (Bhargava Alapati).
* APIs provided by [ccbp.in](https://apis.ccbp.in/).
