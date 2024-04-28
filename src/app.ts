import express, { Express, Request, Response } from "express";
import routes from "./routes/jugRoute";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Health Checked. Server is running fine. Cheers! ;)");
});

app.use("/", routes);

export default app;