import { getWork } from "@/lib/api/works";
import { notFound } from "next/navigation";
import WorkDetail from "./WorkDetailClient";

export default async function WorkDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const work = await getWork(params.id);

  if (!work) {
    notFound();
  }

  return <WorkDetail work={work} />;
}

// メタデータ設定
export async function generateMetadata({ params }: { params: { id: string } }) {
  const work = await getWork(params.id);

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
