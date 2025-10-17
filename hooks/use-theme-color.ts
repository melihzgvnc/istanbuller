/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { ModeColors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName:
    | "background"
    | "surface"
    | "card"
    | "border"
    | "textPrimary"
    | "textSecondary"
    | "textTertiary"
    | "accent"
    | "accentMuted"
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return ModeColors[theme][colorName];
  }
}
