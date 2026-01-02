"use client";

import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { useTheme, getThemeClasses } from "../../contexts/ThemeContext";

// MicroCMSから受け取る想定のデータ構造
export default function ArticleDetail({ params }: { params: { id: string } }) {
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  // 記事のメタデータ（MicroCMSから取得する想定）
  const article = {
    id: 1,
    title: "Tech Conference 2024 - Day 1 Report",
    date: "2024-03-15",
    readTime: "5 min",
    author: "PLAYER_NAME",
    tags: ["Event", "Tech", "Conference"],
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    // MicroCMSから受け取るHTML本文
    htmlContent: `
      <div class="space-y-4">
        <p class="text-lg leading-relaxed">
          I had the incredible opportunity to attend Tech Conference 2024, one of the biggest
          technology events of the year. With over 5,000 attendees and 100+ speakers, the
          conference was packed with insights about the future of technology.
        </p>
        <p class="text-lg leading-relaxed">
          This is my detailed report from Day 1, covering the opening keynote, workshop
          sessions, and networking events. Here are the key takeaways and highlights.
        </p>
      </div>

      <div class="space-y-4 mt-6">
        <h2 class="text-3xl border-b-2 border-green-600 pb-2">
          Opening Keynote
        </h2>
        <p class="leading-relaxed">
          The day started with an inspiring keynote from Dr. Jane Smith, CTO of TechCorp.
          She discussed the evolution of artificial intelligence and its impact on software
          development. The key points were:
        </p>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li>AI-assisted coding is becoming mainstream</li>
          <li>Ethical considerations in AI development</li>
          <li>The future of human-AI collaboration</li>
          <li>Open-source AI models and democratization</li>
        </ul>

        <h3 class="text-xl mt-6">
          Key Takeaways
        </h3>
        <p class="leading-relaxed">
          One of the most interesting points was about the shift from traditional development
          to AI-augmented workflows. Dr. Smith emphasized that AI won't replace developers,
          but developers who use AI will replace those who don't.
        </p>
      </div>

      <div class="space-y-4 mt-6">
        <h2 class="text-3xl border-b-2 border-blue-500 pb-2">
          Workshop Sessions
        </h2>
        <p class="leading-relaxed">
          After the keynote, I attended several workshop sessions. The conference had multiple
          tracks running in parallel, so I had to choose carefully. Here's what I attended:
        </p>

        <h3 class="text-xl mt-6">
          AI and Machine Learning Track
        </h3>
        <p class="leading-relaxed">
          The ML workshop was hands-on and covered practical implementations of machine learning
          models in production environments. We worked with real datasets and learned about:
        </p>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li>Model deployment strategies</li>
          <li>Monitoring and observability</li>
          <li>Handling edge cases and bias</li>
          <li>Cost optimization for ML workloads</li>
        </ul>

        <h3 class="text-xl mt-6">
          Web Development Track
        </h3>
        <p class="leading-relaxed">
          The web development session focused on modern frameworks and best practices.
          Topics included Server Components in React, edge computing, and progressive
          web apps. The speaker demonstrated how to build performant applications with
          minimal client-side JavaScript.
        </p>
      </div>

      <div class="space-y-4 mt-6">
        <h2 class="text-3xl border-b-2 border-purple-500 pb-2">
          Networking Events
        </h2>
        <p class="leading-relaxed">
          The evening concluded with networking sessions where I met developers from around
          the world. It was fascinating to hear about different tech stacks, challenges,
          and solutions people are working on.
        </p>
        <p class="leading-relaxed">
          I made several valuable connections and exchanged ideas about collaborative
          projects. The diversity of perspectives was truly enriching.
        </p>
      </div>

      <div class="space-y-4 bg-amber-100 border-l-4 border-green-600 p-6 mt-6">
        <h2 class="text-3xl">
          Final Thoughts
        </h2>
        <p class="leading-relaxed">
          Day 1 of Tech Conference 2024 exceeded my expectations. The combination of
          technical depth, practical workshops, and networking opportunities made it
          incredibly valuable. I'm looking forward to Day 2 and will share another
          detailed report soon!
        </p>
        <p class="leading-relaxed font-bold">
          Stay tuned for the Day 2 report where I'll cover advanced topics, hackathon
          results, and exclusive interviews with industry leaders.
        </p>
      </div>
    `,
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
          <span>BACK TO ARTICLES</span>
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
            src={article.image}
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
            {article.tags.map((tag) => (
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

          {/* メタ情報（著者、日付、読了時間） */}
          <div
            className={`flex flex-wrap items-center gap-2 md:gap-6 text-xs md:text-sm ${theme.textMuted} border-t ${theme.borderDivider} pt-1.5 md:pt-4`}
          >
            <div className="flex items-center gap-1 md:gap-2">
              <User className="w-2.5 h-2.5 md:w-4 md:h-4" />
              <span className="hidden md:inline">{article.author}</span>
              <span className="md:hidden">{article.author.split("_")[0]}</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Calendar className="w-2.5 h-2.5 md:w-4 md:h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Clock className="w-2.5 h-2.5 md:w-4 md:h-4" />
              <span>{article.readTime}</span>
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
    </div>
  );
}
