"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ExternalLink, FileText, Mail } from "lucide-react";
import { useTheme, getThemeClasses } from "./contexts/ThemeContext";
import type { Article, Work } from "@/lib/types";

interface HomeContentProps {
  latestWorks: Work[];
  latestArticles: Article[];
}

export default function Home({
  latestWorks,
  latestArticles,
}: HomeContentProps) {
  const router = useRouter();
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const quickLinks = [
    {
      id: 1,
      label: "作品一覧",
      icon: ExternalLink,
      action: () => handleNavigate("/works"),
      color: "green",
    },
    {
      id: 2,
      label: "GitHub",
      icon: ExternalLink,
      href: "https://github.com/Gypsophila1912",
      color: "blue",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: "border-green-600 bg-green-600/10 hover:bg-green-600/20",
      blue: "border-blue-600 bg-blue-600/10 hover:bg-blue-600/20",
      purple: "border-purple-600 bg-purple-600/10 hover:bg-purple-600/20",
      cyan: "border-cyan-600 bg-cyan-600/10 hover:bg-cyan-600/20",
    };
    return colors[color as keyof typeof colors] || "";
  };

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Hero Section with Quest Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Quest Corner Decorations - Desktop only */}
        <div
          className={`hidden md:block absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 ${theme.border}`}
        />
        <div
          className={`hidden md:block absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 ${theme.border}`}
        />
        <div
          className={`hidden md:block absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 ${theme.border}`}
        />
        <div
          className={`hidden md:block absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 ${theme.border}`}
        />

        <div className="text-center space-y-4 md:space-y-6 py-6 md:py-8 px-2 md:px-4">
          <div
            className={`inline-block px-3 md:px-4 py-1 md:py-2 ${theme.bgButton} ${theme.textButton} border-2 ${theme.border}`}
          >
            <span className="text-xs md:text-sm">★ 自己紹介 ★</span>
          </div>

          {/* Profile Section with Icon and Name */}
          <div className="flex items-center justify-center gap-4 md:gap-6">
            {/* Profile Icon with RPG Frame */}
            <div className="relative flex-shrink-0">
              {/* Corner Decorations */}
              <div
                className={`absolute -top-1 -left-1 w-3 md:w-4 h-3 md:h-4 border-t-2 border-l-2 ${theme.border}`}
              />
              <div
                className={`absolute -top-1 -right-1 w-3 md:w-4 h-3 md:h-4 border-t-2 border-r-2 ${theme.border}`}
              />
              <div
                className={`absolute -bottom-1 -left-1 w-3 md:w-4 h-3 md:h-4 border-b-2 border-l-2 ${theme.border}`}
              />
              <div
                className={`absolute -bottom-1 -right-1 w-3 md:w-4 h-3 md:h-4 border-b-2 border-r-2 ${theme.border}`}
              />

              {/* Profile Image */}
              <div
                className={`w-24 md:w-32 h-24 md:h-32 border-4 ${theme.border} ${theme.bgCard} overflow-hidden`}
              >
                <img
                  src="/images/icon.png"
                  alt="Profile Icon"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name and Title */}
            <div className="text-left space-y-2 md:space-y-3">
              <h1 className={`text-2xl md:text-6xl ${theme.text} font-mono`}>
                {">"} ぎぷそ-gypsophila
              </h1>
              <div className={`text-sm md:text-2xl ${theme.textSecondary}`}>
                Developer × Illustrator
              </div>
            </div>
          </div>

          <div
            className={`max-w-2xl mx-auto space-y-3 md:space-y-4 ${theme.textSecondary}`}
          >
            <p className={theme.textSecondary}>
              ▸ ようこそ！私のポートフォリオへ！
            </p>
            <p className={`text-sm ${theme.textMuted}`}>
              ▸福岡工業大学情報工学科２年のぎぷそです。情報技術研究部(じょぎ)に所属しています。28卒としてエンジニア目指して、ハッカソンに出場したり個人開発を通して勉強しています！主にバックエンドに興味があります。趣味はゲーム実況をみることです。よろしくお願いします！
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Access Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className={`p-4 md:p-6 ${theme.bgCard} border-2 ${theme.border}`}
      >
        <div className="space-y-3 md:space-y-4">
          <div className="text-center">
            <h2
              className={`text-lg md:text-xl ${theme.text} flex items-center justify-center gap-2`}
            >
              <span className={`inline-block w-2 h-2 ${theme.bgButton}`} />
              <span>クイックアクセス</span>
              <span className={`inline-block w-2 h-2 ${theme.bgButton}`} />
            </h2>
            <p className={`text-xs md:text-sm ${theme.textMuted} mt-1 md:mt-2`}>
              Fast navigation
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {quickLinks.map((link) =>
              link.action ? (
                <button
                  key={link.id}
                  onClick={link.action}
                  className={`group p-3 md:p-4 ${theme.bgContrast} border-2 ${
                    theme.border
                  } ${
                    theme.borderHover
                  } transition-all text-center ${getColorClasses(link.color)}`}
                >
                  <link.icon
                    className={`w-5 md:w-6 h-5 md:h-6 mx-auto mb-1 md:mb-2 ${theme.text}`}
                  />
                  <div className={`text-xs md:text-sm ${theme.text}`}>
                    {link.label}
                  </div>
                </button>
              ) : (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`group p-3 md:p-4 ${theme.bgContrast} border-2 ${
                    theme.border
                  } ${
                    theme.borderHover
                  } transition-all text-center ${getColorClasses(link.color)}`}
                >
                  <link.icon
                    className={`w-5 md:w-6 h-5 md:h-6 mx-auto mb-1 md:mb-2 ${theme.text}`}
                  />
                  <div className={`text-xs md:text-sm ${theme.text}`}>
                    {link.label}
                  </div>
                </a>
              )
            )}
          </div>
        </div>
      </motion.div>

      {/* Latest Works */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 md:space-y-6"
      >
        <div
          className={`flex justify-between items-center border-b ${theme.border} pb-2 md:pb-3`}
        >
          <div>
            <h2
              className={`text-lg md:text-2xl ${theme.text} flex items-center gap-2`}
            >
              <span
                className={`inline-block w-2 md:w-3 h-2 md:h-3 ${theme.bgButton} animate-pulse`}
              />
              <span>最新の作品</span>
            </h2>
            <p className={`text-xs md:text-sm ${theme.textMuted} mt-1`}>
              Projects & Artworks
            </p>
          </div>
          <button
            onClick={() => handleNavigate("/works")}
            className={`text-xs md:text-sm ${theme.textMuted} cursor-pointer hover:${theme.text} transition-colors`}
          >
            一覧へ →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
          {latestWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => handleNavigate(`/works/${work.id}`)}
              className="group cursor-pointer relative"
            >
              {/* Quest Item Frame - Desktop only */}
              <div
                className={`hidden md:block absolute -top-1 -left-1 w-3 h-3 border-t border-l ${theme.border} group-hover:${theme.border} transition-colors`}
              />
              <div
                className={`hidden md:block absolute -top-1 -right-1 w-3 h-3 border-t border-r ${theme.border} group-hover:${theme.border} transition-colors`}
              />
              <div
                className={`hidden md:block absolute -bottom-1 -left-1 w-3 h-3 border-b border-l ${theme.border} group-hover:${theme.border} transition-colors`}
              />
              <div
                className={`hidden md:block absolute -bottom-1 -right-1 w-3 h-3 border-b border-r ${theme.border} group-hover:${theme.border} transition-colors`}
              />

              <div
                className={`relative overflow-hidden border md:border-2 ${theme.border} ${theme.bgCard} ${theme.borderHover} transition-all`}
              >
                <img
                  src={work.mainImage.url}
                  alt={work.title}
                  className="w-full h-40 md:h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <div
                  className={`absolute top-2 right-2 px-2 py-1 ${theme.bgContrast} border ${theme.border} ${theme.text} text-xs`}
                >
                  {work.type}
                </div>
                <div
                  className={`p-2 md:p-3 ${theme.bgContrast} border-t ${theme.border}`}
                >
                  <div className={`${theme.text} text-sm truncate`}>
                    {work.title}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Latest Articles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 md:space-y-6"
      >
        <div
          className={`flex justify-between items-center border-b ${theme.border} pb-2 md:pb-3`}
        >
          <div>
            <h2
              className={`text-lg md:text-2xl ${theme.text} flex items-center gap-2`}
            >
              <span
                className={`inline-block w-2 md:w-3 h-2 md:h-3 ${theme.bgButton} animate-pulse`}
              />
              <span>最近の記事</span>
            </h2>
            <p className={`text-xs md:text-sm ${theme.textMuted} mt-1`}>
              Event Reports & Blog Posts
            </p>
          </div>
          <button
            onClick={() => handleNavigate("/articles")}
            className={`text-xs md:text-sm ${theme.textMuted} cursor-pointer hover:${theme.text} transition-colors`}
          >
            一覧へ →
          </button>
        </div>

        <div className="space-y-2 md:space-y-3">
          {latestArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onClick={() => handleNavigate(`/articles/${article.id}`)}
              className={`group cursor-pointer p-3 md:p-4 ${theme.bgCard} border ${theme.border} ${theme.borderHover} ${theme.bgCardHover} transition-all relative`}
            >
              {/* Quest Complete Marker */}
              <div
                className={`absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 ${theme.bgButton} rotate-45`}
              />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3">
                <div className="flex-1">
                  <h3 className={`${theme.text} text-sm md:text-base mb-2`}>
                    ▸ {article.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {article.tag.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 md:py-1 ${theme.bgContrast} border ${theme.border} ${theme.textMuted} text-xs`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className={`${theme.textMuted} text-xs md:text-sm md:text-right`}
                >
                  {article.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
