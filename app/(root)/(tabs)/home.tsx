import React from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For star icon

import { useUser } from '@clerk/clerk-expo';
import CourseList from '@/components/Course/Courselist';
import PostTitle from '@/components/PostTitle';

export default function Header() {
 const { user, isLoaded } = useUser();
    const userName = 'Abdullah Al Kawser'; // Replace with actual user name
    const userPoints = 3500; // Replace with actual user points

    return (


          <ScrollView >
           {/* Header Section */}
            <View style={{ backgroundColor: '#6a1b9a', padding: 16, height: 280 }} >
                <View  className='mt-9'  style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Profile Section */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={{ uri: user?.imageUrl || 'https://via.placeholder.com/150' }}
                            style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12, borderWidth: 2, borderColor: 'white' }}
                        />
                        <View>
                            <Text style={{ color: 'white', fontSize: 14 }}>Welcome,</Text>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{userName}</Text>
                        </View>
                    </View>

                    {/* Points Section */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 50 }}>
                        <Ionicons name="star" size={20} color="#f5a623" />
                        <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: 6 }}>{userPoints}</Text>
                    </View>
                </View>

                {/* Search Bar */}
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 50, paddingHorizontal: 16, paddingVertical: 8, marginTop: 20 }}>
                    <Ionicons name="search" size={20} color="#888" />
                    <TextInput
                        placeholder="Search..."
                        placeholderTextColor="#888"
                        style={{ flex: 1, marginLeft: 8, color: '#333' }}
                    />
                </View>
            </View>


         <View style={{marginTop:-96,padding:15}} >
            {/* <PostTitle title='Besic' className="text-2xl font-bold text-gray-800"/> */}
            <Text  className="text-2xl font-bold text-white mb-3">Besic</Text>
         <CourseList/>
         </View>
         
         <View style={{padding:15}} >
            {/* <PostTitle title='Besic' className="text-2xl font-bold text-gray-800"/> */}
            <Text  className="text-2xl font-bold text-gray-800 mb-3">Intermidiate</Text>
         <CourseList/>
         </View>
         <View style={{padding:15}} >
            {/* <PostTitle title='Besic' className="text-2xl font-bold text-gray-800"/> */}
            <Text  className="text-2xl font-bold text-gray-800 mb-3">Advance</Text>
         <CourseList/>
         </View>


 </ScrollView>       
   
    );
}
