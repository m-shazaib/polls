import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

type Props = {
    name: any;
    option: string;
    onPress: () => void;
    color: any;
    size: number;
    bg: any;
}

const Option = ({ name, option, size, onPress, color, bg }: Props) => {
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
        <Pressable onPress={onPress} style={[styles.optionContainer, bg]} >
            <Feather name={name} size={size} color={color} style={{ position: 'absolute', right: 10 }} />
            <Text>{option}</Text>
        </Pressable>
    )
}

export default Option

const styles = StyleSheet.create({
    optionContainer: {
        backgroundColor: '#bfe1d3',
        borderRadius: 5,
        padding: 10,
        elevation: 5,
        justifyContent: 'center',
    },
    option: {
        fontSize: 16,
        fontFamily: 'Ubuntu-Regular',
        color: '#000000',
    }
})