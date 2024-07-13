import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { Link, Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Poll } from "../lib/db";
import PollField from "../components/pollField";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { enableScreens } from "react-native-screens";
enableScreens();

export default function HomeScreen() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded, fontError] = useFonts({
    "Ubuntu-Regular": require("../../assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Bold": require("../../assets/fonts/Ubuntu-Bold.ttf"),
    "Ubuntu-Light": require("../../assets/fonts/Ubuntu-Light.ttf"),
    "Ubuntu-Medium": require("../../assets/fonts/Ubuntu-Medium.ttf"),
  });

  useEffect(() => {
    const fetchPolls = async () => {
      let { data, error } = await supabase.from("Poll").select("*");
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        setPolls(data as unknown as Poll[]);
      }
      setLoading(false);
    };
    fetchPolls();
  }, []);

  if (!fontsLoaded) {
    return (
      <ActivityIndicator
        style={{ alignSelf: "center" }}
        size="large"
        color="#018754"
      />
    );
  }

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#edfcf7", "#f6fcfa"]}>
      <Stack.Screen
        options={{
          title: "Polls",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#d4f0ea",
          },
          headerTitleStyle: {
            fontFamily: "Ubuntu-Bold",
            fontSize: 20,
          },
          headerTintColor: "#000000",
          headerRight: () => (
            <Link href={"/polls/newPoll"}>
              <AntDesign
                name="plus"
                size={20}
                style={{ alignSelf: "center" }}
              />
            </Link>
          ),
          headerLeft: () => (
            <Link href={"/profile"}>
              <AntDesign
                name="user"
                size={20}
                style={{ alignSelf: "center" }}
              />
            </Link>
          ),
        }}
      />
      {loading ? (
        <ActivityIndicator
          style={{ alignSelf: "center" }}
          size="large"
          color="#018754"
        />
      ) : (
        <FlatList
          data={polls}
          scrollEnabled
          contentContainerStyle={styles.pollsContainer}
          renderItem={({ item }) => (
            <PollField question={item.question} href={`/polls/${item.id}`} />
          )}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  pollsContainer: {
    gap: 10,
    padding: 10,
  },
  poll: {
    fontWeight: "bold",
    borderRadius: 5,
    fontSize: 20,
    backgroundColor: "#fff",
    borderColor: "#00134F",
    borderWidth: 1.5,
    padding: 10,
    elevation: 5,
  },
});
