import Express from "express";
import { errorHandlingMiddleware } from "../middlewares";
import { getArticleById, insertArticle } from "../services/article";
import { Article } from "../types";
import { isObjectArticle } from "../validators";

const router = Express.Router();

router.post(
  "/",
  errorHandlingMiddleware(
    async (req: Express.Request, res: Express.Response) => {
      const articleInput = req.body;
      if (!isObjectArticle(articleInput)) {
        throw { message: "Invalid input supplied", code: 400 };
      }

      await insertArticle(articleInput);
      res.send({
        message: "Article inserted successfully",
      });
    }
  )
);

router.get(
  "/:articleId",
  errorHandlingMiddleware(
    async (req: Express.Request, res: Express.Response) => {
      const articleId = req.params.articleId;
      const article = await getArticleById(articleId);
      res.send({
        article,
        success: true,
      });
    }
  )
);

export default router;
