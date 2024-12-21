import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function Button({
  children,
  style,
  variant = "default",
  ...props
}: {
  children: string;
  style: any;
  variant: string;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "outline" && styles.outlineButton,
        style,
      ]}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          style={[
            styles.buttonText,
            variant === "outline" && styles.outlineButtonText,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  outlineButtonText: {
    color: "#007AFF",
  },
});
