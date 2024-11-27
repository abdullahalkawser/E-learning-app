import React from 'react';

import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';



export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].gray,
          headerShown: false,
          tabBarBackground: () => (
            <View style={[styles.tabBarBackground, colorScheme === 'dark' && styles.tabBarDark]} />
          ),
          tabBarStyle: [styles.tabBarStyle, Platform.OS === 'ios' && styles.tabBarIOS],
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />,
          }}
        />
        My Courses Tab */}
        <Tabs.Screen
          name="mycourse"
          options={{
            title: 'My Courses',
            tabBarIcon: ({ color }) => <Ionicons size={28} name="book-outline" color={color} />,
          }}
        />
  
        <Tabs.Screen
          name="Leaderbord"
          options={{
            title: 'Leaderboard',
            tabBarIcon: ({ color }) => <Ionicons size={28} name="bar-chart-outline" color={color} />,
          }}
        />
        {/* Profile Tab */}
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <Ionicons size={28} name="person-outline" color={color} />,
          }}
        />
      </Tabs>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    borderTopWidth: 0,
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 9, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 20,
    justifyContent: 'center', // Center items vertically
  },
  tabBarIOS: {
    backgroundColor: 'transparent',
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  tabBarDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  tabBarItemStyle: {
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
  },
  tabBarLabelStyle: {
    fontSize: 12, // Adjust label font size
  },
});
