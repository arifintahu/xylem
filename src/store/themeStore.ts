import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: (function() {
        if (typeof window !== 'undefined') {
          // Check system preference if no stored preference
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
          }
        }
        return 'light';
      })(),
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        updateHtmlClass(newTheme);
        return { theme: newTheme };
      }),
      setTheme: (theme) => {
        updateHtmlClass(theme);
        set({ theme });
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          updateHtmlClass(state.theme);
        }
      }
    }
  )
);

// Helper to update DOM
const updateHtmlClass = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  const root = window.document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};
