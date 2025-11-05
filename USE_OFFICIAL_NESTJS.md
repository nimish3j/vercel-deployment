# Using Vercel's Official NestJS Support

## What Changed

I've updated the configuration to use Vercel's **official NestJS support** instead of our custom serverless function wrapper.

### Changes Made

1. **Simplified `vercel.json`**:
   - Removed custom `builds` and `rewrites`
   - Set `framework: "nestjs"` to use official NestJS support
   - Vercel will auto-detect `src/main.ts` as entrypoint

2. **Kept npm forcing**:
   - `installCommand: "npm install"` ensures npm is used
   - `backend/.npmrc` still forces npm

## How It Works

Vercel will:
- Auto-detect `backend/src/main.ts` as the entrypoint
- Use `@vercel/nestjs` builder (official support)
- Handle all routing automatically
- Convert NestJS app to serverless functions

## Vercel Dashboard Settings

**IMPORTANT**: You still need to set these in Dashboard:

1. **Root Directory**: `backend`
2. **Framework Preset**: **NestJS** (now it's okay to use this!)
3. **Install Command**: `npm install` (forces npm, not pnpm)
4. **Build Command**: `npm run vercel-build` (or leave empty)

## Why This Should Work Now

The key is:
- Framework Preset = **NestJS** (uses official support)
- Install Command = **npm install** (overrides pnpm)

This tells Vercel:
- "Use NestJS framework" (official support)
- "But use npm, not pnpm" (installCommand override)

## Deployment Steps

1. **Update Vercel Dashboard Settings**:
   - Framework Preset: **NestJS**
   - Install Command: `npm install`
   - Root Directory: `backend`

2. **Deploy**:
   - Push changes (or redeploy)
   - Should now use official NestJS support with npm

3. **Verify**:
   - Build logs should show: `Installing Builder: @vercel/nestjs`
   - But should use: `npm install` (not pnpm)
   - Build should succeed

## Benefits of Official Support

- ✅ Automatic routing
- ✅ Better cold start performance
- ✅ Optimized for NestJS
- ✅ No custom wrapper needed

## If It Still Uses pnpm

If Vercel still tries to use pnpm:
1. Check Dashboard → Install Command = `npm install`
2. Verify `backend/.npmrc` exists with `package-manager=strict-npm`
3. Force clean redeploy (no cache)

## Comparison

### Before (Custom Serverless Function)
- Custom `api/index.ts` wrapper
- Manual routing configuration
- More complex setup

### Now (Official NestJS Support)
- Auto-detects `src/main.ts`
- Automatic routing
- Simpler configuration
- Official Vercel support

---

**Try deploying now with Framework Preset = NestJS and Install Command = npm install!**

