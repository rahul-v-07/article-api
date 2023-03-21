import { Article } from "./types";
import moment from "moment";

function isObjectArticle(o: unknown): o is Article {
  if (o && typeof o === "object") {
    const stringKeysAreValid = ["id", "title", "body"].every((key) => {
      return (
        key in o && typeof (o as Record<string, unknown>)[key] === "string"
      );
    });
    if (!stringKeysAreValid) {
      return false;
    }

    if ("date" in o && typeof o["date"] === "string") {
      const dateValue = o["date"];
      const date = moment(dateValue);
      if (!date.isValid()) {
        return false;
      }
    }

    if ("tags" in o && Array.isArray(o["tags"])) {
      const tags = o["tags"];
      const allValuesAreStrings = tags.length > 0 && tags.every((tag) => typeof tag === "string");
      if (!allValuesAreStrings) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export { isObjectArticle };
