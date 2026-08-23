import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import "react-native-reanimated";
import "../global.css";
import { AuthProvider } from "../context/AuthContext.jsx";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* AUTH */}
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          {/* MAIN APP */}
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />

          {/* CHECKOUT */}
          <Stack.Screen
            name="checkout/index"
            options={{
              headerShown: false,
            }}
          />

          {/* SUCCESS */}
          <Stack.Screen
            name="checkout/Success"
            options={{
              headerShown: false,
            }}
          />

          {/* ORDER DETAILS */}
          <Stack.Screen
            name="order/details"
            options={{
              headerShown: false,
            }}
          />
        </Stack>

        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
