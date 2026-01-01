"use client";

import { useState, useEffect } from "react";

import { BootScreen } from "./components/BootScreen";

import { GameLayout } from "./components/GameLayout";

import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 1500); // 3000から1500に短縮してロード時間を改善

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>{isBooting ? <BootScreen /> : <GameLayout />}</ThemeProvider>
  );
}
