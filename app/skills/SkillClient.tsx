"use client";
import { motion } from "motion/react";
import { Award, ChevronDown, Wrench, Heart, Code2, Hammer } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui-custom/layout/collapsible";
import { useTheme, getThemeClasses } from "../contexts/ThemeContext";
import type { Skills } from "@/lib/types";

interface SkillClientProps {
  skills: Skills | null;
}

export default function SkillClient({ skills }: SkillClientProps) {
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  const [isTechStackOpen, setIsTechStackOpen] = useState(true);
  const [isToolsOpen, setIsToolsOpen] = useState(true);
  const [isSkillsOpen, setIsSkillsOpen] = useState(true);
  const [isHobbiesOpen, setIsHobbiesOpen] = useState(true);

  if (!skills) {
    return (
      <div className={`text-center py-20 ${theme.textMuted}`}>
        スキル情報を読み込めませんでした
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-center space-y-4 pb-6 border-b ${theme.border}`}
      >
        <h1 className={`text-3xl md:text-5xl ${theme.text}`}>
          {">"} スキル・趣味
        </h1>
        <p className={`text-sm ${theme.textMuted}`}>Skills, Tools & Hobbies</p>
      </motion.div>

      {/* Tech Stack Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="space-y-6"
      >
        <Collapsible
          defaultOpen={isTechStackOpen}
          onOpenChange={setIsTechStackOpen}
        >
          <CollapsibleTrigger
            className={`w-full flex items-center justify-between text-2xl ${theme.text} border-b ${theme.border} pb-3 hover:opacity-80 transition-opacity gap-2`}
          >
            <div className="flex items-center gap-2">
              <span>■ 使用技術</span>
              <Code2 className="w-6 h-6" />
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isTechStackOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className={`${theme.bgCard} border ${theme.borderBlue} p-6 mt-6`}
            >
              <div className="flex flex-wrap gap-2">
                {skills.techstack && skills.techstack.length > 0 ? (
                  skills.techstack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-4 py-2 ${theme.bgInput} border ${theme.borderBlue} ${theme.textSecondary} text-sm font-medium`}
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <p className={theme.textMuted}>
                    技術スタック情報がありません
                  </p>
                )}
              </div>
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
      </motion.div>

      {/* Tools Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <Collapsible defaultOpen={isToolsOpen} onOpenChange={setIsToolsOpen}>
          <CollapsibleTrigger
            className={`w-full flex items-center justify-between text-2xl ${theme.text} border-b ${theme.border} pb-3 hover:opacity-80 transition-opacity gap-2`}
          >
            <div className="flex items-center gap-2">
              <span>■ 使用ツール</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isToolsOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className={`${theme.bgCard} border ${theme.borderPurple} p-6 mt-6`}
            >
              <div className="flex flex-wrap gap-2">
                {skills.tools && skills.tools.length > 0 ? (
                  skills.tools.map((tool) => (
                    <span
                      key={tool}
                      className={`px-4 py-2 ${theme.bgInput} border ${theme.borderPurple} ${theme.textSecondary} text-sm font-medium`}
                    >
                      {tool}
                    </span>
                  ))
                ) : (
                  <p className={theme.textMuted}>ツール情報がありません</p>
                )}
              </div>
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="space-y-6"
      >
        <Collapsible defaultOpen={isSkillsOpen} onOpenChange={setIsSkillsOpen}>
          <CollapsibleTrigger
            className={`w-full flex items-center justify-between text-2xl ${theme.text} border-b ${theme.border} pb-3 hover:opacity-80 transition-opacity gap-2`}
          >
            <div className="flex items-center gap-2">
              <span>■ 資格</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isSkillsOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className={`${theme.bgCard} border ${theme.borderYellow} p-6 mt-6`}
            >
              <div className="flex flex-wrap gap-2">
                {skills.skills && skills.skills.length > 0 ? (
                  skills.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 ${theme.bgInput} border ${theme.borderYellow} ${theme.textSecondary} text-sm font-medium`}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className={theme.textMuted}>スキル情報がありません</p>
                )}
              </div>
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
      </motion.div>

      {/* Hobbies Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <Collapsible
          defaultOpen={isHobbiesOpen}
          onOpenChange={setIsHobbiesOpen}
        >
          <CollapsibleTrigger
            className={`w-full flex items-center justify-between text-2xl ${theme.text} border-b ${theme.border} pb-3 hover:opacity-80 transition-opacity gap-2`}
          >
            <div className="flex items-center gap-2">
              <span>■ 趣味</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isHobbiesOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className={`${theme.bgCard} border ${theme.borderSecondary} p-6 mt-6`}
            >
              <div className="flex flex-wrap gap-2">
                {skills.hobbies && skills.hobbies.length > 0 ? (
                  skills.hobbies.map((hobby) => (
                    <span
                      key={hobby}
                      className={`px-4 py-2 ${theme.bgInput} border ${theme.borderFaded} ${theme.textSecondary} text-sm font-medium`}
                    >
                      {hobby}
                    </span>
                  ))
                ) : (
                  <p className={theme.textMuted}>趣味情報がありません</p>
                )}
              </div>
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
      </motion.div>

      {/* Description Text */}
      {skills.text && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`${theme.bgCard} border ${theme.borderSecondary} p-6`}
        >
          <div
            className={`max-w-none ${theme.textSecondary} leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: skills.text }}
            style={{
              fontSize: "0.95rem",
              lineHeight: "1.75",
            }}
          />
          <style jsx>{`
            div :global(strong) {
              font-weight: 700;
              color: ${mode === "dark" ? "#e5e7eb" : "#1f2937"};
            }
            div :global(em) {
              font-style: italic;
            }
            div :global(h1),
            div :global(h2),
            div :global(h3),
            div :global(h4) {
              font-weight: 600;
              margin-top: 1.5em;
              margin-bottom: 0.75em;
              color: ${mode === "dark" ? "#f3f4f6" : "#111827"};
            }
            div :global(h1) {
              font-size: 1.5rem;
            }
            div :global(h2) {
              font-size: 1.25rem;
            }
            div :global(h3) {
              font-size: 1.1rem;
            }
            div :global(ul),
            div :global(ol) {
              margin: 1em 0;
              padding-left: 1.5em;
            }
            div :global(li) {
              margin: 0.5em 0;
            }
            div :global(p) {
              margin: 1em 0;
            }
            div :global(code) {
              background-color: ${mode === "dark"
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)"};
              padding: 0.2em 0.4em;
              border-radius: 3px;
              font-family: monospace;
              font-size: 0.9em;
            }
            div :global(a) {
              color: ${mode === "dark" ? "#60a5fa" : "#3b82f6"};
              text-decoration: underline;
            }
          `}</style>
        </motion.div>
      )}
    </div>
  );
}
