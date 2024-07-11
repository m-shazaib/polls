import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useAuth } from "../../provider/AuthProvider";
import { supabase } from "../../lib/supabase";
import { LinearGradient } from "expo-linear-gradient";

type Props = {};

const CreatePoll = (props: Props) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [error, setError] = useState("");
  const { user, isAuthenticated } = useAuth();

  // useEffect(() => {
  //     if (!user) {
  //         Alert.alert('Error', 'You must be logged in to create a poll');
  //         router.push('/login');
  //         return;
  //     }
  // }, [user]);

  const createPoll = async () => {
    if (!user || !isAuthenticated) {
      Alert.alert("Error", "You must be logged in to create a poll", [
        { text: "OK" },
      ]);
      return;
    }
    if (!question) {
      setError("Question is required");
      return;
    }

    const validOptions = options.filter((o) => !!o);

    if (validOptions.length < 2) {
      setError("At least two options are required");
      return;
    }

    const { data, error } = await supabase
      .from("Poll")
      .insert([{ question, option: validOptions }])
      .select();

    if (error) {
      return;
    }
    router.back();
    // console.warn("Create Poll");
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#edfcf7", "#f6fcfa"]}>
      <Stack.Screen
        options={{
          title: "Create Poll",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#d4f0ea",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontFamily: "Ubuntu-Bold",
            fontSize: 20,
          },
        }}
      />
      <View style={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={setQuestion}
          placeholder="Type your question here"
        />

        <Text style={styles.label}>Options</Text>
        {options.map((option, index) => (
          <View key={index} style={{ justifyContent: "center" }}>
            <TextInput
              style={styles.input}
              value={option}
              onChangeText={(text) => {
                const updated = [...options];
                updated[index] = text;
                setOptions(updated);
              }}
              placeholder={`Option ${index + 1}`}
            />
            <Entypo
              style={{
                position: "absolute",
                right: 10,
                zIndex: 1,
              }}
              name="cross"
              size={24}
              color="black"
              onPress={() => {
                const updated = [...options];
                updated.splice(index, 1);
                setOptions(updated);
              }}
            />
          </View>
        ))}
      </View>
      <View style={{ gap: 15, padding: 10 }}>
        <Pressable
          style={styles.button}
          onPress={() => setOptions([...options, ""])}>
          <Text
            style={{
              fontFamily: "Ubuntu-Bold",
              color: "#ffffff",
              textAlign: "center",
            }}>
            Add Option
          </Text>
        </Pressable>

        <Pressable style={styles.button} onPress={createPoll}>
          <Text
            style={{
              fontFamily: "Ubuntu-Bold",
              color: "#ffffff",
              textAlign: "center",
            }}>
            Create Poll
          </Text>
        </Pressable>
      </View>
      {error && (
        <View style={{ backgroundColor: "#ff666e" }}>
          <Text
            style={{
              color: "red",
              fontFamily: "Ubuntu-Medium",
              fontSize: 18,
              paddingHorizontal: 15,
            }}>
            {error}
          </Text>
        </View>
      )}
    </LinearGradient>
  );
};

export default CreatePoll;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: "Ubuntu-Bold",
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  input: {
    backgroundColor: "#d4f0f5",
    padding: 10,
    borderRadius: 5,
    borderColor: "#00134F",
    borderWidth: 1.5,
    fontFamily: "Ubuntu-Regular",
    fontSize: 15,
    elevation: 5,
  },
  button: {
    backgroundColor: "#018754",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
});
