import { getArticles, insertArticle as insertArticleDao } from "../dao/article";
import { mapTagsToArticle } from "../dao/tags";
import { Article } from "../types";

async function insertArticle(article: Article) {
  const allArticles = await getArticles();
  if (article.id in allArticles) {
    throw { message: "Article with passed ID already exists", code: 500 };
  }
  return Promise.all([
    insertArticleDao(article),
    mapTagsToArticle(article.tags, article.id)
  ])
}

async function getArticleById(id: string) {
  const allArticles = await getArticles();
  const article = allArticles[id];
  if (!article) {
    throw { message: "Unable to find the article by supplied ID", code: 400 };
  }
  return article;
}

export { insertArticle, getArticleById };
