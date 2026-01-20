import { getArticlesList } from "@/lib/api/articles";
import ArticlesClient from "./ArticlesClient";

export default async function WorkPage() {
  const Articles = await getArticlesList();
  return <ArticlesClient articles={Articles} />;
}

//メタデータ設定
export const metadata = {
  title: "ぎぷそのポートフォリオ",
  description: "FIT2年のエンジニアを目指す人です",
  openGraph: {
    images: ["../public/images/icon.png"],
  },
};
