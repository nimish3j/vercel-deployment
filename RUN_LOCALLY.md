# Running the App Locally

This guide will help you run the Dongri DMS application on your local machine.

## Prerequisites

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **pnpm** - Install with: `npm install -g pnpm`
3. **PostgreSQL Database** - You can use:
   - Local PostgreSQL installation
   - Docker: `docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`
   - Or a cloud service like [Supabase](https://supabase.com) or [Neon](https://neon.tech) (free tier available)

## Step 1: Install Dependencies

From the root directory:

```bash
cd "/Users/nimishmarathe/oh poc"
pnpm install
```

This will install dependencies for both frontend and backend.

## Step 2: Set Up Database

1. **Create a PostgreSQL database** (if not already created)

2. **Update `.env` file** in the root directory:
   ```bash
   # Copy the example file
   cp .env.example .env
   ```

3. **Edit `.env` and set your database URL**:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/dongri_dms?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-change-in-production"
   JWT_EXPIRES_IN="7d"
   PORT=3001
   NODE_ENV=development
   ```

## Step 3: Set Up Backend Database

```bash
# Navigate to backend
cd backend

# Generate Prisma client
pnpm prisma:generate

# Run database migrations
pnpm prisma:migrate

# Seed the database with default users
pnpm prisma:seed
```

This will create the database tables and add default users:
- `superadmin` / `admin123`
- `admin` / `admin123`
- `uploader` / `upload123`
- `viewer` / `view123`

## Step 4: Start the Backend

In the root directory:

```bash
pnpm dev:backend
```

Or from the backend directory:
```bash
cd backend
pnpm start:dev
```

The backend will run on **http://localhost:3001**

## Step 5: Start the Frontend

Open a **new terminal window** and from the root directory:

```bash
pnpm dev:frontend
```

Or from the frontend directory:
```bash
cd frontend
pnpm dev
```

The frontend will run on **http://localhost:3000**

## Step 6: Access the Application

1. Open your browser and go to: **http://localhost:3000**
2. You'll be redirected to the login page
3. Use these credentials to login:
   - **Username**: `superadmin`
   - **Password**: `admin123`

## Troubleshooting

### Backend won't start
- Check that PostgreSQL is running
- Verify `DATABASE_URL` in `.env` is correct
- Make sure port 3001 is not already in use

### Frontend won't start
- Check that port 3000 is not already in use
- Make sure dependencies are installed: `pnpm install`

### Database connection errors
- Verify PostgreSQL is running: `pg_isready` or `docker ps` (if using Docker)
- Check database credentials in `.env`
- Ensure the database exists

### Can't login
- Make sure the backend is running on port 3001
- Check browser console for errors
- Verify the database was seeded: `cd backend && pnpm prisma:studio` to view data

## Useful Commands

### View database in Prisma Studio
```bash
cd backend
pnpm prisma:studio
```
This opens a GUI at http://localhost:5555 to view/edit your database.

### Reset database
```bash
cd backend
pnpm prisma:migrate reset
pnpm prisma:seed
```

### Check if ports are in use
```bash
# Check port 3000 (frontend)
lsof -i :3000

# Check port 3001 (backend)
lsof -i :3001
```

## Quick Start (All in One)

If you want to start everything quickly:

```bash
# Terminal 1 - Backend
cd "/Users/nimishmarathe/oh poc"
pnpm dev:backend

# Terminal 2 - Frontend (open new terminal)
cd "/Users/nimishmarathe/oh poc"
pnpm dev:frontend
```

Then open http://localhost:3000 in your browser!

