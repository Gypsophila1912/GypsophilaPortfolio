import { motion } from "motion/react";
import {
  Search,
  ExternalLink,
  Github,
  ChevronDown,
  Code,
  Palette,
} from "lucide-react";
import { useState, useMemo } from "react";
import { ScreenType } from "../GameLayout";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui-custom/layout/collapsible";
import { useTheme, getThemeClasses } from "../../contexts/ThemeContext";

interface WorksProps {
  onNavigate: (screen: ScreenType) => void;
}

export function Works({ onNavigate }: WorksProps) {
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["all"]);
  const [typeFilter, setTypeFilter] = useState<
    "all" | "development" | "illustration"
  >("all");

  const works = [
    {
      id: 1,
      title: "E-Commerce Platform",
      type: "development" as const,
      tags: ["React", "Node.js", "PostgreSQL"],
      description: "Full-stack e-commerce platform with payment integration",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      year: "2024",
      rarity: "legendary" as const,
      links: { demo: "#", github: "#" },
    },
    {
      id: 2,
      title: "Character Design Series",
      type: "illustration" as const,
      tags: ["Clip Studio Paint", "Photoshop"],
      description: "Original character designs for a fantasy game concept",
      image:
        "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800&h=600&fit=crop",
      year: "2023",
      rarity: "epic" as const,
      links: {},
    },
    {
      id: 3,
      title: "Portfolio Generator",
      type: "development" as const,
      tags: ["Next.js", "TypeScript", "Tailwind"],
      description:
        "Tool to create customizable portfolio websites with templates",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      year: "2022",
      rarity: "rare" as const,
      links: { demo: "#", github: "#" },
    },
    {
      id: 4,
      title: "Fan Art Collection",
      type: "illustration" as const,
      tags: ["Procreate", "Digital Painting"],
      description:
        "Digital illustrations of favorite anime and game characters",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
      year: "2021",
      rarity: "epic" as const,
      links: {},
    },
    {
      id: 5,
      title: "Task Management App",
      type: "development" as const,
      tags: ["React", "Firebase", "Material-UI"],
      description: "Productivity app with team collaboration features",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
      year: "2020",
      rarity: "rare" as const,
      links: { demo: "#" },
    },
    {
      id: 6,
      title: "Landscape Artwork",
      type: "illustration" as const,
      tags: ["Digital Painting", "Photoshop"],
      description: "Fantasy landscape illustrations with vibrant colors",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop",
      year: "2019",
      rarity: "rare" as const,
      links: {},
    },
    {
      id: 7,
      title: "Social Media Dashboard",
      type: "development" as const,
      tags: ["Vue.js", "Express", "MongoDB"],
      description:
        "Analytics dashboard for managing multiple social media accounts",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      year: "2024",
      rarity: "epic" as const,
      links: { demo: "#", github: "#" },
    },
    {
      id: 8,
      title: "Pixel Art Game Assets",
      type: "illustration" as const,
      tags: ["Aseprite", "Pixel Art"],
      description:
        "Complete set of pixel art assets for a retro-style platformer game",
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
      year: "2023",
      rarity: "rare" as const,
      links: {},
    },
    {
      id: 9,
      title: "Weather Forecast App",
      type: "development" as const,
      tags: ["React Native", "API", "Redux"],
      description:
        "Cross-platform mobile app with real-time weather data and forecasts",
      image:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
      year: "2022",
      rarity: "rare" as const,
      links: { demo: "#" },
    },
    {
      id: 10,
      title: "Logo Design Collection",
      type: "illustration" as const,
      tags: ["Illustrator", "Branding"],
      description:
        "Collection of logo designs for various clients and personal projects",
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
      year: "2021",
      rarity: "epic" as const,
      links: {},
    },
  ];

  // CMSからとってきたタグを表示する
  const allTags = Array.from(
    new Set(works.flatMap((work) => work.tags))
  ).sort();

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

  // Filter works
  const filteredWorks = works.filter((work) => {
    // Type filter
    if (typeFilter !== "all" && work.type !== typeFilter) return false;

    // Tag filter - any of selected tags
    if (!selectedTags.includes("all")) {
      if (!work.tags.some((t) => selectedTags.includes(t))) return false;
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        work.title.toLowerCase().includes(query) ||
        work.description.toLowerCase().includes(query) ||
        work.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    return true;
  });

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
          Total: {works.length} | Showing: {filteredWorks.length}
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

        {/* Tag/Tool Filter - Collapsible on mobile */}
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
                {filteredWorks.length}/{works.length}
              </span>
            </div>
          </CollapsibleContent>
        </Collapsible>
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
                onClick={() => onNavigate("work-detail")}
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
                onClick={() => onNavigate("work-detail")}
                className="p-4 space-y-3 cursor-pointer"
              >
                <h3
                  className={`text-xl ${theme.text} group-hover:opacity-80 transition-opacity`}
                >
                  {work.title}
                </h3>
                <p className={`${theme.textSecondary} text-sm leading-relaxed`}>
                  {work.description}
                </p>

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
                {Object.keys(work.links).length > 0 && (
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
