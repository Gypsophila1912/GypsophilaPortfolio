import { getLatestWorks } from "@/lib/api/works";
import { getLatestArticles } from "@/lib/api/articles";
import Home from "./HomeClient";

export default async function HomePage() {
  const [latestWorks, latestArticles] = await Promise.all([
    getLatestWorks(),
    getLatestArticles(),
  ]);
  return <Home latestWorks={latestWorks} latestArticles={latestArticles} />;
}

//メタデータ設定
export const metadata = {
  title: "Portfolio-Home",
  description: "Developer × Designer",
};
