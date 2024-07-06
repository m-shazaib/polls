import { Stack } from "expo-router";
import HomeScreen from ".";
import AuthProvider from "../provider/AuthProvider";

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack />
        </AuthProvider>
    )
}