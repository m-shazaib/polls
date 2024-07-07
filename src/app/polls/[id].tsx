import { ActivityIndicator, Alert, Button, Pressable, StyleSheet, Text, View } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Poll } from '../../lib/db';
import { supabase } from '../../lib/supabase';

type Props = {}



const details = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [poll, setPoll] = useState<Poll>(null);
  const [selected, setSelected] = useState('');


  
  
  useEffect(() => {
    const fetchPolls = async () => {
      
      
      console.log('fetching...');
      
      let { data: Poll, error } = await supabase
        .from('Poll')
        .select('*').eq('id', Number.parseInt(id ?? '')).single();
      

      
      if (error) {
          Alert.alert('Error', error.message);
      }

      setPoll(Poll as unknown as Poll);
     
  };
  fetchPolls();
}, []);

  const vote = () => {
    console.warn('Voted for', selected);
  }

  if(!poll){
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: "Poll Voting", 
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#00134F',
        },
        headerTintColor: 'white',
      }} />
      <Text style={styles.question}>{poll.question}</Text>
      <View style={{ gap: 10 }}>

        {poll.option.map((option) => (
          <Pressable onPress={() => setSelected(option)} key={option} style={styles.optionContainer}>
            <Feather name={selected === option ? "check-circle" : "circle"}
              size={18}
              color={selected === option ? "green" : "black"} />
            <Text style={styles.option}>{option}</Text>
          </Pressable>
        ))}
      </View>

      <Button title='Vote' onPress={vote} />
    </View>
  )
}

export default details

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
  },
  optionContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  option: {
    fontSize: 16,
  },

})