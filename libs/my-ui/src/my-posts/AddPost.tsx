import { PostStatus } from '@my-sample/my-backend';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { addPost, useAppDispatch, Post } from '@my-sample/my-state';
import { nanoid } from '@reduxjs/toolkit';

/* eslint-disable-next-line */
export interface AddPostProps {
}


export function AddPost(props: AddPostProps) {
  const [newPostName, setNewPostName] = useState('');
  const dispatch = useAppDispatch();
  const createPost = async () => {
    const post: Post = {
      id: nanoid(),
      title: newPostName,
      rating: 5,
      status: PostStatus.ACTIVE,
    };
    dispatch(addPost(post));
    // const post = await DataStore.save(
    //   new Post({
    //     title: newPostName,
    //     rating: 5,
    //     status: PostStatus.ACTIVE,
    //   })
    // );
    console.log('Post saved successfully!', post);
  }

  return (
    <View>
      <Text>New Post:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setNewPostName(text)}
        value={newPostName}
        accessibilityLabel='New Post Name'
      />
      <Pressable 
        onPress={createPost}
        style={styles.testButton}
      >
        <Text style={[styles.textMd, styles.textCenter]}>Add</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
  textMd: {
    fontSize: 18,
  },
  testButton: {
    backgroundColor: '#cccccc',
    paddingVertical: 16,
    borderRadius: 8,
    width: '50%',
    marginTop: 24,
  },
});

export default AddPost;


