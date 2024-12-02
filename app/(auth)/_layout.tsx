import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';



export default function Layout() {
  return (
    <Stack>
     
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="news" />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="not-found" />
     
    </Stack>
  );
}
