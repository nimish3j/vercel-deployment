# Backend Vercel Deployment - Quick Setup

## ✅ What's Been Configured

1. **Serverless Handler** (`backend/api/index.ts`)
   - Wraps NestJS app in `serverless-http` for Vercel compatibility
   - Caches the app instance for better performance
   - Configures CORS and validation pipes

2. **Dependencies Added**
   - `express`: ^4.18.2
   - `serverless-http`: ^3.0.3
   - `@types/serverless-http`: ^2.5.5

3. **Vercel Config** (`backend/vercel.json`)
   - Configured for serverless deployment

## 🚀 Deploy Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Push to GitHub
```bash
git add .
git commit -m "Add Vercel serverless configuration for backend"
git push origin main
```

### 3. Create New Vercel Project for Backend

1. Go to https://vercel.com/dashboard
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. **CRITICAL**: In project settings, set **Root Directory** to `backend`
5. Configure build settings:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave empty (Vercel auto-detects)
   - **Install Command**: `npm install`

### 4. Set Environment Variables

In Vercel Dashboard → Your Backend Project → Settings → Environment Variables:

- `DATABASE_URL`: Your database connection string
  - For PostgreSQL: `postgresql://user:password@host:5432/database`
  - For SQLite (local only): `file:./prisma/dev.db`
  
- `JWT_SECRET`: A secret key (generate random string)
  - Example: `your-super-secret-jwt-key-change-this-in-production`

- `FRONTEND_URL`: Your frontend Vercel URL
  - Example: `https://your-frontend.vercel.app`

### 5. Deploy

Click **Deploy** and wait for build to complete.

Your backend will be available at: `https://your-backend.vercel.app/*`

**Note**: Routes are configured to work at the root level (e.g., `/auth/login`).

### 6. Update Frontend API URL

1. Go to your **Frontend** Vercel project
2. Settings → Environment Variables
3. Set `NEXT_PUBLIC_API_URL` = `https://your-backend.vercel.app`
4. Redeploy frontend

## ⚠️ Important Notes

### Route Configuration
- All backend routes work at the root level (e.g., `/auth/login`)
- Vercel rewrites all requests to the serverless function
- Frontend can call routes normally (e.g., `/auth/login`)

### Database
- **SQLite files won't work on Vercel** (read-only filesystem)
- Use **PostgreSQL** for production (recommended)
- Options:
  - **Vercel Postgres** (integrated, easiest)
  - **Supabase** (free tier available)
  - **Railway** (easy setup)
  - **Neon** (serverless PostgreSQL)

### Prisma Migrations
Run migrations before deployment or add to build command:
```json
"build": "prisma generate && prisma migrate deploy && nest build"
```

Or run migrations separately:
```bash
npx prisma migrate deploy
```

## 🔧 Troubleshooting

### Build Fails
- Check **Root Directory** is set to `backend`
- Verify all dependencies are installed
- Check build logs for specific errors

### 404 Errors
- Remember all routes are prefixed with `/api`
- Check Vercel function logs

### Database Connection
- Verify `DATABASE_URL` is correct
- SQLite won't work - use PostgreSQL
- Check database is accessible from Vercel

### CORS Errors
- Verify `FRONTEND_URL` matches your frontend domain
- Check backend CORS configuration

## 📝 Next Steps

1. Deploy backend to Vercel
2. Update frontend `NEXT_PUBLIC_API_URL`
3. Test login functionality
4. Set up production database (PostgreSQL)

