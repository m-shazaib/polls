import { ActivityIndicator, Alert, Button, Pressable, StyleSheet, Text, View } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Poll, Vote } from '../../lib/db';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../provider/AuthProvider';
import Option from '@/components/option';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

type Props = {}

const details = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [poll, setPoll] = useState<Poll>(null);
  const [selected, setSelected] = useState('');
  const [userVote, setUserVote] = useState<Vote>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { user } = useAuth();
  const [fontsLoaded, fontError] = useFonts({
    'Ubuntu-Regular': require('../../../assets/fonts/Ubuntu-Regular.ttf'),
    'Ubuntu-Bold': require('../../../assets/fonts/Ubuntu-Bold.ttf'),
    'Ubuntu-Light': require('../../../assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu-Medium': require('../../../assets/fonts/Ubuntu-Medium.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }


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

    const fetchVote = async () => {
      let { data, error } = await supabase
        .from('vote')
        .select('option')
        .eq('poll_id', poll.id)
        .eq('user_id', user?.id)
        .select();

      if (error) {
        Alert.alert('Error', error.message);
      }

      if (data && data.length > 0) {
        setUserVote(data.option)
      }
    }

    fetchPolls();
    fetchVote();
  }, []);

  const vote = async () => {
    const newVote = {
      option: selected,
      poll_id: poll.id,
      user_id: user?.id,
    };
    if (userVote) {
      newVote.id = userVote.id;
    }
    const { data, error } = await supabase
      .from('vote')
      .upsert([newVote])
      .select()
      .single();

    if (error) {
      console.log(error);
      Alert.alert('Failed to vote');
    } else {
      setUserVote(data);
      Alert.alert('Thank you for your vote');
    }

  }
  return (
    <LinearGradient style={{ flex: 1 }} colors={['#edfcf7', '#f6fcfa']}>
      <Stack.Screen options={{
        title: "Poll Voting",
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
      {!poll && <ActivityIndicator size={'large'} />}
      {poll && <View style={styles.container}>
        <Text style={styles.question}>{poll.question}</Text>
        <View style={{ gap: 10 }}>
          {poll.option.map((option) => (
            // <Pressable onPress={() => setSelected(option)} key={option} style={styles.optionContainer}>
            //   <Feather name={selected === option ? "check-circle" : "circle"}
            //     size={18}
            //     color={selected === option ? "green" : "black"} />
            //   <Text style={styles.option}>{option}</Text>
            // </Pressable>
            <Option key={option} name={selected === option ? "check-circle" : "circle"} option={option} onPress={() => setSelected(option)} color={selected === option ? 'green' : 'black'} size={18} bg={{ backgroundColor: selected === option ? '#bfe1d3' : '#edfcf8' }} />
          ))}
        </View>
        <Pressable onPress={vote} onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => setIsHovered(false)}
          style={[styles.button, isHovered && styles.buttonHovered]} >
          <Text style={styles.buttonText} >Vote</Text>
        </Pressable>
      </View>}
    </LinearGradient>
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
  button: {
    backgroundColor: '#018754',
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Ubuntu-Bold',
  },
  buttonHovered: {
    backgroundColor: '#019a61',
  }

})