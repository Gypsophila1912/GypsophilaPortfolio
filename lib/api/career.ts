import { client } from "../microcms";
import type { Career, MicroCMSListResponse } from "../types";
/*一覧取得*/
export const getCareersList = async (limit?: number): Promise<Career[]> => {
  try {
    const response = await client.get<MicroCMSListResponse<Career>>({
      endpoint: "career",
      queries: {
        limit: limit || 100,
        orders: "-date",
      },
    });
    return response.contents;
  } catch (error) {
    console.error("Failed to fetch careers:", error);
    return [];
  }
};
