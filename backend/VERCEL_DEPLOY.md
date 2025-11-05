# Deploy Backend to Vercel

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Create a New Vercel Project for Backend

1. Go to https://vercel.com/dashboard
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. **IMPORTANT**: Set the **Root Directory** to `backend`
5. Configure the build:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist` (or leave empty, Vercel will auto-detect)
   - **Install Command**: `npm install`

## Step 3: Set Environment Variables

In Vercel Dashboard → Your Backend Project → Settings → Environment Variables, add:

- `DATABASE_URL`: Your database connection string (e.g., SQLite file path or PostgreSQL URL)
- `JWT_SECRET`: A secret key for JWT tokens (generate a random string)
- `FRONTEND_URL`: Your frontend Vercel URL (e.g., `https://your-frontend.vercel.app`)

For SQLite (local file):
- `DATABASE_URL`: `file:./prisma/dev.db`

For PostgreSQL (recommended for production):
- `DATABASE_URL`: `postgresql://user:password@host:5432/database`

## Step 4: Deploy

Click **Deploy** and wait for the build to complete.

## Step 5: Update Frontend API URL

1. Go to your **Frontend** Vercel project
2. Settings → Environment Variables
3. Set `NEXT_PUBLIC_API_URL` to your backend URL (e.g., `https://your-backend.vercel.app`)
4. Redeploy the frontend

## Notes

- The backend will be deployed as a serverless function
- All routes will be accessible at `https://your-backend.vercel.app/api/*`
- The NestJS app is wrapped in `serverless-http` for Vercel compatibility
- Database migrations and seeding need to be run separately (you can add a build script or use Vercel's build hooks)

## Database Setup

If using SQLite, you'll need to:
1. Run migrations before deployment, OR
2. Use a cloud database service (PostgreSQL recommended)

For PostgreSQL, you can use:
- **Vercel Postgres** (integrated with Vercel)
- **Supabase** (free tier available)
- **Railway** (easy setup)
- **Neon** (serverless PostgreSQL)

## Troubleshooting

### Build Fails
- Check that `Root Directory` is set to `backend`
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### API Not Working
- Verify environment variables are set
- Check that `FRONTEND_URL` matches your frontend domain
- Verify CORS is configured correctly

### Database Connection Issues
- SQLite files won't persist on Vercel (use PostgreSQL)
- Verify `DATABASE_URL` is correct
- Run migrations: `npx prisma migrate deploy` (in build command or separate)

