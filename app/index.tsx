import React from 'react'
import { Text, View } from 'react-native'

import "../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

const index = () => {


  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/(root)/(tabs)/home'} />
  }
  return (
<Redirect href={'/(auth)/sign-up'} />

  )
}

export default index