import React from 'react';
import { Text, View } from 'react-native';

type PostTitleProps = {
  title: string;

};

const PostTitle: React.FC<PostTitleProps> = ({ title }) => {
  return (
    <View className="mb-4">
      <Text >{title}</Text>
 
    </View>
  );
};

export default PostTitle;
