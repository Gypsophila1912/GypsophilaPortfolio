import { client } from "../microcms";
import type { Work, MicroCMSListResponse } from "../types";

/*一覧取得*/
export const getWorksList = async (limit?: number): Promise<Work[]> => {
  try {
    const response = await client.get<MicroCMSListResponse<Work>>({
      endpoint: "works",
      queries: {
        limit: limit || 100,
        orders: "-date",
      },
    });
    return response.contents;
  } catch (error) {
    console.error("Failed to fetch works:", error);
    return [];
  }
};

/*各ページ情報取得 */
export const getWork = async (contentId: string): Promise<Work | null> => {
  try {
    const response = await client.get<Work>({
      endpoint: "works",
      contentId,
    });
    return response;
  } catch (error) {
    console.error(`Failed to fetch work detail (id: ${contentId}):`, error);
    return null;
  }
};
/*最新４件取得 */
export const getLatestWorks = async (limit: number = 4): Promise<Work[]> => {
  try {
    const response = await client.get<MicroCMSListResponse<Work>>({
      endpoint: "works",
      queries: {
        limit,
        orders: "-date",
      },
    });
    return response.contents;
  } catch (error) {
    console.error("Failed to fetch latest works:", error);
    return [];
  }
};
