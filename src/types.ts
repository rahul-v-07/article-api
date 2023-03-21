interface Article {
    id: string;
    title: string;
    date: string;
    body: string;
    tags: string[];
}

interface TagInfo {
    tag: string;
    count: number;
    articles: string[];
    related_tags: string[];
}

class CustomError extends Error {
    code?: number;
}
 
export {
    CustomError,
    Article,
    TagInfo,
}