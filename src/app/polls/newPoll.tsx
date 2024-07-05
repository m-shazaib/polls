import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { Stack } from 'expo-router'

type Props = {}

const CreatePoll = (props: Props) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['']);

    const createPoll = () => {
        console.warn('Create Poll');
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                title: 'Create Poll',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#00134F',
                },
                headerTintColor: 'white',
            }} />
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} value={question} onChangeText={setQuestion} placeholder='Type your question here' />


            <Text style={styles.label}>Option</Text>
            {options.map((option, index) => (
                <View key={index} style={{ justifyContent: "center" }}>
                    <TextInput style={styles.input} value={option} onChangeText={(text) => {
                        const newOptions = [...options];
                        newOptions[index] = text;
                        setOptions(newOptions);
                    }} placeholder={`Option ${index + 1}`} />
                    <Entypo style={{position: "absolute",
                     right: 10 }}  name="cross" size={24} color="black" 
                        onPress={() => {
                            const newOptions = [...options];
                            newOptions.splice(index, 1);
                            setOptions(newOptions);
                        }
                        }
                    />
                </View>
            ))}
            <Button title='Add Option' onPress={() => setOptions([...options, ''])} />

            <Button title='Create Poll' onPress={createPoll} />

        </View>
    )
}

export default CreatePoll

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10,
    },
    label: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
    },
    input: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },

})