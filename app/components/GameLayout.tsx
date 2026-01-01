import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Menu } from "./Menu";
import { Footer } from "./Footer";
import { InteractiveEffects } from "./InteractiveEffects";
import { useTheme, getThemeClasses } from "../contexts/ThemeContext";

// コード分割による遅延ロード
const Home = lazy(() =>
  import("./screens/Home").then((m) => ({ default: m.Home }))
);
const Career = lazy(() =>
  import("./screens/Career").then((m) => ({ default: m.Career }))
);
const Skills = lazy(() =>
  import("./screens/Skills").then((m) => ({ default: m.Skills }))
);
const Works = lazy(() =>
  import("./screens/Works").then((m) => ({ default: m.Works }))
);
const Articles = lazy(() =>
  import("./screens/Articles").then((m) => ({ default: m.Articles }))
);
const ArticleDetail = lazy(() =>
  import("./screens/ArticleDetail").then((m) => ({ default: m.ArticleDetail }))
);
const WorkDetail = lazy(() =>
  import("./screens/WorkDetail").then((m) => ({ default: m.WorkDetail }))
);

export type ScreenType =
  | "home"
  | "career"
  | "skills"
  | "works"
  | "articles"
  | "article-detail"
  | "work-detail";

// ローディングスケルトン
function ScreenSkeleton() {
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);

  return (
    <div className="space-y-8 animate-pulse">
      <div className={`h-64 ${theme.bgCard} border-2 ${theme.borderDivider}`} />
      <div className={`h-48 ${theme.bgCard} border-2 ${theme.borderDivider}`} />
    </div>
  );
}

export function GameLayout() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>("home");
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);
  const mainRef = useRef<HTMLDivElement>(null);

  // ページ遷移時にスクロール位置をトップにリセット
  // biome-ignore lint/correctness/useExhaustiveDependencies: activeScreen changes trigger scroll reset
  useEffect(() => {
    window.scrollTo(0, 0);
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [activeScreen]);

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return <Home onNavigate={setActiveScreen} />;
      case "career":
        return <Career />;
      case "skills":
        return <Skills />;
      case "works":
        return <Works onNavigate={setActiveScreen} />;
      case "articles":
        return <Articles onNavigate={setActiveScreen} />;
      case "article-detail":
        return <ArticleDetail onNavigate={setActiveScreen} />;
      case "work-detail":
        return <WorkDetail onNavigate={setActiveScreen} />;
      default:
        return <Home onNavigate={setActiveScreen} />;
    }
  };

  return (
    <div
      className={`min-h-screen ${theme.bg} ${theme.textNormal} font-mono transition-colors duration-300`}
    >
      <InteractiveEffects />
      <Menu activeScreen={activeScreen} onScreenChange={setActiveScreen} />
      <main className="container mx-auto px-4 py-8 relative z-10" ref={mainRef}>
        <div
          className={`border-4 ${theme.border} shadow-lg ${theme.bgCard} p-4 md:p-8 transition-colors duration-300`}
        >
          <Suspense fallback={<ScreenSkeleton />}>{renderScreen()}</Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
