# Vercel Dashboard Settings - REQUIRED

## You MUST Configure These Settings

Go to your Vercel project → **Settings** → **General**:

### 1. Root Directory
Set to: **`frontend`**

### 2. Framework Preset
**Next.js** (should auto-detect)

### 3. Package Manager
**Select: npm** (NOT pnpm or yarn)

### 4. Build Command
Leave default or set to: `npm run build`

### 5. Output Directory
Leave default or set to: `.next`

### 6. Install Command
Leave default or set to: `npm install`

## Why This Matters

- **Root Directory = `frontend`**: Tells Vercel to build from the frontend folder
- **Package Manager = npm**: Forces npm instead of pnpm
- Without these settings, Vercel will try to use pnpm and fail

## After Setting These

1. Click **Save**
2. Go to **Deployments** tab
3. Click **Redeploy** on the latest deployment
4. Or push a new commit to trigger a new deployment

## Environment Variables

Also set in **Settings** → **Environment Variables**:
- `NEXT_PUBLIC_API_URL`: Your backend API URL

