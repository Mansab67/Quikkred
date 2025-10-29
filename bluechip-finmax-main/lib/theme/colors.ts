/**
 * Theme Color Configuration
 * Centralized color system for easy theme management
 */

export const themes = {
  light: {
    // Primary Brand Colors
    primary: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#0ea5e9',  // Main primary
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },

    // Secondary/Accent Colors
    secondary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#34d399',  // Main secondary
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },

    // Warning/Accent Colors
    accent: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',  // Main accent
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },

    // Neutral/Gray Colors
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },

    // Semantic Colors
    success: {
      light: '#d1fae5',
      DEFAULT: '#10b981',
      dark: '#059669',
    },
    error: {
      light: '#fee2e2',
      DEFAULT: '#ef4444',
      dark: '#dc2626',
    },
    warning: {
      light: '#fef3c7',
      DEFAULT: '#f59e0b',
      dark: '#d97706',
    },
    info: {
      light: '#dbeafe',
      DEFAULT: '#3b82f6',
      dark: '#2563eb',
    },

    // Background Colors
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      card: '#ffffff',
      modal: '#ffffff',
    },

    // Text Colors
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      muted: '#94a3b8',
      inverse: '#ffffff',
    },

    // Border Colors
    border: {
      light: '#f1f5f9',
      DEFAULT: '#e2e8f0',
      dark: '#cbd5e1',
    },
  },

  dark: {
    // Primary Brand Colors
    primary: {
      50: '#0c4a6e',
      100: '#075985',
      200: '#0369a1',
      300: '#0284c7',
      400: '#0ea5e9',
      500: '#38bdf8',  // Main primary (brighter for dark mode)
      600: '#7dd3fc',
      700: '#bae6fd',
      800: '#e0f2fe',
      900: '#f0f9ff',
    },

    // Secondary/Accent Colors
    secondary: {
      50: '#14532d',
      100: '#166534',
      200: '#15803d',
      300: '#16a34a',
      400: '#22c55e',
      500: '#4ade80',  // Main secondary (brighter for dark mode)
      600: '#86efac',
      700: '#bbf7d0',
      800: '#dcfce7',
      900: '#f0fdf4',
    },

    // Warning/Accent Colors
    accent: {
      50: '#78350f',
      100: '#92400e',
      200: '#b45309',
      300: '#d97706',
      400: '#f59e0b',
      500: '#fbbf24',  // Main accent
      600: '#fcd34d',
      700: '#fde68a',
      800: '#fef3c7',
      900: '#fffbeb',
    },

    // Neutral/Gray Colors
    neutral: {
      50: '#0f172a',
      100: '#1e293b',
      200: '#334155',
      300: '#475569',
      400: '#64748b',
      500: '#94a3b8',
      600: '#cbd5e1',
      700: '#e2e8f0',
      800: '#f1f5f9',
      900: '#f8fafc',
    },

    // Semantic Colors
    success: {
      light: '#065f46',
      DEFAULT: '#10b981',
      dark: '#34d399',
    },
    error: {
      light: '#7f1d1d',
      DEFAULT: '#ef4444',
      dark: '#f87171',
    },
    warning: {
      light: '#78350f',
      DEFAULT: '#f59e0b',
      dark: '#fbbf24',
    },
    info: {
      light: '#1e3a8a',
      DEFAULT: '#3b82f6',
      dark: '#60a5fa',
    },

    // Background Colors
    background: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      card: '#1e293b',
      modal: '#334155',
    },

    // Text Colors
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
      muted: '#64748b',
      inverse: '#0f172a',
    },

    // Border Colors
    border: {
      light: '#334155',
      DEFAULT: '#475569',
      dark: '#64748b',
    },
  },
};

// Gradient definitions
export const gradients = {
  light: {
    primary: 'linear-gradient(135deg, #0ea5e9 0%, #34d399 100%)',
    secondary: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    accent: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    ocean: 'linear-gradient(135deg, #38bdf8 0%, #34d399 100%)',
    sunset: 'linear-gradient(135deg, #fbbf24 0%, #38bdf8 100%)',
    vibrant: 'linear-gradient(135deg, #0ea5e9 0%, #fbbf24 50%, #34d399 100%)',
  },
  dark: {
    primary: 'linear-gradient(135deg, #38bdf8 0%, #4ade80 100%)',
    secondary: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
    accent: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    ocean: 'linear-gradient(135deg, #38bdf8 0%, #4ade80 100%)',
    sunset: 'linear-gradient(135deg, #fbbf24 0%, #38bdf8 100%)',
    vibrant: 'linear-gradient(135deg, #38bdf8 0%, #fbbf24 50%, #4ade80 100%)',
  },
};

// Shadow definitions
export const shadows = {
  light: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    glow: '0 0 20px rgba(14, 165, 233, 0.4)',
  },
  dark: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
    glow: '0 0 20px rgba(56, 189, 248, 0.5)',
  },
};

export type ThemeMode = 'light' | 'dark';
export type Theme = typeof themes.light;
