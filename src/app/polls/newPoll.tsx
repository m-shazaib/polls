import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { router, Stack } from 'expo-router'
import { useAuth } from '../../provider/AuthProvider';
import { supabase } from '../../lib/supabase';

type Props = {}

const CreatePoll = (props: Props) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['']);
    const [error, setError] = useState('');
    const { user } = useAuth();


    // useEffect(() => {
    //     if (!user) {
    //         Alert.alert('Error', 'You must be logged in to create a poll');
    //         router.push('/login');
    //         return;
    //     }
    // }, [user]);

    const createPoll = async () => {
        if(!user) {
            Alert.alert('Error', 'You must be logged in to create a poll');
            return;
        }
        if (!question) {
            setError('Question is required');
            return;
        }

        const validOptions = options.filter((o) => !!o);

        if (validOptions.length < 2) {
            setError('At least two options are required');
            return;
        }

        const { data, error } = await supabase
            .from('Poll')
            .insert([{ question, option: validOptions }]) 
            .select();

        if (error) {
            console.log(error);
            return;
        }
        router.back();
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
            <TextInput
                style={styles.input}
                value={question}
                onChangeText={setQuestion}
                placeholder='Type your question here'
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
                            right: 10
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

            <Button title='Add Option' onPress={() => setOptions([...options, ''])} />
            <Button title='Create Poll' onPress={createPoll} />
            <Text style={{ color: 'red' }}>{error}</Text>
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
