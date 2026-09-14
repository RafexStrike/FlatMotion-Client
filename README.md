# AI Animation Studio

This project is an AI-powered full-stack web application for generating and managing 2D animation videos using Manim.

## Repositories
- `client`: Next.js frontend
- `server`: Node.js + Express backend

## Docker Deployment on Render

To deploy the backend to Render using Docker (which provides the necessary system libraries like Python, FFmpeg, and LaTeX for Manim to run):

1. **Push your repository** to GitHub.
2. In your Render dashboard, create a new **Web Service**.
3. Select your GitHub repository.
4. Set the **Environment** to `Docker`.
5. Under settings, specify the **Root Directory** as `server`. (This tells Render to build the Dockerfile contained in the `server` folder).
6. **Add the required environment variables**:
    - `DATABASE_URL`
    - `CLOUDINARY_CLOUD_NAME`
    - `CLOUDINARY_API_KEY`
    - `CLOUDINARY_API_SECRET`
    - `GEMINI_API_KEY` (or other AI provider key like `HF_API_KEY`)
7. **Deploy**. 

*Note:* the first build might take several minutes to download and configure Manim, LaTeX, and FFmpeg layers. Docker is strongly required on Render because standard environments lack the heavy dependencies needed for rendering 2D animation videos.

## Production Environment Variables

To ensure authentication and API communication work correctly in production, set the following variables:

### Server Side (Render)
- `BETTER_AUTH_URL`: `https://your-backend-url.onrender.com` (e.g., `https://flatmotion-server.onrender.com`)
- `TRUSTED_CLIENT_ORIGIN`: `http://localhost:3000,https://your-frontend-url.vercel.app`
- `BETTER_AUTH_SECRET`: A random string for security.

### Client Side (Vercel/Local)
- `NEXT_PUBLIC_API_URL`: `https://your-backend-url.onrender.com/api` (Must include the `/api` suffix)
