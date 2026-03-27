# Backend Setup (Lab 4.2)

## Local Database
1. Start Postgres with Docker (maps to host port 5434 to avoid local Postgres conflicts):

```bash
docker compose up -d
```

2. Create `apps/backend/.env` using `apps/backend/.env.example` and update if needed.

## Prisma
```bash
npm install
npm run prisma:migrate
npm run db:seed
```

## Run API
```bash
npm run dev
```
