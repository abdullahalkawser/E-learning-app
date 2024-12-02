import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Chapture from '@/components/Course/Chapture';

type ChapterContent = {
  heading: string;
  description: { markdown: string };
  output: { markdown: string };
};

type Chapter = {
  id: string;
  title: string;
  content: ChapterContent[];
};

const News: React.FC = () => {
  const query = useLocalSearchParams();

  const {
    id,
    name,
    author,
    time,
    chapters,
    price,
    bannerUrl,
    description,
  } = query as {
    id: string;
    name: string;
    author: string;
    time: string;
    chapters: string | Chapter[];
    price: string;
    bannerUrl: string;
    description: string;
  };

  let parsedChapters: Chapter[] = [];

  // Parse chapters if it's a string
  if (typeof chapters === 'string') {
    try {
      parsedChapters = JSON.parse(chapters);
    } catch (error) {
      console.error('Failed to parse chapters:', error);
      parsedChapters = [];
    }
  } else if (Array.isArray(chapters)) {
    parsedChapters = chapters;
  }

  return (
    <ScrollView className='p-3'>

      <View className='bg-gray-200 p-4 rounded-xl'>


      {/* Banner */}
      {bannerUrl && <Image source={{ uri: bannerUrl }} style={styles.banner} />}

      {/* Title */}
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.author}>By {author}</Text>

      {/* Details */}
      <View style={styles.detailsRow}>
        <Text>{time} hours</Text>
      </View>
      <Text style={styles.price}>
        {Number(price) === 0 ? 'Free' : `$${price}`}
      </Text>

      {/* Description */}
      <Text style={styles.sectionTitle}>Description</Text>
      <Text>{description}</Text>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enroll Free</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Membership $10.89/Mon</Text>
        </TouchableOpacity>
      </View>

      {/* Render Chapture Component */}



      </View>
  <View className='bg-gray-200  mt-6  rounded-xl'>
  <Text className='text-2xl font-bold'>Chaptures</Text>
  <Chapture
        coursettt={{
          chapters: parsedChapters,
        }}
      />

  </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  author: {
    fontSize: 16,
    color: '#777',
    marginTop: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  price: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default News;
