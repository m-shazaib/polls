import { Link, Stack } from "expo-router";
import AuthProvider from "../provider/AuthProvider";
import { AntDesign } from "@expo/vector-icons";

export default function RootLayout() {
    return (
        
        <AuthProvider>
            
            <Stack >
                <Stack.Screen name="index" options={{ title: "Home" }} />
                <Stack.Screen name="(protected)" options={{
                    title: "Profile",
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#d4f0ea',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Ubuntu-Bold',
                        fontSize: 20,
                    },
                    headerTintColor: 'black',
                }} />
                <Stack.Screen name="(auth)" options={{
                    title: "Login",
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#d4f0ea',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Ubuntu-Bold',
                        fontSize: 20,
                    },
                    headerTintColor: 'black',
                    headerLeft: () => (
                        <Link href={'/'}>
                            <AntDesign name="home" size={24} style={{ alignSelf: 'center', }} />
                        </Link>),
                }} />
            </Stack>
        </AuthProvider>
    )
}