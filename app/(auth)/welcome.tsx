import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView className="flex h-full bg-white relative">

      {/* Skip Button - Top Right */}
      <TouchableOpacity
        className="absolute top-5 right-5 p-3"
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
      >
        <Text className="text-black text-lg font-semibold mt-4">Skip</Text>
      </TouchableOpacity>

      {/* Image on Top */}
      <View className="flex justify-center items-center mb-4 w-full mt-9">
        <Image
          source={{ uri: 'https://media.licdn.com/dms/image/v2/C5612AQEaM_vC_o-_pQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1611902306765?e=2147483647&v=beta&t=i9QtoIEh1eKSKHQI62707_aWfdGPqk_0hM-55KuapeU' }}
          className="w-full h-[300px] rounded-2xl shadow-lg"
          resizeMode="cover"
        />
      </View>

      {/* Text Content */}
      <View className="flex justify-center items-center px-6 mt-4 space-y-7">
        {/* Welcome Text */}
        <Text className="text-3xl font-bold text-center text-gray-800">
          Welcome to Our New E-Learning Apps
        </Text>

        {/* Description Text */}
        <Text className="text-lg font-medium text-center text-gray-500 leading-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum libero voluptate, excepturi iste esse.
        </Text>

        {/* Get Started Button */}
        <View className="mt-5 items-center">
          <TouchableOpacity
            className="bg-blue-600 w-52 py-3 rounded-lg shadow-md items-center transform active:scale-95 transition-transform duration-150 ease-in-out"
            onPress={() => {
              // Add your button's action here
            }}
          >
            <Text className="text-white font-semibold text-lg">Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
