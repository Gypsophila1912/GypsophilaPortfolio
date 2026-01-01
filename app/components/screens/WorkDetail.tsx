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
import { ScreenType } from "../GameLayout";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui-custom/layout/collapsible";
import { useState } from "react";
import { useTheme, getThemeClasses } from "../../contexts/ThemeContext";

interface WorkDetailProps {
  onNavigate: (screen: ScreenType) => void;
}

// MicroCMSから受け取る想定のデータ構造
export function WorkDetail({ onNavigate }: WorkDetailProps) {
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  const [isTechStackOpen, setIsTechStackOpen] = useState(false);

  // プロジェクトのメタデータ（MicroCMSから取得する想定）
  const work = {
    id: 1,
    title: "E-Commerce Platform",
    type: "Development",
    date: "2024-01-15",
    duration: "3 months",
    role: "Full-Stack Developer",
    team: "Solo Project",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    category: ["Web App", "E-Commerce"],
    mainImage:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=600&fit=crop",
    githubUrl: "https://github.com/username/project",
    demoUrl: "https://demo.example.com",
    // MicroCMSから受け取るHTML本文
    htmlContent: `
      <div class="space-y-4">
        <h2 class="text-3xl border-b-2 border-green-600 pb-2">
          Overview
        </h2>
        <p class="text-lg leading-relaxed">
          A full-featured e-commerce platform built with modern web technologies. This project 
          demonstrates my ability to create scalable, user-friendly applications with complex 
          functionality including user authentication, payment processing, and real-time inventory 
          management.
        </p>
        <p class="text-lg leading-relaxed">
          The platform was designed to handle high traffic and provide an excellent user experience 
          across all devices. It includes both customer-facing features and a comprehensive admin 
          dashboard for managing products, orders, and users.
        </p>
      </div>

      <div class="space-y-4 mt-6">
        <h2 class="text-3xl border-b-2 border-blue-500 pb-2">
          The Challenge
        </h2>
        <p class="leading-relaxed">
          The main challenge was creating a seamless shopping experience while maintaining security 
          and performance. Key technical challenges included:
        </p>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li>Implementing secure payment processing with Stripe</li>
          <li>Managing complex state across shopping cart and checkout flow</li>
          <li>Optimizing database queries for fast product searches</li>
          <li>Ensuring responsive design across mobile and desktop</li>
          <li>Implementing real-time inventory tracking</li>
          <li>Building an intuitive admin interface for non-technical users</li>
        </ul>
      </div>

      <div class="space-y-4 mt-6">
        <h2 class="text-3xl border-b-2 border-purple-500 pb-2">
          Technical Implementation
        </h2>
        <p class="leading-relaxed">
          I architected the application using React with TypeScript for type safety and better 
          developer experience. The backend was built with Node.js and Express, using PostgreSQL 
          for reliable data storage and Prisma ORM for type-safe database queries.
        </p>

        <h3 class="text-xl mt-6">
          Frontend Architecture
        </h3>
        <p class="leading-relaxed">
          The frontend uses React Context for global state management, with custom hooks for 
          reusable logic. I implemented code splitting and lazy loading to optimize bundle size 
          and initial load time. Tailwind CSS was used for rapid UI development with a consistent 
          design system.
        </p>

        <h3 class="text-xl mt-6">
          Backend & Database
        </h3>
        <p class="leading-relaxed">
          The backend follows RESTful API principles with proper error handling and validation. 
          Database relationships are carefully designed to support complex queries while maintaining 
          data integrity. I implemented database indexing for frequently queried fields to ensure 
          fast search performance.
        </p>

        <h3 class="text-xl mt-6">
          Security & Testing
        </h3>
        <p class="leading-relaxed">
          Security was a top priority. I implemented JWT-based authentication, input sanitization, 
          HTTPS enforcement, and rate limiting. All payment-related operations are handled securely 
          through Stripe's API. The application includes comprehensive unit tests and integration 
          tests using Jest and React Testing Library.
        </p>
      </div>

      <div class="space-y-4 bg-amber-100 border-l-4 border-green-600 p-6 mt-6">
        <h2 class="text-3xl">
          Results & Learnings
        </h2>
        <p class="leading-relaxed">
          This project significantly improved my full-stack development skills, particularly in 
          areas like state management, database design, and payment integration. The final product 
          received positive feedback for its clean UI and smooth user experience.
        </p>
        <p class="leading-relaxed">
          <strong>Key metrics:</strong>
        </p>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li>Page load time: &lt;2 seconds on 3G connection</li>
          <li>Lighthouse score: 95+ across all categories</li>
          <li>Zero critical security vulnerabilities</li>
          <li>Mobile-first design with 100% responsive coverage</li>
        </ul>
        <p class="leading-relaxed font-bold">
          Future improvements include implementing AI-powered product recommendations and adding 
          multi-language support for international markets.
        </p>
      </div>
    `,
  };

  // スクリーンショット画像リスト
  const screenshots = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      title: "Dashboard View",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      title: "Product Listing",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
      title: "Shopping Cart",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
      title: "Admin Panel",
    },
  ];

  // 技術スタック（カテゴリ別）
  const techStack = [
    {
      category: "Frontend",
      items: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "PostgreSQL", "Prisma ORM"],
    },
    { category: "Deployment", items: ["Vercel", "Railway", "GitHub Actions"] },
    { category: "Tools", items: ["Figma", "VS Code", "Postman", "Git"] },
  ];

  return (
    <div className="space-y-8">
      {/* 戻るボタン - 左からスライドインアニメーション */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <button
          onClick={() => onNavigate("works")}
          className={`flex items-center gap-2 ${theme.text} hover:opacity-80 transition-opacity`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO WORKS</span>
        </button>
      </motion.div>

      {/* プロジェクトヘッダーセクション - 下からフェードインアニメーション */}
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
            src={work.mainImage}
            alt={work.title}
            className="w-full h-32 md:h-56 object-cover"
          />
          {/* プロジェクトタイプラベル - 左上 */}
          <div
            className={`absolute top-2 left-2 md:top-4 md:left-4 px-2 py-0.5 md:px-3 md:py-1 ${theme.bgInput} border ${theme.border} ${theme.text} text-xs`}
          >
            {work.type === "Development" ? "💻 DEV" : "🎨 ILLUST"}
          </div>
          {/* 外部リンクボタン - 右上（全デバイスで表示） */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 flex gap-1 md:gap-2">
            {work.githubUrl && (
              <a
                href={work.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-2 py-1 md:px-3 bg-black/90 border ${theme.borderPurple} ${theme.accentPurple} hover:${theme.bgPurple} hover:text-white transition-all text-xs flex items-center gap-1`}
              >
                <Github className="w-3 h-3" />
                <span className="hidden md:inline">GitHub</span>
              </a>
            )}
            {work.demoUrl && (
              <a
                href={work.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-2 py-1 md:px-3 bg-black/90 border ${theme.borderBlue} ${theme.accentBlue} hover:${theme.bgBlue} hover:text-white transition-all text-xs flex items-center gap-1`}
              >
                <ExternalLink className="w-3 h-3" />
                <span className="hidden md:inline">Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* タイトルとメタ情報エリア */}
        <div
          className={`${theme.bgCard} border ${theme.borderSecondary} p-2 md:p-8 space-y-2 md:space-y-4`}
        >
          {/* カテゴリラベル */}
          <div className="flex flex-wrap gap-1 md:gap-2">
            {work.category.map((cat) => (
              <span
                key={cat}
                className={`px-1.5 py-0.5 md:px-3 md:py-1 ${theme.bgInput} border ${theme.borderBlue} ${theme.accentBlue} text-xs`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* プロジェクトタイトル */}
          <h1
            className={`text-lg md:text-5xl ${theme.text} py-1 md:py-4 border-l-2 md:border-l-4 ${theme.border} pl-2 md:pl-4`}
          >
            {">"} {work.title}
          </h1>

          {/* プロジェクト情報グリッド（完成日、期間、チーム、役割） */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-4 border-t ${theme.borderDivider} pt-1.5 md:pt-4`}
          >
            <div className="space-y-0.5">
              <div
                className={`text-xs ${theme.textFaded} flex items-center gap-1`}
              >
                <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" />
                <span className="text-[10px] md:text-xs">DATE</span>
              </div>
              <div className={`text-xs md:text-sm ${theme.textSecondary}`}>
                {work.date}
              </div>
            </div>
            <div className="space-y-0.5">
              <div
                className={`text-xs ${theme.textFaded} flex items-center gap-1`}
              >
                <Code className="w-2.5 h-2.5 md:w-3 md:h-3" />
                <span className="text-[10px] md:text-xs">DURATION</span>
              </div>
              <div className={`text-xs md:text-sm ${theme.textSecondary}`}>
                {work.duration}
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
                {work.team}
              </div>
            </div>
            <div className="space-y-0.5">
              <div
                className={`text-xs ${theme.textFaded} flex items-center gap-1`}
              >
                <Palette className="w-2.5 h-2.5 md:w-3 md:h-3" />
                <span className="text-[10px] md:text-xs">ROLE</span>
              </div>
              <div className={`text-xs md:text-sm ${theme.textSecondary}`}>
                {work.role}
              </div>
            </div>
          </div>

          {/* 技術タグリスト */}
          <div
            className={`flex flex-wrap gap-1 md:gap-2 border-t ${theme.borderDivider} pt-1.5 md:pt-4`}
          >
            {work.tags.map((tag) => (
              <span
                key={tag}
                className={`px-1.5 py-0.5 md:px-3 md:py-1 ${theme.bgInput} border ${theme.borderFaded} ${theme.text} text-xs`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 技術スタックタブ - スマホ版のみ、タイトルと本文の間に配置 */}
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

      {/* メインコンテンツグリッド（本文4列 + サイドバー1列） */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* 本文エリア - フェードインアニメーション */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 space-y-8"
        >
          {/* プロジェクト説明 - MicroCMSからのHTMLを表示（羊皮紙風のベージュ背景） */}
          <div
            className="bg-amber-50 text-gray-900 border border-amber-200 p-6 md:p-10 prose prose-lg max-w-none
            prose-headings:text-amber-900 
            prose-h2:text-3xl prose-h2:pb-2 prose-h2:border-b-2 
            prose-h3:text-xl prose-h3:mt-6
            prose-p:leading-relaxed
            prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-2 prose-ul:ml-4
            prose-li:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: work.htmlContent }}
          />

          {/* スクリーンショットギャラリー */}
          <div className="space-y-4">
            <h2 className={`text-2xl ${theme.text} flex items-center gap-2`}>
              <span className={`inline-block w-3 h-3 ${theme.bgButton}`} />
              <span>SCREENSHOTS</span>
            </h2>
            {/* 画像グリッド（2列） - ホバーで拡大＆明るくなるアニメーション */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {screenshots.map((screenshot) => (
                <div
                  key={screenshot.id}
                  className={`group relative overflow-hidden border ${theme.borderSecondary} ${theme.bgCard} ${theme.borderHover} transition-all cursor-pointer`}
                >
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                  {/* 画像タイトル - 下部 */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-2 ${theme.bgInput} border-t ${theme.border}`}
                  >
                    <div className={`${theme.text} text-xs`}>
                      {screenshot.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* サイドバーエリア - PC版のみ表示 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden lg:block lg:col-span-1 space-y-6"
        >
          {/* 技術スタックウィジェット */}
          <div
            className={`${theme.bgCard} border ${theme.borderSecondary} p-3`}
          >
            <h3
              className={`${theme.text} mb-3 flex items-center gap-2 text-sm`}
            >
              <span className={`inline-block w-2 h-2 ${theme.bgButton}`} />
              <span>TECH STACK</span>
            </h3>
            {/* カテゴリ別技術リスト */}
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
      </div>
    </div>
  );
}
