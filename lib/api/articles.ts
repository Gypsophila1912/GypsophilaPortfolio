import { client } from "../microcms";
import type { Article, MicroCMSListResponse } from "../types";

/*一覧取得*/
export const getArticlesList = async (limit?: number): Promise<Article[]> => {
  try {
    const response = await client.get<MicroCMSListResponse<Article>>({
      endpoint: "articles",
      queries: {
        limit: limit || 100,
        orders: "-date",
      },
    });
    return response.contents;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
};

/*各記事取得 */
export const getArticleDetail = async (
  contentId: string
): Promise<Article | null> => {
  try {
    const response = await client.get<Article>({
      endpoint: "articles",
      contentId,
    });
    return response;
  } catch (error) {
    console.error(`Failed to fetch article detail (id:${contentId}):`, error);
    return null;
  }
};

/*最新４件取得*/
export const getLatestArticles = async (
  limit: number = 4
): Promise<Article[]> => {
  try {
    const response = await client.get<MicroCMSListResponse<Article>>({
      endpoint: "articles",
      queries: {
        limit,
        orders: "-date",
      },
    });
    return response.contents;
  } catch (error) {
    console.error("Failed to fetch latest articles:", error);
    return [];
  }
};
