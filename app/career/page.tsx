import { getCareersList } from "@/lib/api/career";
import CareerClient from "./CareerClient";

export default async function WorkPage() {
  const Careers = await getCareersList();
  return <CareerClient careers={Careers} />;
}

//メタデータ設定
export const metadata = {
  title: "ぎぷそのポートフォリオ",
  description: "FIT2年のエンジニアを目指す人です",
  openGraph: {
    images: ["../public/images/icon.png"],
  },
};
