# IMPORTANT: Set Root Directory in Vercel Dashboard

## The Problem

Vercel is trying to build from the root directory, but your frontend is in the `frontend/` subdirectory. This causes dependency issues.

## The Solution

**You MUST set the Root Directory in Vercel Dashboard:**

1. Go to your Vercel project
2. Click **Settings** → **General**
3. Scroll down to **Root Directory**
4. Set it to: **`frontend`**
5. Click **Save**
6. Redeploy

## Why This Matters

When Root Directory is set to `frontend`:
- Vercel will only build the frontend folder
- Dependencies will be installed correctly
- All paths will resolve properly
- The build will succeed

## Alternative: If Root Directory Setting Doesn't Work

If you can't set Root Directory in Dashboard, you can:

1. Create a separate GitHub repository with just the `frontend` folder
2. Deploy that repository to Vercel
3. This way, Vercel will automatically use the root as the frontend

## Current Configuration

The `vercel.json` file is configured to:
- Build from `frontend` directory
- Output to `frontend/.next`
- Install dependencies in `frontend`

But the **Root Directory** setting in Vercel Dashboard takes precedence and should be set to `frontend`.

