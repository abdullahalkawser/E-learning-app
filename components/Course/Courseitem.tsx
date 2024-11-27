import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';

type CourseItemProps = {
  item: {
    id: string;
    name: string;
    author: string;
    time: string; // Ensure `time` is a string
    chaptars: string; // Ensure `chaptars` is a string
    price: string;
    banner: { url: string };
  };
};

const Courseitem: React.FC<CourseItemProps> = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: 'white', marginRight: 10, borderRadius: 10, padding: 10 }}>
      {/* Course Banner */}
      <Image
        source={{ uri: item.banner?.url || 'https://via.placeholder.com/210x120' }}
        style={{ width: 210, height: 120, borderRadius: 10 }}
      />

      {/* Course Title */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>{item.name}</Text>

      {/* Details Row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
        {/* Chapters */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons size={20} name="book-outline" color="#555" />
          <Text style={{ paddingLeft: 5, fontSize: 14, color: '#555' }}>{item.chaptars} chapters</Text>
        </View>

        {/* Time */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons size={20} name="time-outline" color="#555" />
          <Text style={{ paddingLeft: 5, fontSize: 14, color: '#555' }}>{item.time} h</Text>
        </View>
      </View>

      {/* Price */}
      <Text style={{ marginTop: 10, fontSize: 16, color: '#000', fontWeight: 'bold' }}>
        {Number(item.price) === 0 ? 'Free' : `$${item.price}`}
      </Text>

      {/* Details Link */}
      <Link
        href={{
          pathname: '/(auth)/News',
          params: { coursse: item }, // Pass any params if required
        }}
        style={{
          marginTop: 10,
          paddingVertical: 8,
          backgroundColor: '#0000ff',
          borderRadius: 5,
          textAlign: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Details</Text>
      </Link>
    </View>
  );
};

export default Courseitem;
