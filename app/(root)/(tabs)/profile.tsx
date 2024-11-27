import React from 'react';
import { Text, View, Image, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth, useUser } from '@clerk/clerk-expo';

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

  // Loading state for Clerk user data
  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // Error state for Clerk user data fetching
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error loading user data. Please try again later.</Text>
      </SafeAreaView>
    );
  }

  // If user is undefined, display a fallback message
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No user data available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Displaying user information */}
        <Text style={styles.welcomeText}>Welcome, {user.firstName}!</Text>
        <Text>Email: {user.emailAddress}</Text>
        
        {/* Displaying profile image if available */}
        {user.imageUrl && (
          <Image
            source={{ uri: user.imageUrl }}
            style={styles.profileImage}
          />
        )}

        {/* Sign-out button */}
        <Button title="Sign out" onPress={() => signOut()} />
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
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default Profile;
