import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
  console.log(chapters)

  if (!Array.isArray(chapters) || chapters.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No chapters available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {chapters.map((chapter) => (
        <View key={chapter.id} style={styles.chapterContainer}>
          <Text style={styles.chapterTitle}>{chapter.title}</Text>
          {chapter.content.map((content, index) => (
            <View key={index} style={styles.contentContainer}>
              <Text style={styles.heading}>{content.heading}</Text>
              {/* <Text style={styles.description}>{content.description.markdown}</Text>
              <Text style={styles.output}>{content.output.markdown}</Text> */}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  chapterContainer: {
    marginBottom: 20,
  },
  chapterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    marginTop: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
  output: {
    fontSize: 16,
    marginTop: 5,
    color: 'green',
  },
});

export default Chapture;
