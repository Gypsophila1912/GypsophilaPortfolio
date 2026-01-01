import { motion } from "motion/react";
import { Calendar, Clock, Search, ChevronDown, Tag } from "lucide-react";
import { useState, useMemo } from "react";
import { ScreenType } from "../GameLayout";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui-custom/layout/collapsible";
import { useTheme, getThemeClasses } from "../../contexts/ThemeContext";

interface ArticlesProps {
  onNavigate: (screen: ScreenType) => void;
}

export function Articles({ onNavigate }: ArticlesProps) {
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["all"]);

  const articles = [
    {
      id: 1,
      title: "Tech Conference 2024 - Day 1 Report",
      date: "2024-03-15",
      readTime: "5 min",
      excerpt:
        "Attended the biggest tech conference of the year. Here are my key takeaways from the first day of amazing talks and workshops.",
      tags: ["Event", "Tech", "Conference"],
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Game Jam 2024: Creating a Game in 48 Hours",
      date: "2024-03-10",
      readTime: "8 min",
      excerpt:
        "Participated in Global Game Jam with a team of 4. We created a puzzle platformer with unique mechanics. This is our journey.",
      tags: ["Event", "Game", "Dev"],
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Comic Market Winter 2024 Experience",
      date: "2024-02-20",
      readTime: "6 min",
      excerpt:
        "First time exhibiting at Comiket! Sold my original character art books and prints. Here's what I learned.",
      tags: ["Event", "Art", "Illustration"],
      image:
        "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=800&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Hackathon Victory: Building an AI-Powered Tool",
      date: "2024-02-15",
      readTime: "7 min",
      excerpt:
        "Our team won first place at the university hackathon! We built an AI tool that helps developers write better documentation.",
      tags: ["Event", "Hackathon", "AI"],
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
    },
    {
      id: 5,
      title: "React Conference 2024: The Future of React",
      date: "2024-01-25",
      readTime: "10 min",
      excerpt:
        "Attended React Conf and learned about the upcoming features. Server Components, Suspense improvements, and more!",
      tags: ["Event", "Tech", "React"],
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    },
    {
      id: 6,
      title: "Digital Art Workshop: Advanced Coloring Techniques",
      date: "2024-01-10",
      readTime: "5 min",
      excerpt:
        "Learned professional coloring techniques from industry artists. Tips on lighting, color theory, and workflow optimization.",
      tags: ["Workshop", "Art", "Tutorial"],
      image:
        "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=400&fit=crop",
    },
    {
      id: 7,
      title: "Web Development Meetup: Best Practices 2024",
      date: "2023-12-20",
      readTime: "6 min",
      excerpt:
        "Monthly meetup discussing modern web development practices, performance optimization, and new framework releases.",
      tags: ["Event", "Tech", "Web"],
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    },
    {
      id: 8,
      title: "Design Systems Workshop Report",
      date: "2023-12-10",
      readTime: "8 min",
      excerpt:
        "Attended a workshop on building scalable design systems. Learned about component libraries, design tokens, and documentation.",
      tags: ["Workshop", "Design", "UI"],
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    },
    {
      id: 9,
      title: "AI Art Exhibition 2023: The Future of Creativity",
      date: "2023-11-28",
      readTime: "7 min",
      excerpt:
        "Visited an exhibition showcasing AI-generated art. Discussed the implications for traditional artists and new opportunities.",
      tags: ["Event", "Art", "AI"],
      image:
        "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=400&fit=crop",
    },
    {
      id: 10,
      title: "Open Source Summit 2023 Highlights",
      date: "2023-11-15",
      readTime: "9 min",
      excerpt:
        "The annual open source summit brought together developers worldwide. Key takeaways from talks about community building and sustainability.",
      tags: ["Event", "Tech", "OpenSource"],
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop",
    },
    {
      id: 11,
      title: "Character Design Bootcamp Experience",
      date: "2023-10-30",
      readTime: "6 min",
      excerpt:
        "Completed a 3-day intensive bootcamp on character design. Learned anatomy, expression, and storytelling through characters.",
      tags: ["Workshop", "Art", "Character"],
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop",
    },
    {
      id: 12,
      title: "Mobile App Dev Conference 2023",
      date: "2023-10-15",
      readTime: "8 min",
      excerpt:
        "Latest trends in mobile development including React Native improvements, Flutter updates, and cross-platform best practices.",
      tags: ["Event", "Tech", "Mobile"],
      image:
        "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop",
    },
  ];

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    articles.forEach((article) =>
      article.tags.forEach((tag) => tagSet.add(tag))
    );
    return Array.from(tagSet).sort();
  }, []);

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
      // Tag filter - any of selected tags
      if (!selectedTags.includes("all")) {
        if (!article.tags.some((tag) => selectedTags.includes(tag)))
          return false;
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [searchQuery, selectedTags]);

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
              className={`group ${theme.bgCard} border ${theme.borderSecondary} hover:shadow-lg transition-all overflow-hidden cursor-pointer`}
              onClick={() => onNavigate("article-detail")}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48 bg-gray-900">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
                <div
                  className={`absolute top-2 right-2 px-3 py-1 ${theme.bgInput} border ${theme.border} ${theme.text} text-xs flex items-center gap-1`}
                >
                  <Calendar className="w-3 h-3" />
                  <span>{article.date}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <h2
                  className={`text-xl ${theme.text} group-hover:opacity-80 transition-opacity line-clamp-2`}
                >
                  {article.title}
                </h2>

                <div
                  className={`flex items-center gap-2 text-sm ${theme.textFaded}`}
                >
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>

                <p
                  className={`${theme.textSecondary} text-sm leading-relaxed line-clamp-3`}
                >
                  {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {article.tags.map((tag) => (
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
