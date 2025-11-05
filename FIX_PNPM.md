# Fix pnpm Detection Issue

## Problem
Vercel is detecting `pnpm` and trying to use it, but it's failing with errors. Also, Vercel is auto-detecting NestJS and trying to use `@vercel/nestjs` builder which we don't want.

## What I Fixed

1. **Added `.npmrc` in backend/** to force npm:
   ```
   package-manager=strict-npm
   engine-strict=true
   ```

2. **Updated `vercel.json`** to explicitly use npm:
   - Added `"installCommand": "npm install"`
   - Added `"framework": null` to prevent auto-detection

## Next Steps

1. **Push the fix**:
   ```bash
   git add backend/.npmrc backend/vercel.json
   git commit -m "Force npm and prevent pnpm/auto-detection"
   git push origin main
   ```

2. **In Vercel Dashboard**:
   - Go to your backend project
   - **Settings** → **General**
   - Make sure **Install Command** is set to `npm install` (or leave empty, it's in vercel.json)
   - Make sure **Framework Preset** is set to **Other** or empty

3. **Redeploy**:
   - Go to **Deployments** tab
   - Click **"⋯"** (three dots) on latest deployment
   - Click **"Redeploy"**

## Why This Happens

Vercel automatically detects:
- Package manager (pnpm, npm, yarn) based on lock files
- Framework (Next.js, NestJS, etc.) based on project structure

When it detects NestJS, it tries to use `@vercel/nestjs` builder which doesn't work well with our serverless setup.

## Verification

After redeploying, check the build logs:
- Should see: `Running "install" command: npm install`
- Should NOT see: `pnpm install` or `@vercel/nestjs`
- Build should succeed

