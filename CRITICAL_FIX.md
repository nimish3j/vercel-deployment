# CRITICAL: Force npm and Prevent NestJS Auto-Detection

## Problem
Vercel is:
1. Auto-detecting NestJS (from `nest-cli.json`)
2. Using `@vercel/nestjs` builder
3. That builder forces `pnpm install` which is failing

## Solution

### 1. Explicitly Use `@vercel/node` Builder
Added `builds` section to `vercel.json` to explicitly use `@vercel/node` instead of letting Vercel auto-detect.

### 2. Ignore `nest-cli.json`
Added `nest-cli.json` to `.vercelignore` so Vercel doesn't detect it as a NestJS project.

### 3. Force npm
- `backend/.npmrc` forces npm
- `vercel.json` has `installCommand: "npm install"`

## What Changed

1. **`backend/vercel.json`**:
   - Added explicit `builds` section with `@vercel/node`
   - This prevents Vercel from auto-detecting and using `@vercel/nestjs`

2. **`backend/.vercelignore`**:
   - Added `nest-cli.json` to prevent NestJS detection

## Next Steps

1. **Push the fix**:
   ```bash
   git add backend/vercel.json backend/.vercelignore
   git commit -m "CRITICAL: Force @vercel/node builder, prevent NestJS auto-detection"
   git push origin main
   ```

2. **In Vercel Dashboard**:
   - Go to your backend project
   - **Settings** → **General**
   - **Framework Preset**: Must be **Other** or empty
   - **Install Command**: Should be `npm install` (or empty, it's in vercel.json)

3. **Redeploy**:
   - Should auto-deploy from push
   - Or manually redeploy from Deployments tab

## Verification

After redeploying, build logs should show:
- ✅ `Installing Builder: @vercel/node` (NOT `@vercel/nestjs`)
- ✅ `Running "install" command: npm install` (NOT `pnpm install`)
- ✅ Build succeeds

## Why This Works

By explicitly specifying `builds` with `@vercel/node`, we tell Vercel:
- "Don't auto-detect, use THIS builder"
- This overrides the NestJS detection
- The `@vercel/node` builder uses npm, not pnpm

