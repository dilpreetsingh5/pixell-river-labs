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

## Lab 5.2: Data Caching / Server State (TanStack Query)

### What change I made
I refactored the front-end so it no longer relies on `useEffect` plus manual “refresh” functions to keep employees, departments, and roles in sync. Instead, the app treats this as server state and uses TanStack Query to fetch the data, cache it, and automatically refresh it when a create action succeeds. This mostly changed the React data flow, not the UI layout.

### Tools used
I integrated `@tanstack/react-query` into the React app by adding a `QueryClientProvider` at the root and replacing the old fetch-on-mount logic with `useQuery` hooks. For create actions, I used `useMutation` and invalidated the relevant cached queries (`employees`, `departments`, `roles`) so the UI updates from a single source of truth. This removed a lot of “plumbing” code that was previously needed to pass refresh callbacks around.

### User experience impact
The app feels more reliable because the UI is now driven by a consistent cache of server data. When a user adds an employee or role, the list refreshes automatically without needing a page reload, and the app avoids extra duplicate requests when navigating around. Loading and error states are also clearer, because the query status is tracked in one place rather than being implied by empty arrays or silent failures.

### How it changed my understanding
This change helped me separate “UI state” from “server state”. Employees and departments are not really owned by React components, they are owned by the backend, so using a server-state tool makes the architecture clearer. It also made it easier to reason about when data should be refetched (after mutations, or when data becomes stale) and why “effects for fetching” can become messy as the app grows.
