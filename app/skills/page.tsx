import { getSkillsDetail } from "@/lib/api/skills";
import SkillClient from "./SkillClient";

export default async function WorkPage() {
  const Skills = await getSkillsDetail();
  return <SkillClient skills={Skills} />;
}

//メタデータ設定
export const metadata = {
  title: "ぎぷそのポートフォリオ",
  description: "FIT2年のエンジニアを目指す人です",
  openGraph: {
    images: ["../public/images/icon.png"],
  },
};
