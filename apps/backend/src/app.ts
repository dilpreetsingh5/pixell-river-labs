import express from "express";
import cors from "cors";
import { employeeRouter } from "./api/v1/routes/employeeRoutes";
import { roleRouter } from "./api/v1/routes/roleRoutes";

const app: express.Express = express();

function isAllowedOrigin(origin: string): boolean {
  if (origin === "http://localhost:5173" || origin === "http://localhost:5175") return true;

  const configuredFrontendUrl = process.env.FRONTEND_URL;
  if (configuredFrontendUrl && origin === configuredFrontendUrl) return true;

  // Allow Vercel preview/prod frontends during labs.
  try {
    const { hostname } = new URL(origin);
    return hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

app.use(
    cors({
      origin: (origin, callback) => {
        // Non-browser clients (curl, server-to-server) may omit Origin.
        if (!origin) {
          callback(null, true);
          return;
        }

        callback(null, isAllowedOrigin(origin));
      }
    })
  );

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ status: "ok", service: "pixell-river-backend" });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1", employeeRouter);
app.use("/api/v1", roleRouter);

export { app };
export default app;
