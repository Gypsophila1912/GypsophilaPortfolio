import { getWork } from "@/lib/api/works";
import { notFound } from "next/navigation";
import WorkDetail from "./WorkDetailClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function WorkDetailPage({ params }: PageProps) {
  const { id } = await params;

  const work = await getWork(id);

  if (!work) {
    notFound();
  }

  return <WorkDetail work={work} />;
}

// メタデータ設定
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  const work = await getWork(id);

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
