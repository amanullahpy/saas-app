import { colors } from "../tokens/colors";

/** Softer dark palette: less harsh contrast, muted primary (not “neon” on #0c0e13). */
export const semanticColors = {
  light: {
    background: colors.neutral[0],
    foreground: colors.neutral[900],
    surface: colors.neutral[50],
    border: colors.neutral[200],
    input: colors.neutral[100],
    ring: colors.primary[500],

    primary: {
      default: colors.primary[600],
      foreground: colors.neutral[0],
      muted: colors.primary[100],
    },
    secondary: {
      default: colors.neutral[100],
      foreground: colors.neutral[900],
    },
    muted: {
      default: colors.neutral[50],
      foreground: colors.neutral[500],
    },
    accent: {
      default: colors.neutral[100],
      foreground: colors.neutral[900],
    },
    destructive: {
      default: colors.error[500],
      foreground: colors.neutral[0],
    },
  },
  dark: {
    background: "#0c0e13",
    foreground: "#e8eaef",
    surface: "#12161f",
    border: "#2a3140",
    input: "#1a1f2a",
    ring: "#4f6fad",

    primary: {
      default: "#6d9cf0",
      foreground: "#0c0e13",
      muted: "#1e2a3d",
    },
    secondary: {
      default: "#1e2430",
      foreground: "#e8eaef",
    },
    muted: {
      default: "#161b24",
      foreground: "#9aa4b2",
    },
    accent: {
      default: "#1e2430",
      foreground: "#e8eaef",
    },
    destructive: {
      default: "#e85d5d",
      foreground: "#0c0e13",
    },
  },
};
