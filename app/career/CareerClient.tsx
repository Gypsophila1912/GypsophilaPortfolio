"use client";
import { motion } from "motion/react";
import { useTheme, getThemeClasses } from "../contexts/ThemeContext";
import type { Career } from "@/lib/types";

interface CareerContentProps {
  careers: Career[];
}

export default function CareerClient({ careers }: CareerContentProps) {
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-center space-y-4 pb-6 border-b ${theme.border}`}
      >
        <h1 className={`text-3xl md:text-5xl ${theme.text}`}>{">"} 経歴</h1>
        <p className={`text-sm ${theme.textMuted}`}>Work History & Education</p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <h2 className={`text-2xl ${theme.text} border-b ${theme.border} pb-3`}>
          ■ EXPERIENCE
        </h2>

        <div className="space-y-6">
          {careers.map((career, index) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative pl-8 md:pl-12 pb-8 border-l ${theme.borderSecondary} last:border-l-0 last:pb-0`}
            >
              {/* Tag Badges */}
              <div className="absolute -left-3 md:-left-4 top-0 flex flex-col gap-1">
                {career.tag &&
                  career.tag.length > 0 &&
                  career.tag.map((tagItem, tagIndex) => (
                    <div
                      key={tagIndex}
                      className={`px-2 py-1 ${theme.bg} border ${theme.border} ${theme.text} text-xs font-medium whitespace-nowrap shadow-sm`}
                    >
                      {tagItem}
                    </div>
                  ))}
              </div>

              {/* Content */}
              <div
                className={`${theme.bgCard} border ${theme.borderSecondary} p-4 md:p-6 space-y-3`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div className="flex-1">
                    <h3
                      className={`text-lg md:text-xl ${theme.text} font-medium`}
                    >
                      {career.title}
                    </h3>
                  </div>
                  <div
                    className={`px-3 py-1 ${theme.bgInput} border ${theme.borderSecondary} ${theme.textMuted} text-xs md:text-sm self-start`}
                  >
                    {new Date(career.date).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                    })}
                  </div>
                </div>

                {career.dscription && (
                  <p
                    className={`${theme.textSecondary} leading-relaxed text-sm md:text-base`}
                  >
                    {career.dscription}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
