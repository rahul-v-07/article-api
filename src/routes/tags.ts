import Express from "express";
import { errorHandlingMiddleware } from "../middlewares";
import { getTagInfoFilteredByDate } from "../services/tags";

const router = Express.Router();

router.get(
  "/:tagName/:date",
  errorHandlingMiddleware(
    async (req: Express.Request, res: Express.Response) => {
      const { tagName, date } = req.params;
      const tagInfo = await getTagInfoFilteredByDate(tagName, date);
      res.send({
        ...tagInfo,
      });
    }
  )
);

export default router;
