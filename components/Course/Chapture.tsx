import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

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

type ChaptureProps = {
  coursettt: {
    chapters: Chapter[];
  };
};

const Chapture: React.FC<ChaptureProps> = ({ coursettt }) => {
  const { chapters } = coursettt;

  if (!Array.isArray(chapters) || chapters.length === 0) {
    return (
      <View style={styles.noChaptersContainer}>
        <Text style={styles.noChaptersText}>No chapters available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {chapters.map((chapter, index) => (
        <View key={chapter.id || index} style={styles.chapterContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.chapterTitle}>{chapter.title}</Text>
            <Link
              style={styles.iconButton}
              href={{
                pathname: '/(auth)/chapture',
                params: { chapter: JSON.stringify(chapter) },
              }}
            >
              <Ionicons name="arrow-forward-circle" size={24} color="#007bff" />
            </Link>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 10,
  },
  chapterContainer: {
    padding: 12,
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    marginTop: 8,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 4,
  },
  noChaptersContainer: {
    backgroundColor: '#f8d7da',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  noChaptersText: {
    color: '#721c24',
    fontSize: 18,
  },
});

export default Chapture;
