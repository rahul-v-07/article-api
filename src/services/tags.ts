import { getArticles } from "../dao/article";
import { getTagsToArticlesMapping } from "../dao/tags";
import { Article, TagInfo } from "../types";

async function getArticlesAndRelatedTagsForTheDate(
  tagName: string,
  relatedArticles: string[],
  date: string
): Promise<{ tags: string[]; articles: Article[] }> {
  const articles = await getArticles();
  const articlesForTheDay = relatedArticles
    .map((articleId) => articles[articleId])
    .filter((article) => article.date.replace(/-/g, "") === date);

  const relatedTags = articlesForTheDay.reduce(
    (tags: string[], article: Article): string[] => {
      const articleTags = article.tags;
      return [...tags, ...articleTags];
    },
    []
  );
  const uniqueTags = [...new Set(relatedTags)].filter((tag) => tag !== tagName);

  return {
    tags: uniqueTags,
    articles: articlesForTheDay,
  };
}

async function getTagInfoFilteredByDate(
  tagName: string,
  date: string
): Promise<TagInfo> {
  const tagsToArticleMapping = await getTagsToArticlesMapping();
  if (!(tagName in tagsToArticleMapping)) {
    throw { message: "Tag name does not exist", code: 404 };
  }
  const allRelatedArticles = tagsToArticleMapping[tagName];
  const { articles, tags } = await getArticlesAndRelatedTagsForTheDate(
    tagName,
    allRelatedArticles,
    date
  );
  return {
    tag: tagName,
    count: articles.length,
    articles: articles.map((article) => article.id),
    related_tags: tags,
  };
}

export { getTagInfoFilteredByDate };
