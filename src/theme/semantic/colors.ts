import { colors } from "../tokens/colors";

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
    background: colors.neutral[950],
    foreground: colors.neutral[50],
    surface: colors.neutral[900],
    border: colors.neutral[800],
    input: colors.neutral[900],
    ring: colors.primary[400],

    primary: {
      default: colors.primary[500],
      foreground: colors.neutral[0],
      muted: colors.primary[900],
    },
    secondary: {
      default: colors.neutral[800],
      foreground: colors.neutral[50],
    },
    muted: {
      default: colors.neutral[900],
      foreground: colors.neutral[400],
    },
    accent: {
      default: colors.neutral[800],
      foreground: colors.neutral[50],
    },
    destructive: {
      default: colors.error[900],
      foreground: colors.neutral[50],
    },
  },
};
