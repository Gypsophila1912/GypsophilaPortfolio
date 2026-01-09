"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Search,
  ExternalLink,
  Github,
  ChevronDown,
  Code,
  Palette,
  FileText,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useTheme, getThemeClasses } from "../contexts/ThemeContext";
import type { Work } from "@/lib/types";

interface WorkContentProps {
  works: Work[];
}

// Work型をフロントエンド用に変換する型
interface DisplayWork {
  id: string;
  title: string;
  type: "development" | "illustration";
  image: string;
  tags: string[];
  rarity: "legendary" | "epic" | "rare";
  links: {
    demo?: string;
    github?: string;
    topaz?: string;
  };
}

export default function WorksClient({ works }: WorkContentProps) {
  const router = useRouter();
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["all"]);
  const [typeFilter, setTypeFilter] = useState<
    "all" | "development" | "illustration"
  >("all");

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  // microCMSのデータをフロントエンド用に変換
  const displayWorks: DisplayWork[] = useMemo(() => {
    return works.map((work) => ({
      id: work.id,
      title: work.title,
      type: work.type ? "development" : "illustration",
      image: work.mainImage.url,
      tags: work.tag, // tagとtechstackを統合
      rarity: "rare" as const, // デフォルトでrare。必要に応じてロジックを追加
      links: {
        demo: work.demourl,
        github: work.githuburl,
        topaz: work.topazurl,
      },
    }));
  }, [works]);

  // Filter works
  const filteredWorks = useMemo(() => {
    return displayWorks.filter((work) => {
      // Type filter
      if (typeFilter !== "all" && work.type !== typeFilter) return false;

      // Tag filter
      if (!selectedTags.includes("all")) {
        if (!work.tags.some((t) => selectedTags.includes(t))) return false;
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          work.title.toLowerCase().includes(query) ||
          work.tags.some((t) => t.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [displayWorks, typeFilter, selectedTags, searchQuery]);

  const rarityColors = {
    legendary: "border-yellow-600 md:shadow-yellow-500/20",
    epic: "border-purple-600 md:shadow-purple-500/20",
    rare: "border-blue-600 md:shadow-blue-500/20",
  };

  return (
    <div className="space-y-8">
      {/* Header with Quest Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-center space-y-4 pb-6 border-b ${theme.border} relative`}
      >
        <div
          className={`absolute -top-2 left-1/2 -translate-x-1/2 px-4 py-1 ${theme.btnActive} text-xs`}
        >
          ★ WORKS ★
        </div>
        <h1 className={`text-3xl md:text-5xl ${theme.text} pt-4`}>
          {">"} PROJECTS & ARTWORKS
        </h1>
        <p className={`text-sm ${theme.textMuted}`}>
          Development projects and digital illustrations
        </p>
        <div className={`text-sm ${theme.textFaded}`}>
          Total: {displayWorks.length} | Showing: {filteredWorks.length}
        </div>
      </motion.div>

      {/* Compact Search & Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`space-y-3 p-3 ${theme.bgCard} border ${theme.borderSecondary}`}
      >
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textFaded}`}
            />
            <input
              type="text"
              placeholder="Search works..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-8 py-2 ${theme.bgInput} border ${theme.borderSecondary} ${theme.textNormal} placeholder-gray-500 focus:${theme.border} focus:outline-none font-mono text-sm`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute right-2 top-1/2 -translate-y-1/2 ${theme.textFaded} hover:${theme.text} text-xs`}
              >
                ✕
              </button>
            )}
          </div>

          {/* Type Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setTypeFilter("all")}
              className={`px-3 py-2 border text-xs transition-all ${
                typeFilter === "all" ? theme.btnActive : theme.btnInactive
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setTypeFilter("development")}
              className={`px-3 py-2 border text-xs transition-all flex items-center gap-1 ${
                typeFilter === "development"
                  ? `${theme.bgBlue} text-white ${theme.borderBlue}`
                  : `${theme.bgInput} ${theme.textMuted} ${theme.borderBlue} hover:bg-blue-50 hover:${theme.accentBlue}`
              }`}
            >
              <Code className="w-3 h-3" />
              <span>DEV</span>
            </button>
            <button
              onClick={() => setTypeFilter("illustration")}
              className={`px-3 py-2 border text-xs transition-all flex items-center gap-1 ${
                typeFilter === "illustration"
                  ? `${theme.bgPurple} text-white ${theme.borderPurple}`
                  : `${theme.bgInput} ${theme.textMuted} ${theme.borderPurple} hover:bg-purple-50 hover:${theme.accentPurple}`
              }`}
            >
              <Palette className="w-3 h-3" />
              <span>ART</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Works Grid */}
      {filteredWorks.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`group ${theme.bgCard} border ${
                rarityColors[work.rarity]
              } hover:shadow-lg transition-all overflow-hidden relative`}
            >
              {/* Rarity Corner Decoration - Hidden on mobile */}
              <div className="hidden md:block absolute top-0 left-0 w-0 h-0 border-t-[30px] border-l-[30px] border-t-yellow-400 border-l-transparent z-10" />
              <div className="hidden md:block absolute top-1 left-1 text-black text-xs z-20">
                ★
              </div>

              {/* Image Container with hover effect */}
              <div
                className="relative overflow-hidden h-48 bg-gray-900 cursor-pointer"
                onClick={() => handleNavigate(`/works/${work.id}`)}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
                <div
                  className={`absolute top-2 right-2 px-3 py-1 ${theme.bgInput} border ${theme.border} ${theme.text} text-xs flex items-center gap-1`}
                >
                  {work.type === "development" ? (
                    <>
                      <Code className="w-3 h-3" />
                      <span>DEV</span>
                    </>
                  ) : (
                    <>
                      <Palette className="w-3 h-3" />
                      <span>ART</span>
                    </>
                  )}
                </div>
              </div>

              {/* Content */}
              <div
                onClick={() => handleNavigate(`/works/${work.id}`)}
                className="p-4 space-y-3 cursor-pointer"
              >
                <h3
                  className={`text-xl ${theme.text} group-hover:opacity-80 transition-opacity`}
                >
                  {work.title}
                </h3>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 ${theme.bgInput} border text-xs ${
                        selectedTags.includes(tag)
                          ? `${theme.border} ${theme.text}`
                          : `${theme.borderFaded} ${theme.textMuted}`
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {(work.links.demo || work.links.github || work.links.topaz) && (
                  <div className="flex gap-2 pt-2">
                    {work.links.demo && (
                      <a
                        href={work.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`flex-1 px-4 py-2 ${theme.bgInput} border ${theme.borderSecondary} ${theme.text} hover:${theme.btnActive} transition-all text-center text-sm flex items-center justify-center gap-2`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>DEMO</span>
                      </a>
                    )}
                    {work.links.github && (
                      <a
                        href={work.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`flex-1 px-4 py-2 ${theme.bgInput} border ${theme.borderSecondary} ${theme.text} hover:${theme.btnActive} transition-all text-center text-sm flex items-center justify-center gap-2`}
                      >
                        <Github className="w-4 h-4" />
                        <span>GITHUB</span>
                      </a>
                    )}
                    {work.links.topaz && (
                      <a
                        href={work.links.topaz}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`flex-1 px-4 py-2 ${theme.bgInput} border ${theme.borderSecondary} ${theme.text} hover:${theme.btnActive} transition-all text-center text-sm flex items-center justify-center gap-2`}
                      >
                        <FileText className="w-4 h-4" />
                        <span>TOPAZ</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div
          className={`text-center py-12 ${theme.bgCard} border ${theme.borderSecondary}`}
        >
          <div className={`text-6xl mb-4 ${theme.textFaded}`}>◇</div>
          <div className={`text-xl ${theme.textMuted}`}>
            No matching works found
          </div>
          <button
            onClick={() => {
              setSearchQuery("");
              setTypeFilter("all");
              setSelectedTags(["all"]);
            }}
            className={`mt-4 px-6 py-2 border ${theme.btnActive} transition-all`}
          >
            CLEAR FILTERS
          </button>
        </div>
      )}
    </div>
  );
}
