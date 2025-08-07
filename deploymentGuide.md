# Deployment Guide

This guide provides step-by-step instructions for deploying the MERN stack expense tracker application. The frontend will be deployed on Vercel and the backend on Render.

## Prerequisites

- **Git and GitHub:** You need to have Git installed and a GitHub account. Your project should be pushed to a GitHub repository.
- **Node.js and npm:** Ensure you have Node.js and npm (or a similar package manager) installed on your local machine.
- **Vercel Account:** Sign up for a free account at [vercel.com](https://vercel.com).
- **Render Account:** Sign up for a free account at [render.com](https://render.com).
- **MongoDB Atlas Account:** You need a MongoDB database. You can get a free one from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Backend Deployment (Render)

1.  **Push your code to GitHub:** Make sure your latest code, including the `backend` directory, is pushed to your GitHub repository.

2.  **Create a New Web Service on Render:**
    *   Log in to your Render account.
    *   On the Dashboard, click **"New +"** and select **"Web Service"**.
    *   Connect your GitHub account and select your repository.

3.  **Configure the Backend Service:**
    *   **Name:** Give your service a name, for example, `expense-tracker-backend`.
    *   **Root Directory:** `backend`
    *   **Environment:** `Node`
    *   **Region:** Choose a region close to you.
    *   **Branch:** `main` (or your default branch).
    *   **Build Command:** `npm install`
    *   **Start Command:** `node server.js`

4.  **Add Environment Variables:**
    *   Click on the **"Environment"** tab.
    *   Add the following environment variables:
        *   `MONGO_URL`: Your MongoDB connection string from Atlas. Make sure to replace `<password>` with your actual database user password and that you have allowed access from all IP addresses (0.0.0.0/0).
        *   `JWT_SECRET`: A long, random, and secret string for signing JSON Web Tokens.
        *   `PORT`: `10000` (Render automatically provides a port, but it's good practice to set it).

5.  **Deploy:**
    *   Click **"Create Web Service"**.
    *   Render will start building and deploying your backend.
    *   Once the deployment is complete, copy the URL of your backend service (e.g., `https://expense-tracker-backend.onrender.com`).

## Frontend Deployment (Vercel)

1.  **Push your code to GitHub:** Ensure your `frontend` directory is up-to-date in your GitHub repository.

2.  **Create a New Project on Vercel:**
    *   Log in to your Vercel account.
    *   Click on **"Add New..."** and select **"Project"**.
    *   Import your Git Repository.

3.  **Configure the Frontend Project:**
    *   **Framework Preset:** Vercel should automatically detect it as a `Vite` project.
    *   **Root Directory:** `frontend`
    *   Expand the **"Build and Output Settings"** section and make sure they are correct:
        *   **Build Command:** `npm run build` or `vite build`
        *   **Output Directory:** `dist`
        *   **Install Command:** `npm install`

4.  **Add Environment Variables:**
    *   Go to the **"Environment Variables"** section in the project settings.
    *   Add the following environment variable:
        *   `VITE_API_BASE_URL`: The URL of your deployed backend on Render (e.g., `https://expense-tracker-backend.onrender.com`).

5.  **Deploy:**
    *   Click **"Deploy"**.
    *   Vercel will build and deploy your frontend.

## Final Steps

1.  **Update Frontend Code to Use Environment Variable:**
    *   In your frontend code, specifically in `frontend/src/utils/axiosInstance.js`, make sure you are using the environment variable for your API base URL. The code should look like this:

    ```javascript
    import axios from "axios";

    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      withCredentials: true,
    });

    export default instance;
    ```

2.  **Commit and Push:**
    *   Commit and push this change to your GitHub repository. Vercel will automatically trigger a new deployment with the updated code.

3.  **Test Your Application:**
    *   Open your Vercel frontend URL and test all the features of your application, including login, signup, adding income, and adding expenses.

That's it! Your MERN stack application should now be live.
