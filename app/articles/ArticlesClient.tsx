"use client";

import { motion } from "motion/react";
import { Calendar, Search, ChevronDown, Tag } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui-custom/layout/collapsible";
import { useTheme, getThemeClasses } from "../contexts/ThemeContext";
import type { Article } from "@/lib/types";

interface ArticlesClientProps {
  articles: Article[];
}

export default function ArticlesClient({ articles }: ArticlesClientProps) {
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["all"]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    articles.forEach((article) =>
      article.tag?.forEach((tag) => tagSet.add(tag)),
    );
    return Array.from(tagSet).sort();
  }, [articles]);

  // Handle tag selection
  const toggleTag = (tag: string) => {
    if (tag === "all") {
      setSelectedTags(["all"]);
    } else {
      setSelectedTags((prev) => {
        const filtered = prev.filter((t) => t !== "all");
        if (filtered.includes(tag)) {
          const result = filtered.filter((t) => t !== tag);
          return result.length === 0 ? ["all"] : result;
        } else {
          return [...filtered, tag];
        }
      });
    }
  };

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Tag filter
      if (!selectedTags.includes("all")) {
        if (!article.tag?.some((tag) => selectedTags.includes(tag)))
          return false;
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          article.title.toLowerCase().includes(query) ||
          article.tag?.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [articles, searchQuery, selectedTags]);

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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-center space-y-4 pb-6 border-b ${theme.border} relative`}
      >
        <div
          className={`absolute -top-2 left-1/2 -translate-x-1/2 px-4 py-1 ${theme.btnActive} text-xs`}
        >
          ★ ARTICLES ★
        </div>
        <h1 className={`text-3xl md:text-5xl ${theme.text} pt-4`}>
          {">"} ARTICLES
        </h1>
        <p className={`text-sm ${theme.textMuted}`}>
          Event Reports & Blog Posts
        </p>
        <div className={`text-sm ${theme.textFaded}`}>
          Total: {articles.length} | Showing: {filteredArticles.length}
        </div>
      </motion.div>

      {/* Compact Search & Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`space-y-3 p-3 ${theme.bgCard} border ${theme.borderSecondary}`}
      >
        {/* Search Box */}
        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textFaded}`}
          />
          <input
            type="text"
            placeholder="Search articles..."
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

        {/* Tag Filter - Collapsible on mobile */}
        <Collapsible defaultOpen={false} className="md:open">
          <CollapsibleTrigger
            className={`w-full md:hidden flex items-center justify-between pt-2 border-t ${theme.borderDivider} text-xs ${theme.textMuted} hover:${theme.text} transition-colors`}
          >
            <span>
              FILTER BY TAGS (
              {selectedTags.includes("all") ? "ALL" : selectedTags.length})
            </span>
            <ChevronDown className="w-4 h-4" />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div
              className={`flex flex-wrap gap-2 pt-2 md:border-t md:${theme.borderDivider}`}
            >
              <button
                onClick={() => toggleTag("all")}
                className={`px-2 py-1 border text-xs transition-all ${
                  selectedTags.includes("all")
                    ? theme.btnActive
                    : theme.btnInactive
                }`}
              >
                ALL
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-2 py-1 border text-xs transition-all ${
                    selectedTags.includes(tag)
                      ? theme.btnActive
                      : theme.btnInactive
                  }`}
                >
                  {tag}
                </button>
              ))}
              <span
                className={`ml-auto text-xs ${theme.textFaded} self-center`}
              >
                {filteredArticles.length}/{articles.length}
              </span>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </motion.div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Link href={`/articles/${article.id}`}>
                <div
                  className={`group ${theme.bgCard} border ${theme.borderSecondary} hover:shadow-lg transition-all overflow-hidden cursor-pointer`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 bg-gray-900">
                    <img
                      src={article.mainImage.url}
                      alt={article.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    />
                    <div
                      className={`absolute top-2 right-2 px-3 py-1 ${theme.bgInput} border ${theme.border} ${theme.text} text-xs flex items-center gap-1`}
                    >
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <h2
                      className={`text-xl ${theme.text} group-hover:opacity-80 transition-opacity line-clamp-2`}
                    >
                      {article.title}
                    </h2>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {article.tag?.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 ${
                            theme.bgInput
                          } border text-xs flex items-center gap-1 ${
                            selectedTags.includes(tag)
                              ? `${theme.border} ${theme.text}`
                              : `${theme.borderFaded} ${theme.textMuted}`
                          }`}
                        >
                          <Tag className="w-3 h-3" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <div className="pt-2">
                      <span
                        className={`inline-flex items-center gap-2 ${theme.text} group-hover:opacity-80 transition-opacity text-sm`}
                      >
                        <span>READ MORE</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      ) : (
        <div
          className={`text-center py-12 ${theme.bgCard} border ${theme.borderSecondary}`}
        >
          <div className={`text-6xl mb-4 ${theme.textFaded}`}>◇</div>
          <div className={`text-xl ${theme.textMuted}`}>
            No matching articles found
          </div>
          <button
            onClick={() => {
              setSearchQuery("");
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
