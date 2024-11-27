import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList, Image } from 'react-native';
import { getcourselist } from '@/app/api';
import Courseitem from './Courseitem';

import { TouchableOpacity } from 'react-native';


// Define the type for course items
type Course = {
  id: string;
  name: string;
  author: string;
  banner: { url: string }; // Ensure `banner` has a `url` property
};

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getcourselist();
        setCourses(response.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="">
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (  
 
       
       <Courseitem item={item}/>

        
        )}
      />
    </View>
  );
};

export default CourseList;
