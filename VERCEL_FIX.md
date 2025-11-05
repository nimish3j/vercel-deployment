# Vercel Deployment Fix

## Problem
Vercel was trying to use `pnpm` which caused errors. We've switched to `npm`.

## Solution Applied

1. **Removed pnpm configuration files** (pnpm-lock.yaml, pnpm-workspace.yaml)
2. **Updated vercel.json** to use npm instead of pnpm
3. **Set install command** to install from frontend directory

## Vercel Dashboard Settings

Make sure these are set correctly:

1. **Root Directory**: `frontend` (MUST be set in Dashboard)
2. **Framework Preset**: Next.js
3. **Build Command**: `npm install && npm run build` (or leave default)
4. **Output Directory**: `.next` (or leave default)
5. **Install Command**: `npm install` (or leave default)

## Alternative: Deploy Only Frontend

If you still have issues, you can:

1. **Create a separate repository** with just the frontend folder
2. **Or use Vercel CLI** from the frontend directory:
   ```bash
   cd frontend
   vercel
   ```

## Environment Variables

Don't forget to set:
- `NEXT_PUBLIC_API_URL`: Your backend API URL

