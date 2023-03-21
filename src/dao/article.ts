import { Article } from "../types";
import { readAndParseData, writeDataToFile } from "../utils";

function isValidArticleObject(b: unknown): b is Record<string, Article> {
  return Boolean(b) && typeof b === "object";
}

async function getArticles(): Promise<Record<string, Article>> {
  const parsedData = await readAndParseData("./database/articles.json");
  if (!isValidArticleObject(parsedData)) {
    throw { message: "Error accessing the database", code: 500 };
  }
  return parsedData;
}

async function insertArticle(article: Article): Promise<void> {
  const currentData = await getArticles();
  const newData = { ...currentData, [article.id]: article };
  await writeDataToFile("./database/articles.json", newData);
}

export { getArticles, insertArticle };
