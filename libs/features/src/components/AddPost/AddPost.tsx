import { useState } from 'react';
import { useAppDispatch } from '@my-solution/state';
import { nanoid } from '@reduxjs/toolkit';
import { Post, PostStatus, postAdded } from '@my-solution/shared';
import { logMessage } from '@my-solution/shared';
import { Button, Input, Paragraph, XStack } from '@my-solution/ui';

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
    <XStack gap="$4" ai="center">
      <Paragraph>
        New Post:
      </Paragraph>
      <Input
        onChangeText={text => setNewPostName(text)}
        value={newPostName}
        placeholder='New Post Name'
        accessibilityLabel='New Post Name'
        flex={1}
      />
      <Button 
        onPress={createPost}
        theme="blue_active"
      >Add</Button>
    </XStack>
  );
}
