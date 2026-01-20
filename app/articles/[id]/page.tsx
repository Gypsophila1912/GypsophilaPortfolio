import { getArticleDetail } from "@/lib/api/articles";
import { notFound } from "next/navigation";
import ArticleDetail from "./ArticleDetailClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ArticleDetailPage({ params }: PageProps) {
  const { id } = await params;

  const article = await getArticleDetail(id);

  if (!article) {
    notFound();
  }

  return <ArticleDetail article={article} />;
}

// メタデータ設定
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  const article = await getArticleDetail(id);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | ぎぷそのポートフォリオ`,
    description: article.htmlContent.replace(/<[^>]*>/g, "").substring(0, 150),
    openGraph: {
      images: [article.mainImage.url],
    },
  };
}
