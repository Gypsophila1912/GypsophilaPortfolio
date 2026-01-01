import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// テーマのタイプ定義
type Mode = "dark" | "light";

interface ThemeContextType {
  mode: Mode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // localStorageから初期値を取得（デフォルトはdark）
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem("mode");
    return saved === "dark" || saved === "light" ? saved : "dark";
  });

  // localStorageに保存
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// カスタムフック
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// テーマに応じたクラス名を取得するヘルパー関数
export function getThemeClasses(mode: Mode) {
  const isDark = mode === "dark";

  return {
    // 背景色
    bg: isDark ? "bg-black" : "bg-gray-50",

    // 背景色（カード）
    bgCard: isDark ? "bg-gray-900" : "bg-white",

    // 背景色（カードホバー）
    bgCardHover: isDark ? "hover:bg-gray-800" : "hover:bg-gray-50",

    // 背景色（コントラスト）
    bgContrast: isDark ? "bg-black" : "bg-gray-100",

    // 背景色（ボタン）
    bgButton: isDark ? "bg-green-500" : "bg-green-600",

    // 背景色（入力欄）
    bgInput: isDark ? "bg-black" : "bg-white",

    // テキスト色（メイン）
    text: isDark ? "text-green-400" : "text-green-700",

    // テキスト色（ボタン）
    textButton: isDark ? "text-black" : "text-white",

    // テキスト色（セカンダリ）
    textSecondary: isDark ? "text-gray-300" : "text-gray-700",
    textMuted: isDark ? "text-gray-400" : "text-gray-500",
    textFaded: isDark ? "text-gray-500" : "text-gray-400",
    textNormal: isDark ? "text-gray-200" : "text-gray-900",

    // ボーダー色
    border: isDark ? "border-green-500" : "border-green-600",
    borderSecondary: isDark ? "border-green-600" : "border-green-500",
    borderFaded: isDark ? "border-green-700" : "border-green-400",
    borderDivider: isDark ? "border-gray-800" : "border-gray-200",

    // ボーダー色（ホバー）
    borderHover: isDark ? "hover:border-green-500" : "hover:border-green-600",

    // ボタン（アクティブ）
    btnActive: isDark
      ? "bg-green-500 text-black border-green-400"
      : "bg-green-600 text-white border-green-700",

    // ボタン（非アクティブ）
    btnInactive: isDark
      ? "bg-black text-gray-400 border-green-600 hover:bg-gray-900 hover:text-green-400"
      : "bg-white text-gray-600 border-green-500 hover:bg-green-50 hover:text-green-700",

    // アクセント色（青）
    accentBlue: isDark ? "text-blue-400" : "text-blue-600",
    borderBlue: isDark ? "border-blue-600" : "border-blue-500",
    bgBlue: isDark ? "bg-blue-500" : "bg-blue-600",

    // アクセント色（紫）
    accentPurple: isDark ? "text-purple-400" : "text-purple-600",
    borderPurple: isDark ? "border-purple-600" : "border-purple-500",
    bgPurple: isDark ? "bg-purple-500" : "bg-purple-600",

    // アクセント色（黄）
    accentYellow: isDark ? "text-yellow-400" : "text-yellow-600",
    borderYellow: isDark ? "border-yellow-600" : "border-yellow-500",

    // ローディング画面用
    bootBg: isDark ? "bg-black" : "bg-gray-50",
    bootText: isDark ? "text-green-500" : "text-green-600",
    bootBorder: isDark ? "border-green-500" : "border-green-600",
    bootProgress: isDark ? "bg-green-500" : "bg-green-600",
    bootProgressBg: isDark ? "bg-gray-800" : "bg-gray-300",
  };
}
