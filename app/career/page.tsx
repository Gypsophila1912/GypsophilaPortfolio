"use client";
import { motion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";
import { useTheme, getThemeClasses } from "../contexts/ThemeContext";

export default function Career() {
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  const experiences = [
    {
      id: 1,
      type: "work",
      title: "Senior Full Stack Developer",
      company: "Tech Company Inc.",
      period: "2022 - Present",
      description:
        "Leading development of web applications using React, Node.js, and cloud services.",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
    },
    {
      id: 2,
      type: "work",
      title: "Frontend Developer",
      company: "Startup Co.",
      period: "2020 - 2022",
      description:
        "Built responsive web applications and improved user experience.",
      skills: ["React", "Vue.js", "CSS", "JavaScript"],
    },
    {
      id: 3,
      type: "education",
      title: "Bachelor of Computer Science",
      company: "University Name",
      period: "2016 - 2020",
      description:
        "Studied computer science fundamentals, algorithms, and software engineering.",
      skills: ["CS Fundamentals", "Algorithms", "Data Structures"],
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
        <h1 className={`text-3xl md:text-5xl ${theme.text}`}>{">"} CAREER</h1>
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
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative pl-8 md:pl-12 pb-8 border-l ${theme.borderSecondary} last:border-l-0`}
            >
              {/* Icon */}
              <div
                className={`absolute -left-3 md:-left-4 top-0 w-6 h-6 md:w-8 md:h-8 ${theme.bg} border ${theme.border} rounded-full flex items-center justify-center`}
              >
                {exp.type === "work" ? (
                  <Briefcase
                    className={`w-3 h-3 md:w-4 md:h-4 ${theme.text}`}
                  />
                ) : (
                  <GraduationCap
                    className={`w-3 h-3 md:w-4 md:h-4 ${theme.text}`}
                  />
                )}
              </div>

              {/* Content */}
              <div
                className={`${theme.bgCard} border ${theme.borderSecondary} p-4 md:p-6 space-y-3`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div>
                    <h3 className={`text-lg md:text-xl ${theme.text}`}>
                      {exp.title}
                    </h3>
                    <div className={theme.textNormal}>{exp.company}</div>
                  </div>
                  <div
                    className={`px-3 py-1 ${theme.bgInput} border ${theme.borderSecondary} ${theme.textMuted} text-xs md:text-sm self-start`}
                  >
                    {exp.period}
                  </div>
                </div>

                <p className={`${theme.textSecondary} leading-relaxed`}>
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 ${theme.bgInput} border ${theme.borderFaded} ${theme.textMuted} text-xs`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
