import * as React from 'react';
import { TextInput, Button, View, Text, Alert, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    setIsLoading(true);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert('Sign-Up Error', err.errors ? err.errors[0].message : 'Something went wrong during sign-up.');
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
  
    setIsLoading(true);
  
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
  
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/(root)/(tabs)/home');
      } else {
        Alert.alert('Verification Error', 'Verification failed. Please check the code and try again.');
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      Alert.alert('Verification Error', err.errors ? err.errors[0].message : 'Something went wrong during verification.');
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' }}>
      {/* Top Banner Image */}
      <Image
        source={{ uri: 'https://example.com/your-banner-image.jpg' }} // Replace with your image URL
        style={{ width: '100%', height: 200, resizeMode: 'cover', marginBottom: 20 }}
      />
      
      {isLoading && <ActivityIndicator size="large" color="#3b82f6" style={{ marginBottom: 20 }} />}
      
      {!isLoading && !pendingVerification && (
        <View style={{ width: '85%', padding: 20, backgroundColor: '#fff', borderRadius: 10, elevation: 3, shadowColor: '#000' }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' }}>
            Create Account
          </Text>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            onChangeText={(email) => setEmailAddress(email)}
            style={{
              borderWidth: 1,
              borderColor: '#e5e7eb',
              backgroundColor: '#f3f4f6',
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingVertical: 12,
              marginBottom: 15,
              fontSize: 16,
              color: '#111827',
            }}
          />
          <TextInput
            value={password}
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            style={{
              borderWidth: 1,
              borderColor: '#e5e7eb',
              backgroundColor: '#f3f4f6',
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingVertical: 12,
              marginBottom: 20,
              fontSize: 16,
              color: '#111827',
            }}
          />
          <TouchableOpacity
            onPress={onSignUpPress}
            style={{
              backgroundColor: '#3b82f6',
              paddingVertical: 15,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isLoading && pendingVerification && (
        <View style={{ width: '85%', padding: 20, backgroundColor: '#fff', borderRadius: 10, elevation: 3, shadowColor: '#000' }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' }}>
            Verify Your Email
          </Text>
          <TextInput
            value={code}
            placeholder="Verification Code"
            placeholderTextColor="#9ca3af"
            onChangeText={(code) => setCode(code)}
            style={{
              borderWidth: 1,
              borderColor: '#e5e7eb',
              backgroundColor: '#f3f4f6',
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingVertical: 12,
              marginBottom: 20,
              fontSize: 16,
              color: '#111827',
            }}
          />
          <TouchableOpacity
            onPress={onPressVerify}
            style={{
              backgroundColor: '#10b981',
              paddingVertical: 15,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
