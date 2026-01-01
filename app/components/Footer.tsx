import { Github, Twitter, Mail } from "lucide-react";
import { useTheme, getThemeClasses } from "../contexts/ThemeContext";

export function Footer() {
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  const bgColor = mode === "dark" ? "bg-black" : "bg-gray-100";

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
    { name: "Contact", icon: Mail, url: "mailto:your.email@example.com" },
  ];

  return (
    <footer
      className={`${bgColor} border-t-4 ${theme.border} mt-12 py-4 transition-colors duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-3">
          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative px-4 py-2 ${theme.bgCard} border-2 ${theme.border} ${theme.text} ${theme.borderHover} transition-all`}
              >
                <div className="flex items-center gap-2">
                  <link.icon className="w-4 h-4" />
                  <span className="hidden md:inline text-sm">{link.name}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <div className={`${theme.textMuted} text-xs font-mono`}>
              © 2024 Portfolio Game. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
