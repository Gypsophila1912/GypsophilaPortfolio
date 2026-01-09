import { client } from "../microcms";
import type { Skills, MicroCMSListResponse } from "../types";

export const getSkillsDetail = async (): Promise<Skills | null> => {
  try {
    const response = await client.get<Skills>({
      endpoint: "skills",
      contentId: "j7o2yp_gdi78",
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return null;
  }
};
