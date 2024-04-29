import express, { Express, Request, Response } from "express";
import router from "./routes/jugRouter";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Health Checked. Server is running fine. Cheers! ;)");
});

app.use("/", router);

export default app;