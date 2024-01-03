

import React from 'react';

import { View, Text } from 'react-native';

/* eslint-disable-next-line */
export interface MyPostsProps {
  posts: Post[];
}


export function MyPosts(props: MyPostsProps) {
  return (
    <View>
      {props.posts && props.posts.map((post, index) => (
        <View key={index}>
          <Text>{post.title}</Text>
        </View>
      ))}
    </View>
  );
};


export default MyPosts;


