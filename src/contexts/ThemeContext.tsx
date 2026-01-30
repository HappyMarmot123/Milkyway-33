import * as React from "react";

const ThemeContext = React.createContext(undefined);

const THEME_KEY = "theme-preference";

export function ThemeProvider({ children }) {
  // 초기 테마 로드
  const [theme, setThemeState] = React.useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (["light", "dark"].includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.warn("Failed to load theme:", e);
    }
    // 기본값은 light로 설정 (또는 필요에 따라 dark)
    return "light";
  });

  // 테마 설정 함수
  const setTheme = React.useCallback((newTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch (e) {
      console.warn("Failed to save theme:", e);
    }
  }, []);

  // 테마 적용 (HTML class 토글)
  React.useEffect(() => {
    const root = document.documentElement;
    
    // 단순화된 로직: theme이 "dark"이면 클래스 추가, 아니면 제거
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export { ThemeContext };
