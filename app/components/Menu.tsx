import { ScreenType } from "./GameLayout";
import { useState } from "react";
import { Zap, Menu as MenuIcon, X, Sun, Moon } from "lucide-react";
import { useTheme, getThemeClasses } from "../contexts/ThemeContext";

interface MenuProps {
  activeScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
}

// メニュー項目の定義
const menuItems: {
  id: Exclude<ScreenType, "article-detail" | "work-detail">;
  label: string;
  icon: string;
}[] = [
  { id: "home", label: "HOME", icon: "◆" },
  { id: "works", label: "WORKS", icon: "◈" },
  { id: "articles", label: "ARTICLES", icon: "◉" },
  { id: "career", label: "CAREER", icon: "⚔" },
  { id: "skills", label: "SKILLS", icon: "★" },
];

export function Menu({ activeScreen, onScreenChange }: MenuProps) {
  const { mode, toggleMode } = useTheme();
  const theme = getThemeClasses(mode);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // モバイルメニューの開閉状態

  // article-detail、work-detailの時は親ページをアクティブに
  const displayActiveScreen =
    activeScreen === "article-detail"
      ? "articles"
      : activeScreen === "work-detail"
      ? "works"
      : activeScreen;

  // メニュー項目をクリックした時
  const handleMenuClick = (screen: ScreenType) => {
    onScreenChange(screen);
    setIsMenuOpen(false); // モバイルメニューを閉じる
  };

  return (
    <div
      className={`${
        mode === "dark" ? "bg-gray-900" : "bg-gray-100"
      } border-b-2 ${
        theme.border
      } sticky top-0 z-50 transition-colors duration-300`}
    >
      <div className="container mx-auto px-4">
        {/* 1段に統合したヘッダー */}
        <div className="flex items-center justify-between gap-4 py-3">
          {/* 左側: レベルとプレイヤー名 */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span className="text-yellow-400 text-xs">LV.99</span>
            </div>
            <div
              className={`px-2 py-1 ${theme.bgInput} border ${theme.borderFaded} ${theme.text} text-xs hidden sm:block`}
            >
              PLAYER: YOUR_NAME
            </div>
          </div>

          {/* 中央: デスクトップメニュー */}
          <div className="hidden md:flex flex-wrap justify-center gap-2 md:gap-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`px-4 py-2 border-2 transition-all text-sm ${
                  displayActiveScreen === item.id
                    ? theme.btnActive
                    : theme.btnInactive
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
              </button>
            ))}
          </div>

          {/* 右側: ダークモードトグルとハンバーガーメニュー */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* ダークモードトグル */}
            <button
              onClick={toggleMode}
              className={`p-2 border ${theme.border} ${theme.text} hover:${
                mode === "dark" ? "bg-gray-800" : "bg-gray-200"
              } transition-colors`}
              aria-label="Toggle dark mode"
              title={
                mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {mode === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* ハンバーガーメニューボタン（モバイルのみ・正方形） */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 border-2 ${theme.border} ${theme.text} transition-all aspect-square`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* モバイル: アコーディオンメニュー */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 pb-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`px-4 py-3 border-2 transition-all text-left ${
                  displayActiveScreen === item.id
                    ? theme.btnActive
                    : theme.btnInactive
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  {displayActiveScreen === item.id && (
                    <span className="ml-auto text-xs">●</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
