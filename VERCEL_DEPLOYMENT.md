# Vercel Deployment Guide

This guide will help you deploy the Dongri DMS frontend to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Your backend API URL (for the `NEXT_PUBLIC_API_URL` environment variable)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import Project on Vercel**
   - Go to https://vercel.com/new
   - Import your Git repository
   - Vercel will auto-detect it's a Next.js project

3. **Configure Project Settings**
   - **Root Directory**: Set to `frontend`
   - **Framework Preset**: Next.js
   - **Build Command**: `pnpm install && pnpm build` (or leave default)
   - **Output Directory**: `.next` (or leave default)
   - **Install Command**: `pnpm install` (or leave default)

4. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add the following:
     - `NEXT_PUBLIC_API_URL`: Your backend API URL (e.g., `https://your-backend-api.railway.app` or `https://your-backend-api.render.com`)
     - **Important**: This must be set to your actual deployed backend URL, not localhost

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from frontend directory**
   ```bash
   cd frontend
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   # Enter your deployed backend API URL (e.g., https://your-backend-api.railway.app)
   # Select environment: Production, Preview, Development
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Environment Variables

Make sure to set these in Vercel Dashboard → Settings → Environment Variables:

- `NEXT_PUBLIC_API_URL`: Your deployed backend API URL
  - **Production**: Your production backend URL (e.g., `https://dongri-dms-api.railway.app`)
  - **Preview**: Same as production or your staging backend URL
  - **Development**: `http://localhost:3001` (for local development)
  - **Important**: The default is `http://localhost:3001` for local development. You MUST set this to your deployed backend URL in Vercel.

## Important Notes

1. **Monorepo Setup**: Since this is a monorepo, Vercel is configured to:
   - Build from the `frontend` directory
   - Use `pnpm` as the package manager
   - Install dependencies from the root workspace

2. **API Routes**: The Next.js API routes (`/api/auth/*`, `/api/dashboard/*`) will work on Vercel as serverless functions.

3. **Cookies**: HttpOnly cookies work on Vercel, but make sure:
   - Your backend API allows CORS from your Vercel domain
   - If using a custom domain, update CORS settings

4. **Backend Deployment**: The backend (NestJS) needs to be deployed separately. Options:
   - Deploy to Railway, Render, Fly.io, or similar platforms
   - Deploy to your own server
   - Use Vercel Serverless Functions (not recommended for NestJS)

## Troubleshooting

### Build Fails
- Check that `pnpm` is installed in Vercel
- Verify all dependencies are in `frontend/package.json`
- Check build logs in Vercel dashboard

### Environment Variables Not Working
- Make sure variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding environment variables

### API Routes Not Working
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check that your backend API is accessible from Vercel
- Verify CORS settings on your backend

## Next Steps After Deployment

1. Update your backend CORS settings to allow your Vercel domain
2. Test the login flow
3. Configure a custom domain (optional)
4. Set up preview deployments for pull requests (automatic with Vercel)

