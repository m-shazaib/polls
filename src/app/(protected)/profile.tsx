import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../provider/AuthProvider'
import { Button } from '@rneui/themed'
import { Redirect, Stack } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';
import { enableScreens } from "react-native-screens";
enableScreens();


type Props = {}

const ProfileScreen = (props: Props) => {
  const { user } = useAuth();
  const [editField, setEditField] = useState(false);
  const [newEmail, setNewEmail] = useState(user?.email || '');

  if (!user) {
    return <Redirect href='/login' />
  }

  const handleCopy = async () => {
    await Clipboard.setStringAsync(user?.id);
    Alert.alert('Copied to clipboard', user?.id);
  };

  const handleEmailUpdate = async () => {
  
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) {
        Alert.alert('Error updating email', error.message);
      } else {
        Alert.alert('Success', 'Email sent for confirmation');
        setEditField(false);
      }
    
  };

  return (
    <LinearGradient style={[styles.container, { gap: 10, paddingBottom: 100 }]} colors={['#edfcf7', '#f6fcfa']}>
      <Stack.Screen options={{
        title: "Profile",
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
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/image/profile.jpg')} style={{ width: 100, height: 100 }} />
      </View>
      <View style={{ gap: 10 }}>
        <Pressable onPress={handleCopy} style={styles.field}>
          <Text style={styles.text}>User Id: </Text>
          <Text
            style={[styles.text, styles.userId]}
            numberOfLines={1}
            ellipsizeMode="middle"
          >  {user?.id} </Text>
        </Pressable>
        <View style={styles.field}>
          <Text style={styles.text}>Email: </Text>
          {editField ? (
            <TextInput
              style={styles.textInput}
              value={newEmail}
              onChangeText={setNewEmail}
              placeholder="Enter new email"
            />
          ) : (
            <Text style={styles.text}>{user?.email}</Text>
          )}
          <Feather
            name={editField ? 'check' : 'edit'}
            size={20}
            color='black'
            style={{ marginLeft: 10 }}
            onPress={() => {
              if (editField) {
                handleEmailUpdate();
              } else {
                setEditField(true);
              }
            }}
          />
        </View>
        <Pressable onPress={() => supabase.auth.signOut()} style={styles.button}>
          <Text style={[styles.text, {color: '#ffffff'}]}>Logout</Text>
        </Pressable>
      </View>
    </LinearGradient>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: .5,
    borderBottomColor: 'black',
  },
  text: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 20,
  },
  textInput: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flex: 1,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userId: {
    maxWidth: '60%',
  },
  button: {
    backgroundColor: '#018754',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  imageContainer:{
   borderRadius: 50,
    overflow: 'hidden',
    elevation: 10,
    //3d style
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

  }
});
