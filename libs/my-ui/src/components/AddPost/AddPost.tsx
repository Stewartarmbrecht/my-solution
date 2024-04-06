import { TextInput, Pressable, StyleSheet } from 'react-native';
import { View } from '../View';
import { Text } from '../Text';
import { useState } from 'react';
import { useAppDispatch } from '@my-solution/my-state';
import { nanoid } from '@reduxjs/toolkit';
import { Post, PostStatus, postAdded } from '@my-solution/my-shared';
import { logMessage } from '@my-solution/my-shared';

export function AddPost() {
  const [newPostName, setNewPostName] = useState('');
  const dispatch = useAppDispatch();
  const createPost = async () => {
    const post: Post = {
      id: nanoid(),
      title: newPostName,
      rating: 5,
      status: PostStatus.ACTIVE,
    };
    dispatch(postAdded(post));
    logMessage('Post saved successfully!', post);
  }

  return (
    <View>
      <Text>
        New Post:
      </Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setNewPostName(text)}
        value={newPostName}
        placeholder='New Post Name'
        accessibilityLabel='New Post Name'
      />
      <Pressable 
        onPress={createPost}
        style={styles.testButton}
      >
        <Text style={[styles.textMd, styles.textCenter]}>
          Add
        </Text>
      </Pressable>
    </View>
  );
}

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
