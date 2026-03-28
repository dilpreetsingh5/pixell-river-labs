import express from "express";
import cors from "cors";
import { employeeRouter } from "./api/v1/routes/employeeRoutes";
import { roleRouter } from "./api/v1/routes/roleRoutes";

const app: express.Express = express();

app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:5175"],
    })
  );

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1", employeeRouter);
app.use("/api/v1", roleRouter);

export { app };
export default app;
