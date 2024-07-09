import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, Button, TextInput, Text, Pressable } from 'react-native'
import { supabase } from '../../lib/supabase'
import { LinearGradient } from 'expo-linear-gradient'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({ email, password })


    if (error) Alert.alert(error.message)
    else if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#edfcf7', '#f6fcfa']}>

      <View style={styles.container}>

        <Text style={styles.text}> Sign-in or Sign-up </Text>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
            style={styles.input}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
            style={styles.input}
          />
        </View>

        <View style={{ gap: 10, padding: 10 }}>

          <Pressable style={styles.button} onPress={signInWithEmail}>
            <Text style={{ fontFamily: 'Ubuntu-Medium', color: '#ffffff', textAlign: 'center', fontSize: 15 }}>Sign In</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={signUpWithEmail}>
            <Text style={{ fontFamily: 'Ubuntu-Medium', color: '#ffffff', textAlign: 'center', fontSize: 15 }}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    backgroundColor: '#d4f0f5',
    padding: 10,
    borderRadius: 5,
    borderColor: '#00134F',
    borderWidth: 1.5,
    fontFamily: 'Ubuntu-Regular',
    fontSize: 15,
    elevation: 5,
  },
  button: {
    backgroundColor: '#018754',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  text: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000000',
  },
})