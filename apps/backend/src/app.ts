import { clerkMiddleware } from "@clerk/express";
import express from "express";
import cors from "cors";
import { employeeRouter } from "./api/v1/routes/employeeRoutes";
import { roleRouter } from "./api/v1/routes/roleRoutes";

const app: express.Express = express();
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5175"
].filter((origin): origin is string => Boolean(origin));

app.use(
    cors({
      origin: allowedOrigins,
    })
  );

app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1", employeeRouter);
app.use("/api/v1", roleRouter);

export { app };
export default app;
