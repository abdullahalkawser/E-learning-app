import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

// Define types for Chapter Content and Chapters
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

// Define props for CourseItem
type CourseItemProps = {
  item: {
    id: string;
    name: string;
    author: string;
    time: string;
    chapters: string | Chapter[];
    price: string;
    banner: { url: string };
    description: { markdown: string };
  };
};

const Courseitem: React.FC<CourseItemProps> = ({ item }) => {
  // Parse chapters if it's a string
  let chapters: Chapter[] = [];
  if (typeof item.chapters === 'string') {
    try {
      chapters = JSON.parse(item.chapters);
    } catch (error) {
      console.error('Failed to parse chapters:', error);
    }
  } else {
    chapters = item.chapters;
  }

  return (
    <View style={styles.container}>
      {/* Course Banner */}
      <Image
        source={{ uri: item.banner?.url || 'https://via.placeholder.com/210x120' }}
        style={styles.bannerImage}
      />

      {/* Course Title */}
      <Text style={styles.title}>{item.name}</Text>

      {/* Details Row */}
      <View style={styles.detailsRow}>
        {/* Chapters */}
        <View style={styles.detail}>
          <Ionicons size={20} name="book-outline" color="#555" />
          <Text style={styles.detailText}>{chapters.length} chapters</Text>
        </View>

        {/* Time */}
        <View style={styles.detail}>
          <Ionicons size={20} name="time-outline" color="#555" />
          <Text style={styles.detailText}>{item.time} h</Text>
        </View>
      </View>

      {/* Price */}
      <Text style={styles.price}>
        {Number(item.price) === 0 ? 'Free' : `$${item.price}`}
      </Text>

      <Link
        href={{
          pathname: '/(auth)/course',
          params: {
            id: item.id,
            name: item.name,
            author: item.author,
            time: item.time,
            chapters: JSON.stringify(item.chapters), // Ensure chapters are passed as a string
            price: item.price,
            bannerUrl: item.banner.url,
            description: item.description.markdown,
          },
        }}
        style={styles.detailsLink}
      >
        <Text style={styles.detailsLinkText}>Details</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  bannerImage: {
    width: 210,
    height: 120,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    paddingLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  price: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  detailsLink: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#0000ff',
    borderRadius: 5,
    textAlign: 'center',
  },
  detailsLinkText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Courseitem;
