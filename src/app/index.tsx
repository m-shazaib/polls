import { Alert, Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Poll } from '../lib/db';




export default function HomeScreen() {
    const [polls, setPolls] = useState<Poll[]>([]);

    

    useEffect(() => {
        const fetchPolls = async () => {

            
            console.log('fetching...');

            

            let { data, error } = await supabase.from('Poll').select('*')

            if (error) {
                Alert.alert('Error', error.message);
            }
            console.log(data);
            setPolls(data as unknown as Poll[]);
        };
        fetchPolls();
    }, []);

    return (
        <>
            <Stack.Screen options={{
                title: 'Polls',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#00134F',
                },
                headerTintColor: 'white',
                headerRight: () => (<Link href={'/polls/newPoll'}>
                    <AntDesign name="plus" size={20} color="white" style={{ alignSelf: 'center' }} />
                </Link>),
                headerLeft: () => (<Link href={'/profile'}>
                    <AntDesign name="user" size={20} color="white" style={{ alignSelf: 'center' }} />
                </Link>),
            }} />
            <FlatList
                data={polls}
                scrollEnabled
                contentContainerStyle={styles.pollsContainer}
                renderItem={({ item }) => (
                    <Link style={styles.poll} href={`/polls/${item.id}`}>
                    <Text >{item.question}</Text>
                    </Link>
                )}
            />


        </>

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
        fontWeight: 'bold',
        borderRadius: 5,
        fontSize: 20,
        backgroundColor: '#fff',
        borderColor: '#00134F',
        borderWidth: 1.5,
        padding: 10,
        elevation: 5,
    },

});
