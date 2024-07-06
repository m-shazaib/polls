import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../provider/AuthProvider'
import { Button } from '@rneui/themed'
import { Redirect } from 'expo-router'


type Props = {}

const ProfileScreen = (props: Props) => {
    const {user} = useAuth();
    
    if(!user){
        return <Redirect href='/login' />
    }
  
  return (
    <View>
      <Text>User id: {user?.id} </Text>
      <Button onPress={() => supabase.auth.signOut()}>Sign Out</Button>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})