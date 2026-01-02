"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { InteractiveEffects } from "./components/InteractiveEffects";
import { BootScreen } from "./components/BootScreen";
import {
  ThemeProvider,
  useTheme,
  getThemeClasses,
} from "./contexts/ThemeContext";
import "./globals.css";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);
  const mainRef = useRef<HTMLDivElement>(null);
  const [isBooting, setIsBooting] = useState(true);

  // ブート画面
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // ページ遷移時にスクロール位置をトップにリセット
  useEffect(() => {
    window.scrollTo(0, 0);
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [pathname]);

  if (isBooting) {
    return <BootScreen />;
  }

  return (
    <div
      className={`min-h-screen ${theme.bg} ${theme.textNormal} font-mono transition-colors duration-300`}
    >
      <InteractiveEffects />
      <Menu />
      <main className="container mx-auto px-4 py-8 relative z-10" ref={mainRef}>
        <div
          className={`border-4 ${theme.border} shadow-lg ${theme.bgCard} p-4 md:p-8 transition-colors duration-300`}
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head />
      <body suppressHydrationWarning>
        <ThemeProvider>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
