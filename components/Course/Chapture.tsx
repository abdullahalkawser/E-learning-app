import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


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

  const [visibleChapterIndex, setVisibleChapterIndex] = useState<number | null>(null);

  const toggleChapterVisibility = (index: number) => {
    setVisibleChapterIndex(visibleChapterIndex === index ? null : index);
  };

  if (!Array.isArray(chapters) || chapters.length === 0) {
    return (
      <View className='bg-red-500'>
        <Text className='text-red-700 text-lg' >No chapters available</Text>
      </View>
    );
  }

  return (
    <View className='p-2 mt-5'>
      {chapters.map((chapter, chapterIndex) => (
        <View key={chapter.id} className='mb-5'>
<View className=" p-3 flex-row justify-between items-center rounded-xl bg-gray-100 h-20">
  <TouchableOpacity onPress={() => toggleChapterVisibility(chapterIndex)}>
    <Text className="text-lg font-bold">{chapterIndex +0 + 1}. {chapter.title}</Text>
  </TouchableOpacity>
  <Ionicons name="play-circle" size={27} color="black" className="-ml-10" />
</View>

          {visibleChapterIndex === chapterIndex && (
            <View>
              {chapter.content.map((content, index) => (
                <View key={index} className='ml-5 mb-3'>
                  <Text className='text-base font-semibold'>{content.heading}</Text>
                  {/* Uncomment below line to display description */}
                  {/* <Text style={tw`text-sm`}>{content.description.markdown}</Text> */}
                  <Text className='text-sm text-gray-700'>{content.output.markdown}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default Chapture;
