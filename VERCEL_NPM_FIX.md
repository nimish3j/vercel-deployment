# Fix Vercel Using pnpm Instead of npm

## The Problem

Vercel is trying to use `pnpm` instead of `npm`, which causes errors. Even though we removed `pnpm-workspace.yaml`, Vercel might still be detecting it.

## Solutions Applied

1. **Created `.npmrc` files** - Forces npm to be used
2. **Fixed Tailwind CSS version** - Downgraded to v3.4.18 (v4 has breaking changes)
3. **Set package-lock=true** - Ensures npm is used

## CRITICAL: Vercel Dashboard Settings

You **MUST** configure these in Vercel Dashboard:

1. Go to **Settings** → **General**
2. Set **Root Directory**: `frontend`
3. Set **Install Command**: `npm install` (or leave default)
4. Set **Build Command**: `npm run build` (or leave default)
5. Set **Output Directory**: `.next` (or leave default)
6. **Package Manager**: Select **npm** (not pnpm or yarn)

## Alternative: Use Vercel CLI

If Dashboard settings don't work, redeploy using CLI:

```bash
cd frontend
vercel --prod
```

This will use the `frontend/vercel.json` configuration.

## Why This Happens

Vercel auto-detects package managers based on lock files. Even though we removed pnpm-workspace.yaml, Vercel might be using cached settings. Setting it explicitly in Dashboard fixes this.

