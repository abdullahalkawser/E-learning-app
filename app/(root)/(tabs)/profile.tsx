import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons from Expo
import { useRouter } from 'expo-router'; // Import for navigation

// Define types for the user object
interface User {
  firstName: string;
  emailAddress: string;
  imageUrl?: string; // Optional profile image URL
}

const Profile = () => {
  // Using Clerk hooks to get user information with TypeScript annotations
  const { user, isLoaded, error } = useUser(); // user is of type User | undefined
  const { signOut } = useAuth(); // Hook for authentication actions like sign-out
  const router = useRouter(); // Hook for navigation

  // Loading state for Clerk user data
  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  // Error state for Clerk user data fetching
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error loading user data. Please try again later.</Text>
      </SafeAreaView>
    );
  }

  // If user is undefined, display a fallback message
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No user data available.</Text>
      </SafeAreaView>
    );
  }

  // Handle sign-out and settings navigation
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/(auth)/sign-in');
    } catch (error) {
      console.error('Sign out failed:', error);
      alert('Failed to sign out. Please try again later.');
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Displaying profile image and name */}
        <Image
          source={{ uri: user.imageUrl || 'https://example.com/default-avatar.png' }}
          style={styles.profileImage}
        />
        <Text style={styles.welcomeText}>Welcome, {user.firstName}!</Text>

        {/* Displaying email */}
        <View style={styles.infoRow}>
          <Ionicons name="mail" size={20} color="white" />
          <Text style={styles.infoText}>{user?.primaryEmailAddress?.emailAddress}</Text>
        </View>

        {/* Settings and Logout buttons with icons */}
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="settings" size={24} color="white" />
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleSignOut}>
          <Ionicons name="log-out" size={24} color="white" />
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles for the Profile component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'blue', // Darker container to pop the profile info
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // White text for better contrast
    marginBottom: 16,
    textAlign: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#FF6347', // A nice orange border around the profile image
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#D3D3D3', // Light gray color for email text
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#FF6347', // Vibrant button color
    borderRadius: 10,
    width: 200,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  actionText: {
    marginLeft: 12,
    fontSize: 18,
    color: '#fff', // White text on the action buttons for better contrast
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#FF6347', // Error text in a bright color
    textAlign: 'center',
  },
});

export default Profile;
