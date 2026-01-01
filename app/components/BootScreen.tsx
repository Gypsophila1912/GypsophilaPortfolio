import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTheme, getThemeClasses } from "../contexts/ThemeContext";

export function BootScreen() {
  const { mode } = useTheme();
  const theme = getThemeClasses(mode);
  const [dots, setDots] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 200); // 300から200に短縮

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 5, 100)); // 3から5に増加してより速く
    }, 30); // 40から30に短縮

    return () => {
      clearInterval(dotInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 ${theme.bootBg} flex items-center justify-center`}
    >
      <div className="w-full max-w-2xl px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <pre
              className={`${theme.bootText} text-xs md:text-sm mb-4 font-mono`}
            >
              {`
 ____   ___  ____ _____ _____ ___  _     ___ ___  
|  _ \\ / _ \\|  _ \\_   _|  ___/ _ \\| |   |_ _/ _ \\ 
| |_) | | | | |_) || | | |_ | | | | |    | | | | |
|  __/| |_| |  _ < | | |  _|| |_| | |___ | | |_| |
|_|    \\___/|_| \\_\\|_| |_|   \\___/|_____|___\\___/ 
`}
            </pre>
          </div>

          <div className={`space-y-2 ${theme.text} font-mono text-sm`}>
            <div>SYSTEM INITIALIZING{dots}</div>
            <div>LOADING ASSETS{dots}</div>
            <div>COMPILING SHADERS{dots}</div>
          </div>

          <div className="mt-8">
            <div
              className={`h-4 ${theme.bootProgressBg} border-2 ${theme.bootBorder} relative overflow-hidden`}
            >
              <div
                className={`h-full ${theme.bootProgress} transition-all duration-100`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div
              className={`${theme.bootText} font-mono text-xs mt-2 text-right`}
            >
              {progress}%
            </div>
          </div>

          <div
            className={`mt-8 ${theme.textFaded} font-mono text-xs text-center`}
          >
            Press any key to continue...
          </div>
        </motion.div>
      </div>
    </div>
  );
}
