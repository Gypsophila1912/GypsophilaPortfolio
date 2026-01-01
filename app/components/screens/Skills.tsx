import { motion } from "motion/react";
import { Award, ChevronDown, Wrench, Heart } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui-custom/layout/collapsible";
import { useTheme, getThemeClasses } from "../../contexts/ThemeContext";

export function Skills() {
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  const [isSkillsOpen, setIsSkillsOpen] = useState(true);
  const [isCertificationsOpen, setIsCertificationsOpen] = useState(true);
  const [isHobbiesOpen, setIsHobbiesOpen] = useState(true);

  const skills = {
    development: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
    ],
    design: ["Figma", "Adobe Photoshop", "Clip Studio Paint", "Blender"],
    other: ["Git", "Agile", "CI/CD", "REST API", "GraphQL"],
  };

  const certifications = [
    { id: 1, name: "AWS Certified Developer", year: "2023" },
    { id: 2, name: "Professional Scrum Master I", year: "2022" },
    { id: 3, name: "Google Analytics Certified", year: "2021" },
  ];

  const hobbies = [
    {
      id: 1,
      category: "Gaming",
      icon: "🎮",
      items: ["RPG", "Action", "Indie Games"],
      description: "Playing various games and analyzing game design",
    },
    {
      id: 2,
      category: "Drawing",
      icon: "🎨",
      items: ["Digital Art", "Character Design", "Pixel Art"],
      description: "Creating illustrations and pixel art in free time",
    },
    {
      id: 3,
      category: "Music",
      icon: "🎵",
      items: ["Composing", "Guitar", "Electronic Music"],
      description: "Making music and playing instruments",
    },
    {
      id: 4,
      category: "Reading",
      icon: "📚",
      items: ["Tech Books", "Sci-Fi", "Fantasy"],
      description: "Reading technical books and novels",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-center space-y-4 pb-6 border-b ${theme.border}`}
      >
        <h1 className={`text-3xl md:text-5xl ${theme.text}`}>
          {">"} SKILLS & MORE
        </h1>
        <p className={`text-sm ${theme.textMuted}`}>
          Skills, Certifications & Hobbies
        </p>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <Collapsible defaultOpen={isSkillsOpen} onOpenChange={setIsSkillsOpen}>
          <CollapsibleTrigger
            className={`w-full flex items-center justify-between text-2xl ${theme.text} border-b ${theme.border} pb-3 hover:opacity-80 transition-opacity gap-2`}
          >
            <div className="flex items-center gap-2">
              <span>■ SKILLS</span>
              <Wrench className="w-6 h-6" />
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isSkillsOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0, duration: 0.2 }}
                className="space-y-3"
              >
                <div
                  className={`text-xl ${theme.accentBlue} flex items-center gap-2`}
                >
                  <span>▸</span>
                  <span>Development</span>
                </div>
                <div
                  className={`${theme.bgCard} border ${theme.borderBlue} p-4`}
                >
                  <div className="flex flex-wrap gap-2">
                    {skills.development.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 ${theme.bgInput} border ${theme.borderBlue} ${theme.textSecondary} text-sm`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05, duration: 0.2 }}
                className="space-y-3"
              >
                <div
                  className={`text-xl ${theme.accentPurple} flex items-center gap-2`}
                >
                  <span>▸</span>
                  <span>Design</span>
                </div>
                <div
                  className={`${theme.bgCard} border ${theme.borderPurple} p-4`}
                >
                  <div className="flex flex-wrap gap-2">
                    {skills.design.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 ${theme.bgInput} border ${theme.borderPurple} ${theme.textSecondary} text-sm`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="space-y-3"
              >
                <div
                  className={`text-xl ${theme.text} flex items-center gap-2`}
                >
                  <span>▸</span>
                  <span>Other</span>
                </div>
                <div
                  className={`${theme.bgCard} border ${theme.borderSecondary} p-4`}
                >
                  <div className="flex flex-wrap gap-2">
                    {skills.other.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 ${theme.bgInput} border ${theme.borderFaded} ${theme.textSecondary} text-sm`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </motion.div>

      {/* Certifications Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <Collapsible
          defaultOpen={isCertificationsOpen}
          onOpenChange={setIsCertificationsOpen}
        >
          <CollapsibleTrigger
            className={`w-full flex items-center justify-between text-2xl ${theme.text} border-b ${theme.border} pb-3 hover:opacity-80 transition-opacity gap-2`}
          >
            <div className="flex items-center gap-2">
              <span>■ CERTIFICATIONS</span>
              <Award className="w-6 h-6" />
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isCertificationsOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className={`${theme.bgCard} border ${theme.borderYellow} p-4 text-center space-y-2`}
                >
                  <Award className={`w-8 h-8 ${theme.accentYellow} mx-auto`} />
                  <div className={theme.accentYellow}>{cert.name}</div>
                  <div className={`${theme.textMuted} text-sm`}>
                    {cert.year}
                  </div>
                </motion.div>
              ))}
            </div>
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
              <span>■ HOBBIES</span>
              <Heart className="w-6 h-6" />
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isHobbiesOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={hobby.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.2 }}
                  className={`${theme.bgCard} border ${theme.borderSecondary} p-6 space-y-4 ${theme.borderHover} transition-all`}
                >
                  {/* Header with icon */}
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{hobby.icon}</div>
                    <div>
                      <h3 className={`text-xl ${theme.text}`}>
                        {hobby.category}
                      </h3>
                      <p className={`text-xs ${theme.textMuted}`}>
                        {hobby.description}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="flex flex-wrap gap-2">
                    {hobby.items.map((item) => (
                      <span
                        key={item}
                        className={`px-3 py-1 ${theme.bgInput} border ${theme.borderFaded} ${theme.textSecondary} text-sm`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </motion.div>
    </div>
  );
}
