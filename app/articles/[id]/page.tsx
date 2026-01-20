import { getArticleDetail } from "@/lib/api/articles";
import { notFound } from "next/navigation";
import ArticleDetail from "./ArticleDetailClient";

export default async function WorkDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const article = await getArticleDetail(params.id);

  if (!article) {
    notFound();
  }

  return <ArticleDetail article={article} />;
}

// メタデータ設定
export async function generateMetadata({ params }: { params: { id: string } }) {
  const work = await getArticleDetail(params.id);

  if (!work) {
    return {
      title: "Work Not Found",
    };
  }

  return {
    title: `${work.title} | ぎぷそのポートフォリオ`,
    description: work.htmlContent.replace(/<[^>]*>/g, "").substring(0, 150),
    openGraph: {
      images: [work.mainImage.url],
    },
  };
}
