# Next Steps to Fix Login Issue

## Step 1: Push Latest Changes to GitHub

```bash
git push origin main
```

This will trigger a new Vercel deployment with improved error handling.

## Step 2: Check Vercel Environment Variables

**CRITICAL**: Make sure `NEXT_PUBLIC_API_URL` is set in Vercel:

1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Check if `NEXT_PUBLIC_API_URL` exists
5. If not, add it:
   - **Variable**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your deployed backend URL (e.g., `https://your-backend.railway.app`)
   - **Environment**: Production, Preview, Development
6. **Redeploy** after adding/updating

## Step 3: Deploy Your Backend (If Not Already Deployed)

Your backend needs to be deployed somewhere accessible. Options:

### Option A: Railway (Recommended - Easy)
1. Go to https://railway.app
2. Create new project
3. Connect your GitHub repo
4. Select the `backend` folder
5. Add environment variables:
   - `DATABASE_URL`: Your database URL
   - `JWT_SECRET`: Your secret key
   - `FRONTEND_URL`: Your Vercel URL (e.g., `https://your-app.vercel.app`)
6. Deploy

### Option B: Render
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Set root directory to `backend`
5. Add environment variables
6. Deploy

## Step 4: Test Login and Check Errors

1. Go to your Vercel app
2. Try to login
3. Open browser DevTools (F12) → **Console** tab
4. Check for error messages
5. Also check **Network** tab → look for `/api/auth/login` request
   - Check the response/error message

## Step 5: Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project → **Functions** tab
2. Click on `/api/auth/login`
3. Check the logs for detailed error messages
4. The improved error handling will show:
   - If `NEXT_PUBLIC_API_URL` is missing
   - If backend is unreachable
   - Actual error from backend

## Step 6: Verify Backend is Running

Test your backend directly:
```bash
curl -X POST https://your-backend-url.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"superadmin","password":"admin123"}'
```

Should return: `{"user": {...}, "token": "..."}`

## Common Issues & Quick Fixes

### Issue: "Backend API URL is not configured"
**Fix**: Set `NEXT_PUBLIC_API_URL` in Vercel environment variables

### Issue: "Cannot connect to backend API"
**Fix**: 
- Verify backend is deployed and running
- Check backend URL is correct
- Verify backend allows CORS from your Vercel domain

### Issue: "Invalid username or password"
**Fix**: 
- Make sure backend database is seeded
- Use: `superadmin` / `admin123`

## Quick Checklist

- [ ] Pushed latest code to GitHub
- [ ] Set `NEXT_PUBLIC_API_URL` in Vercel
- [ ] Backend is deployed and accessible
- [ ] Backend CORS allows your Vercel domain
- [ ] Backend database is seeded with users
- [ ] Checked browser console for errors
- [ ] Checked Vercel function logs

## Need Help?

Check the error message in:
1. Browser console (F12)
2. Vercel function logs
3. The login page error message (now shows more details)

The improved error handling will tell you exactly what's wrong!

