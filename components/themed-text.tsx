import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "display"
    | "caption";
  variant?: "primary" | "secondary" | "tertiary" | "accent" | "inverse";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  variant = "primary",
  ...rest
}: ThemedTextProps) {
  const colorToken =
    variant === "primary"
      ? "textPrimary"
      : variant === "secondary"
      ? "textSecondary"
      : variant === "tertiary"
      ? "textTertiary"
      : variant === "accent"
      ? "accent"
      : "background";

  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorToken as any
  );

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "display" ? styles.display : undefined,
        type === "caption" ? styles.caption : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  display: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
    letterSpacing: 0.2,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    lineHeight: 22,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
