# Pixell River Labs

## Local development setup

### Create PostgreSQL database
1. Create an empty PostgreSQL database and keep the connection URL.
2. Add that database URL to the back-end `.env` file.

## Create Clerk account and project
1. Create a Clerk account and a free project.
2. In the Clerk dashboard, open the API keys page.
3. Copy the publishable key and secret key.

## Add .env files
1. Create `apps/frontend/.env` and add:

```env
VITE_CLERK_PUBLISHABLE_KEY=<clerk-publishable-key>
VITE_API_BASE_URL=http://localhost:3001/api/v1
```

2. Create `apps/backend/.env` and add:

```env
CLERK_PUBLISHABLE_KEY=<clerk-publishable-key>
CLERK_SECRET_KEY=<clerk-secret-key>
FRONTEND_URL=http://localhost:5173
PORT=3001
DATABASE_URL=<local-postgres-db-url>
```

## Migrate the database
1. Open a terminal in the project root.
2. Go to the back-end folder:

```powershell
cd apps/backend
```

3. Run:

```powershell
npx prisma migrate deploy
npx prisma generate
```

## Run the app
1. Return to the project root.
2. Start the app:

```powershell
npm run dev
```

## Test the app
1. Open `http://localhost:5173`
2. While signed out, confirm you can view the employee and organization data.
3. Confirm the forms are hidden and a login prompt appears instead.
4. Sign up or sign in with Clerk.
5. Confirm the forms appear after logging in.
6. Add a new employee or role to test the protected create actions.
