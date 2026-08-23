import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Redirect, Stack } from "expo-router";
import {useAuth} from "../../context/AuthContext.jsx"


const AuthLayout = () => {
   const colorScheme = useColorScheme();

  const { token } = useAuth();

  if (token) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen
              name="index"
              options={
                {
                  headerShown: false,
                }
              }
            />
            <Stack.Screen
              name="login"
              options={
                {
                  headerShown: false,
                }
              }
            />
          </Stack>
      </ThemeProvider>
    </>
  );
};

export default AuthLayout;
