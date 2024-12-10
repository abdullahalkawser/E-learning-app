import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

const LeaderBord = () => {
  const users = [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://cdn-icons-png.flaticon.com/512/147/147137.png',
      completedCourses: 12,
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXXckRlC33zt7zHBLpEEEeqY_MGIn89LOdGw&s',
      completedCourses: 10,
    },
    {
      id: '3',
      name: 'Alex Johnson',
      avatar: 'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg',
      completedCourses: 8,
    },
    {
      id: '4',
      name: 'Alex Johnson',
      avatar: 'https://static.vecteezy.com/system/resources/previews/004/899/833/non_2x/beautiful-girl-with-blue-hair-avatar-of-woman-for-social-network-vector.jpg',
      completedCourses: 8,
    },
    {
      id: '5',
      name: 'Alex Johnson',
      avatar: 'https://as2.ftcdn.net/v2/jpg/02/79/66/93/1000_F_279669366_Lk12QalYQKMczLEa4ySjhaLtx1M2u7e6.jpg',
      completedCourses: 8,
    },
    {
      id: '6',
      name: 'Alex Johnson',
      avatar: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
      completedCourses: 8,
    },
  
  ];

  // Animation setup
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in to opacity 1
      duration: 1000, // Animation duration
      easing: Easing.ease, // Easing function
      useNativeDriver: true, // Use native driver for performance
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Leaderboard</Text>
      <Animated.FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <View style={styles.rankContainer}>
              <Text style={styles.rank}>{index + 1}</Text>
            </View>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.completedCourses}>
                Completed Courses: {item.completedCourses}
              </Text>
            </View>
          </Animated.View>
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 16,
  },
  listContent: {
    paddingVertical: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  rankContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  completedCourses: {
    fontSize: 14,
    color: '#555',
  },
});

export default LeaderBord;
