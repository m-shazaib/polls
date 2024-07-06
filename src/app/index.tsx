import { Alert, Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

//const polls = [{ id: 1 }, { id: 2 }, { id: 3 }];

export default function HomeScreen() {
    const [polls, setPolls] = useState<Database>([""]);

    useEffect(() => {
       const fetchPolls = async() =>{

           console.log('fetching...');
           
           
           let { data, error } = await supabase.from('Poll').select('*')

           if(error){
            Alert.alert('Error', error.message); 
           }
           console.log(data);
           setPolls(data);
        };
        fetchPolls();
    },[]);

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
                    <AntDesign name="plus" size={24} color="white" style={{ alignSelf: 'center' }} />
                </Link>)
            }} />
            <FlatList
                data={polls}
                scrollEnabled
                contentContainerStyle={styles.container}
                renderItem={({ item }) => (
                   
                        <Text style={styles.poll}>Example Poll Question</Text>
                )}
            />


        </>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 5,
    },
    pollsContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
    },
    poll: {
        fontWeight: 'bold',
        fontSize: 20,
    },

});
