import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'
import { useAuth } from '../../provider/AuthProvider'

type Props = {}

const AuthLayout = (props: Props) => {
  
  const {user} = useAuth();

    if(user){
        return <Redirect href='/profile' />
    }
  
  
    return <Slot />;
}

export default AuthLayout