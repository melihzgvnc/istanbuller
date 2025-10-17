import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: "background" | "surface" | "card" | "transparent";
  border?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  variant = "background",
  border = false,
  ...otherProps
}: ThemedViewProps) {
  const bgToken = variant === "transparent" ? undefined : variant;
  const backgroundColor = bgToken
    ? useThemeColor({ light: lightColor, dark: darkColor }, bgToken)
    : "transparent";
  const borderColor = border ? useThemeColor({}, "border") : undefined;

  return (
    <View
      style={[
        { backgroundColor, borderColor, borderWidth: border ? 1 : 0 },
        style,
      ]}
      {...otherProps}
    />
  );
}
