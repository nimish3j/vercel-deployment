# Vercel Deployment Fix

## Issue
Vercel was trying to use `@vercel/nestjs` builder which doesn't exist or isn't working properly.

## Solution
1. **Updated `vercel.json`** to explicitly use `@vercel/node` builder
2. **Added build command** to generate Prisma client and build NestJS
3. **Fixed imports** in `api/index.ts` to use compiled dist folder

## Changes Made

### 1. `backend/vercel.json`
- Explicitly uses `@vercel/node` builder
- Added `buildCommand` to run Prisma generate and NestJS build
- Configured routes to rewrite all requests to `/api/index`

### 2. `backend/package.json`
- Added `vercel-build` script that runs Prisma generate and build

### 3. `backend/api/index.ts`
- Updated imports to use compiled `dist` folder
- Falls back to source if dist doesn't exist (for development)

### 4. `backend/.vercelignore`
- Created to ignore unnecessary files during deployment

## Vercel Settings

Make sure in Vercel Dashboard:
1. **Root Directory**: Set to `backend`
2. **Framework Preset**: Other (or leave empty)
3. **Build Command**: `npm run vercel-build` (or leave empty, it's in vercel.json)
4. **Output Directory**: Leave empty (serverless function)

## Environment Variables

Set these in Vercel Dashboard:
- `DATABASE_URL`: PostgreSQL connection string (SQLite won't work)
- `JWT_SECRET`: Secret key for JWT tokens
- `FRONTEND_URL`: Your frontend Vercel URL

## Next Steps

1. Push the changes to GitHub
2. Redeploy in Vercel
3. Check build logs for any errors
4. Test the API endpoint

