"use client";

import { motion } from "motion/react";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { useTheme, getThemeClasses } from "../../contexts/ThemeContext";
import type { Article } from "@/lib/types";

interface ArticleDetailClientProps {
  article: Article;
}

export default function ArticleDetailClient({
  article,
}: ArticleDetailClientProps) {
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="space-y-8">
      {/* 戻るボタン - 左からスライドインアニメーション */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          href="/articles"
          className={`flex items-center gap-2 ${theme.text} hover:opacity-80 transition-opacity`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>一覧に戻る</span>
        </Link>
      </motion.div>

      {/* 記事ヘッダーセクション - 下からフェードインアニメーション */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        {/* アイキャッチ画像 */}
        <div
          className={`relative overflow-hidden border ${theme.borderSecondary}`}
        >
          <img
            src={article.mainImage.url}
            alt={article.title}
            className="w-full h-32 md:h-56 object-cover"
          />
          {/* 記事ラベル - 左上 */}
          <div
            className={`absolute top-2 left-2 md:top-4 md:left-4 px-2 py-1 md:px-3 ${theme.bgInput} border ${theme.border} ${theme.text} text-xs`}
          >
            FEATURED ARTICLE
          </div>
        </div>

        {/* タイトルとメタ情報エリア */}
        <div
          className={`${theme.bgCard} border ${theme.borderSecondary} p-2 md:p-8 space-y-2 md:space-y-4`}
        >
          {/* タグリスト */}
          <div className="flex flex-wrap gap-1 md:gap-2">
            {article.tag?.map((tag) => (
              <span
                key={tag}
                className={`px-1.5 py-0.5 md:px-3 md:py-1 ${theme.bgInput} border ${theme.borderFaded} ${theme.text} text-xs`}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 記事タイトル */}
          <h1
            className={`text-lg md:text-5xl ${theme.text} py-1 md:py-4 border-l-2 md:border-l-4 ${theme.border} pl-2 md:pl-4`}
          >
            {">"} {article.title}
          </h1>

          {/* メタ情報（日付） */}
          <div
            className={`flex flex-wrap items-center gap-2 md:gap-6 text-xs md:text-sm ${theme.textMuted} border-t ${theme.borderDivider} pt-1.5 md:pt-4`}
          >
            <div className="flex items-center gap-1 md:gap-2">
              <Calendar className="w-2.5 h-2.5 md:w-4 md:h-4" />
              <span>{formatDate(article.date)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 記事本文 - フェードインアニメーション */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* 記事本文 - MicroCMSからのHTMLを表示（羊皮紙風のベージュ背景） */}
        <div
          className="bg-amber-50 text-gray-900 border border-amber-200 p-6 md:p-10 prose prose-lg max-w-none
          prose-headings:text-amber-900 
          prose-h2:text-3xl prose-h2:pb-2 prose-h2:border-b-2 
          prose-h3:text-xl prose-h3:mt-6
          prose-p:leading-relaxed
          prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-2 prose-ul:ml-4
          prose-li:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.htmlContent }}
        />
      </motion.div>

      {/* スクリーンショット（任意項目） */}
      {article.screenshot && article.screenshot.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className={`text-2xl ${theme.text} flex items-center gap-2`}>
            <span className={`inline-block w-3 h-3 ${theme.bgButton}`} />
            <span>SCREENSHOTS</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {article.screenshot.map((screenshot, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden border ${theme.borderSecondary} ${theme.bgCard} ${theme.borderHover} transition-all cursor-pointer`}
              >
                <img
                  src={screenshot.url}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
