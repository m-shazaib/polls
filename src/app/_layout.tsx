import { Stack } from "expo-router";
import HomeScreen from ".";
import AuthProvider from "../provider/AuthProvider";
import Auth from "./(auth)/login";

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack >
                <Stack.Screen name="(auth)" options={{title: "Login"}}/>
                <Stack.Screen name="(protected)" options={{title: "Profile"}}/>
            </Stack>
        </AuthProvider>
    )
}