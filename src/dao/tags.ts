import { readAndParseData, writeDataToFile } from "../utils";

function isValidMappingObject(b: unknown): b is Record<string, string[]> {
  return Boolean(b) && typeof b === "object";
}

async function getTagsToArticlesMapping(): Promise<Record<string, string[]>> {
  const parsedData = await readAndParseData("./database/tags_mapping.json");
  if (!isValidMappingObject(parsedData)) {
    throw { message: "Error accessing the database", code: 500 };
  }
  return parsedData;
}

async function mapTagsToArticle(
  tagNames: string[],
  articleId: string
): Promise<void> {
  const currentData = await getTagsToArticlesMapping();
  const newData = tagNames.reduce((newData, tagName) => {
    return {
      ...newData,
      [tagName]:
        tagName in currentData
          ? [...currentData[tagName], articleId]
          : [articleId],
    };
  }, currentData);

  await writeDataToFile("./database/tags_mapping.json", newData);
}

export { getTagsToArticlesMapping, mapTagsToArticle };
