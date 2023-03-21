import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import articleRoutes from "./src/routes/articles";
import tagRoutes from "./src/routes/tags";
import { createFileIfDoesNotExist } from "./src/utils";
import { CustomError } from "./src/types";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

(async () => {
  await Promise.all([
    createFileIfDoesNotExist("./database/articles.json", "{}"),
    createFileIfDoesNotExist("./database/tags_mapping.json", "{}"),
  ]);
})();

app.use(bodyParser.json());

app.use("/articles", articleRoutes);
app.use("/tags", tagRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.code || 500).send({
    message: error.message || "Some internal error occurred",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
