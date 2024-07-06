import React from 'react'
import { useAuth } from '../../provider/AuthProvider'
import { Redirect, Slot } from 'expo-router'

type Props = {}

const ProtectedLayout = (props: Props) => {
  const {user} = useAuth();

    if(!user){
        return <Redirect href='/login' />
    }

    return <Slot />
}

export default ProtectedLayout