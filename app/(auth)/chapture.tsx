import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import Swiper from 'react-native-swiper';

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

const CourseChapture: React.FC = () => {
  const query = useLocalSearchParams<{ chapter: string }>();
  const { chapter } = query;
  const [fadeAnim] = useState(new Animated.Value(0)); // Fade animation

  if (!chapter) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.noContentText}>No chapter data available</Text>
      </SafeAreaView>
    );
  }

  let parsedChapter: Chapter | null = null;
  try {
    parsedChapter = JSON.parse(chapter);
  } catch (error) {
    console.error('Error parsing chapter:', error);
  }

  if (!parsedChapter || !Array.isArray(parsedChapter.content)) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.noContentText}>Invalid chapter structure</Text>
      </SafeAreaView>
    );
  }

  // Fade In effect when content is loaded
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.chapterTitle}>{parsedChapter.title}</Text>

        <Swiper
          style={styles.swiper}
          showsPagination={false}
          loop={false}
        >
          {parsedChapter.content.map((content, contentIndex) => (
            <Animated.View
              key={contentIndex}
              style={[
                styles.contentContainer,
                {
                  backgroundColor:
                    contentIndex % 2 === 0 ? '#d1e7dd' : '#f8d7da',
                  opacity: fadeAnim,
                },
              ]}
            >
              <Text style={styles.contentHeading}>{content.heading}</Text>
              <Text style={styles.contentText}>
                {content.description?.markdown || 'Description not available'}
              </Text>
              <View style={styles.outputContainer}>
                <Text style={styles.outputText}>
                  {content.output?.markdown || 'Output not available'}
                </Text>
              </View>
            </Animated.View>
          ))}
        </Swiper>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensure SafeAreaView takes up the full height of the screen
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 40,
    flexGrow: 1, // Ensures ScrollView grows to fill available space
  },
  chapterTitle: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  swiper: {
    height: 'auto',
    marginBottom: 40,
  },
  contentContainer: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  contentHeading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 10,
  },
  outputContainer: {
    padding: 12,
    backgroundColor: '#2e2e2e',
    borderRadius: 8,
  },
  outputText: {
    color: '#f1f1f1',
    fontSize: 14,
    lineHeight: 20,
  },
  noContentText: {
    fontSize: 18,
    color: '#ff4d4d',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CourseChapture;
