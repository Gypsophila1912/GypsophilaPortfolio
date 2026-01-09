"use client";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  ChevronDown,
  Calendar,
  Code,
  Users,
  Palette,
} from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui-custom/layout/collapsible";
import { useState, useMemo } from "react";
import { useTheme, getThemeClasses } from "../../contexts/ThemeContext";
import type { Work } from "@/lib/types";

interface WorkDetailClientProps {
  work: Work;
}

export default function WorkDetailClient({ work }: WorkDetailClientProps) {
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  const [isTechStackOpen, setIsTechStackOpen] = useState(false);

  // microCMSのデータをフロントエンド用に変換
  const displayWork = useMemo(() => {
    return {
      id: work.id,
      title: work.title,
      type: work.type ? "Development" : "Illustration",
      date: new Date(work.date).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      team: work.team ? "Team Project" : "Solo Project",
      category: work.category || [],
      tags: Array.from(
        new Set([...(work.tag || []), ...(work.techstack || [])])
      ),
      mainImage: work.mainImage.url,
      screenshots:
        work.screenshot?.map((img) => ({
          id: img.url,
          image: img.url,
          title: "Screenshot",
        })) || [],
      githubUrl: work.githuburl,
      demoUrl: work.demourl,
      topazUrl: work.topazurl,
      htmlContent: work.htmlContent,
    };
  }, [work]);

  // 技術スタックをカテゴリ別に整理
  const techStack = useMemo(() => {
    const stacks: { category: string; items: string[] }[] = [];

    if (work.techstack && work.techstack.length > 0) {
      stacks.push({
        category: "Tech Stack",
        items: work.techstack,
      });
    }

    if (work.tag && work.tag.length > 0) {
      stacks.push({
        category: "Tags",
        items: work.tag,
      });
    }

    return stacks;
  }, [work]);

  return (
    <div className="space-y-8">
      {/* 戻るボタン */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          href="/works"
          className={`flex items-center gap-2 ${theme.text} hover:opacity-80 transition-opacity`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO WORKS</span>
        </Link>
      </motion.div>

      {/* プロジェクトヘッダーセクション */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        {/* メイン画像 */}
        <div
          className={`relative overflow-hidden border ${theme.borderSecondary}`}
        >
          <img
            src={displayWork.mainImage}
            alt={displayWork.title}
            className="w-full h-32 md:h-56 object-cover"
          />
          {/* プロジェクトタイプラベル */}
          <div
            className={`absolute top-2 left-2 md:top-4 md:left-4 px-2 py-0.5 md:px-3 md:py-1 ${theme.bgInput} border ${theme.border} ${theme.text} text-xs`}
          >
            {displayWork.type === "Development" ? "💻 DEV" : "🎨 ILLUST"}
          </div>
          {/* 外部リンクボタン */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 flex gap-1 md:gap-2">
            {displayWork.githubUrl && (
              <a
                href={displayWork.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-2 py-1 md:px-3 bg-black/90 border ${theme.borderPurple} ${theme.accentPurple} hover:${theme.bgPurple} hover:text-white transition-all text-xs flex items-center gap-1`}
              >
                <Github className="w-3 h-3" />
                <span className="hidden md:inline">GitHub</span>
              </a>
            )}
            {displayWork.demoUrl && (
              <a
                href={displayWork.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-2 py-1 md:px-3 bg-black/90 border ${theme.borderBlue} ${theme.accentBlue} hover:${theme.bgBlue} hover:text-white transition-all text-xs flex items-center gap-1`}
              >
                <ExternalLink className="w-3 h-3" />
                <span className="hidden md:inline">Demo</span>
              </a>
            )}
            {displayWork.topazUrl && (
              <a
                href={displayWork.topazUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-2 py-1 md:px-3 bg-black/90 border ${theme.borderBlue} ${theme.accentBlue} hover:${theme.bgBlue} hover:text-white transition-all text-xs flex items-center gap-1`}
              >
                <Palette className="w-3 h-3" />
                <span className="hidden md:inline">Topaz</span>
              </a>
            )}
          </div>
        </div>

        {/* タイトルとメタ情報エリア */}
        <div
          className={`${theme.bgCard} border ${theme.borderSecondary} p-2 md:p-8 space-y-2 md:space-y-4`}
        >
          {/* カテゴリラベル */}
          {displayWork.category.length > 0 && (
            <div className="flex flex-wrap gap-1 md:gap-2">
              {displayWork.category.map((cat) => (
                <span
                  key={cat}
                  className={`px-1.5 py-0.5 md:px-3 md:py-1 ${theme.bgInput} border ${theme.borderBlue} ${theme.accentBlue} text-xs`}
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* プロジェクトタイトル */}
          <h1
            className={`text-lg md:text-5xl ${theme.text} py-1 md:py-4 border-l-2 md:border-l-4 ${theme.border} pl-2 md:pl-4`}
          >
            {">"} {displayWork.title}
          </h1>

          {/* プロジェクト情報グリッド */}
          <div
            className={`grid grid-cols-2 gap-1.5 md:gap-4 border-t ${theme.borderDivider} pt-1.5 md:pt-4`}
          >
            <div className="space-y-0.5">
              <div
                className={`text-xs ${theme.textFaded} flex items-center gap-1`}
              >
                <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" />
                <span className="text-[10px] md:text-xs">DATE</span>
              </div>
              <div className={`text-xs md:text-sm ${theme.textSecondary}`}>
                {displayWork.date}
              </div>
            </div>
            <div className="space-y-0.5">
              <div
                className={`text-xs ${theme.textFaded} flex items-center gap-1`}
              >
                <Users className="w-2.5 h-2.5 md:w-3 md:h-3" />
                <span className="text-[10px] md:text-xs">TEAM</span>
              </div>
              <div className={`text-xs md:text-sm ${theme.textSecondary}`}>
                {displayWork.team}
              </div>
            </div>
          </div>

          {/* 技術タグリスト */}
          {displayWork.tags.length > 0 && (
            <div
              className={`flex flex-wrap gap-1 md:gap-2 border-t ${theme.borderDivider} pt-1.5 md:pt-4`}
            >
              {displayWork.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-1.5 py-0.5 md:px-3 md:py-1 ${theme.bgInput} border ${theme.borderFaded} ${theme.text} text-xs`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* 技術スタックタブ - スマホ版 */}
      {techStack.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="lg:hidden"
        >
          <Collapsible open={isTechStackOpen} onOpenChange={setIsTechStackOpen}>
            <CollapsibleTrigger
              className={`w-full ${theme.bgCard} border ${theme.borderSecondary} flex items-center justify-between ${theme.borderHover} transition-colors`}
            >
              <div
                className={`border-b ${theme.borderSecondary} px-3 py-2 ${theme.bgInput} flex items-center gap-2 flex-1`}
              >
                <span className={`inline-block w-2 h-2 ${theme.bgButton}`} />
                <span className={`${theme.text} text-sm`}>TECH STACK</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 ${theme.text} transition-transform mr-3 ${
                  isTechStackOpen ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div
                className={`grid grid-cols-2 gap-3 p-3 ${theme.bgCard} border ${theme.borderSecondary} border-t-0`}
              >
                {techStack.map((stack) => (
                  <div key={stack.category} className="space-y-1.5">
                    <div
                      className={`text-xs ${theme.textFaded} border-b ${theme.borderDivider} pb-1`}
                    >
                      {stack.category}
                    </div>
                    <div className="space-y-0.5">
                      {stack.items.map((item) => (
                        <div
                          key={item}
                          className={`text-xs ${theme.textSecondary} pl-2 border-l-2 ${theme.borderFaded}`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </motion.div>
      )}

      {/* メインコンテンツグリッド */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* 本文エリア */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 space-y-8"
        >
          {/* プロジェクト説明 - MicroCMSからのHTML */}
          <div
            className="bg-amber-50 text-gray-900 border border-amber-200 p-6 md:p-10 prose prose-lg max-w-none
            prose-headings:text-amber-900 
            prose-h2:text-3xl prose-h2:pb-2 prose-h2:border-b-2 
            prose-h3:text-xl prose-h3:mt-6
            prose-p:leading-relaxed
            prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-2 prose-ul:ml-4
            prose-li:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: displayWork.htmlContent }}
          />

          {/* スクリーンショットギャラリー */}
          {displayWork.screenshots.length > 0 && (
            <div className="space-y-4">
              <h2 className={`text-2xl ${theme.text} flex items-center gap-2`}>
                <span className={`inline-block w-3 h-3 ${theme.bgButton}`} />
                <span>SCREENSHOTS</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayWork.screenshots.map((screenshot, index) => (
                  <div
                    key={screenshot.id}
                    className={`group relative overflow-hidden border ${theme.borderSecondary} ${theme.bgCard} ${theme.borderHover} transition-all cursor-pointer`}
                  >
                    <img
                      src={screenshot.image}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                    <div
                      className={`absolute bottom-0 left-0 right-0 p-2 ${theme.bgInput} border-t ${theme.border}`}
                    >
                      <div className={`${theme.text} text-xs`}>
                        Screenshot {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* サイドバーエリア - PC版 */}
        {techStack.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block lg:col-span-1 space-y-6"
          >
            <div
              className={`${theme.bgCard} border ${theme.borderSecondary} p-3`}
            >
              <h3
                className={`${theme.text} mb-3 flex items-center gap-2 text-sm`}
              >
                <span className={`inline-block w-2 h-2 ${theme.bgButton}`} />
                <span>TECH STACK</span>
              </h3>
              <div className="space-y-3">
                {techStack.map((stack) => (
                  <div key={stack.category} className="space-y-1.5">
                    <div className={`text-xs ${theme.textFaded}`}>
                      {stack.category}
                    </div>
                    <div className="space-y-1">
                      {stack.items.map((item) => (
                        <div
                          key={item}
                          className={`text-xs ${theme.textSecondary} pl-2 border-l-2 ${theme.borderFaded}`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
