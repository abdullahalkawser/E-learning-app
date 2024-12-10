import React, { useEffect, useState } from 'react';
import {  View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

const MyCourse: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const savedCoursesJSON = await AsyncStorage.getItem('enrolledCourses');
      const savedCourses = savedCoursesJSON ? JSON.parse(savedCoursesJSON) : [];
      setCourses(savedCourses);
    };

    fetchCourses();
  }, []);

  if (courses.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No enrolled courses found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={'/(auth)/course'} style={styles.courseItem}>
            <Image source={{ uri: item.bannerUrl }} style={styles.banner} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.author}>By {item.author}</Text>
              <Text style={styles.time}>⏰ {item.time} Hours</Text>
            </View>
          </Link>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  emptyText: {
    fontSize: 20,
    color: '#888',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  courseItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: screenWidth - 32,
  },
  banner: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  details: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: '#009688',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#777',
    lineHeight: 20,
  },
});

export default MyCourse;
