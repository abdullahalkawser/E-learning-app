import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router'; // for navigation

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signIn } = useSignIn();
  const router = useRouter(); // hook for navigation

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    try {
      if (!signIn) {
        throw new Error('Sign-in service is not available');
      }
  
      const signInAttempt = await signIn.create({
        identifier: email,
        password: password,
      });
  
      console.log('Sign-in attempt result:', signInAttempt); // Log the result to inspect
  
      if (signInAttempt.status === 'complete') {
        router.push('/welcome');
      } else {
        Alert.alert('Error', 'Failed to sign in');
      }
    } catch (error: any) {
      console.error('Login Error:', error);
      Alert.alert('Error', error.errors ? error.errors[0].message : 'Something went wrong during login.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#6c757d" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#6c757d" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      {/* Login Button */}
      <Button title="Login" onPress={handleLogin} />

      {/* Link to Sign-up */}
      <Text style={styles.link} onPress={() => router.push('/sign-up')}>
        Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  link: {
    fontSize: 16,
    textAlign: 'center',
    color: '#007bff',
    marginTop: 20,
  },
  linkText: {
    color: '#007bff',
  },
});

export default Login;
