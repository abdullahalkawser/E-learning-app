import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Chapture from '@/components/Course/Chapture';
import { useUser } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Course: React.FC = () => {
  const query = useLocalSearchParams();
  const { user } = useUser();

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

  const router = useRouter();

  const handleEnrollment = async () => {
    try {
      // Retrieve existing courses from AsyncStorage
      const existingCoursesJSON = await AsyncStorage.getItem('enrolledCourses');
      const existingCourses = existingCoursesJSON ? JSON.parse(existingCoursesJSON) : [];
  
      // Check if the course is already enrolled
      const isAlreadyEnrolled = existingCourses.some((course: { id: string; }) => course.id === id);
  
      if (!isAlreadyEnrolled) {
        // Add the new course to the list
        const updatedCourses = [...existingCourses, {
          id,
          name,
          author,
          time,
          price,
          description,
          bannerUrl,
        }];
  
        // Save the updated list back to AsyncStorage
        await AsyncStorage.setItem('enrolledCourses', JSON.stringify(updatedCourses));
  
        console.log('Course enrolled successfully!');
      } else {
        console.log('You are already enrolled in this course.');
      }
  
      // Navigate to the "My Course" page
      router.push({
        pathname: '/(root)/(tabs)/mycourse',
      });
    } catch (error) {
      console.error('Error saving course details:', error);
    }
  };

  let parsedChapters: Chapter[] = [];

  if (typeof chapters === 'string') {
    try {
      parsedChapters = JSON.parse(chapters);
    } catch (error) {
      console.error('Failed to parse chapters:', error);
    }
  } else if (Array.isArray(chapters)) {
    parsedChapters = chapters;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.courseDetails}>
        {bannerUrl && <Image source={{ uri: bannerUrl }} style={styles.banner} />}
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.author}>By {author}</Text>
        <Text style={styles.details}>{time} hours</Text>
        <Text style={styles.price}>
          {Number(price) === 0 ? 'Free' : `$${price}`}
        </Text>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text>{description}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEnrollment}>
            <Text style={styles.buttonText}>Enroll Free</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Membership $10.89/Mon</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.chapters}>
        <Text style={styles.sectionTitle}>Chapters</Text>
        <Chapture coursettt={{ chapters: parsedChapters }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  courseDetails: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  author: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  details: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
  price: {
    marginTop: 8,
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
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  chapters: {
    marginTop: 16,
  },
});

export default Course;
