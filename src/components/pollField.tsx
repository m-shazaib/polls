import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    question: string;
    href: string;
    style?: any;
}

const PollField = ({ question, href, style }: Props) => {

    const [fontsLoaded, fontError] = useFonts({
        'Ubuntu-Regular': require('../../assets/fonts/Ubuntu-Regular.ttf'),
        'Ubuntu-Bold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
        'Ubuntu-Light': require('../../assets/fonts/Ubuntu-Light.ttf'),
        'Ubuntu-Medium': require('../../assets/fonts/Ubuntu-Medium.ttf'),
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (

        <Pressable style={styles.questionContainer} onPress={() => router.push(href)}>
            <Ionicons name="arrow-forward" size={24} color="black" style={{ position: 'absolute', right: 10 }} />
            <Text style={styles.question}>{question}</Text>
        </Pressable>
    );
}

export default PollField;

const styles = StyleSheet.create({
    questionContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: '#edfcf7',
        height: 50,
        justifyContent: 'center',
        elevation: 5,
        borderRadius: 10,
        borderColor: '#BFE1D4',
        borderWidth: 1,
    },
    question: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 18,
        color: '#000000',
    }
});
