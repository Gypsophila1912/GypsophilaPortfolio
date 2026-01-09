import { getWorksList } from "@/lib/api/works";
import WorksClient from "./WorkClient";

export default async function WorkPage() {
  const Works = await getWorksList();
  return <WorksClient works={Works} />;
}

//メタデータ設定
export const metadata = {
  title: "ぎぷそのポートフォリオ",
  description: "FIT2年のエンジニアを目指す人です",
  openGraph: {
    images: ["../public/images/icon.png"],
  },
};
