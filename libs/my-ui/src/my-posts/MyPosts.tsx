import { Post } from '@my-sample/my-backend';
import { View, Text } from 'react-native';
import { MyPost } from './MyPost';
import { useEffect, useState } from 'react';
import { DataStore, SortDirection } from '@aws-amplify/datastore';
import AddPost from './AddPost';

/* eslint-disable-next-line */
export interface MyPostsProps {
}


export function MyPosts(props: MyPostsProps) {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const subscription = DataStore.observeQuery(
      Post,
      p => p, {
        sort: s => s.rating(SortDirection.ASCENDING)
      }
    ).subscribe(snapshot => {
      const { items, isSynced } = snapshot;
      console.log(`[Snapshot] item count: ${items.length}, isSynced: ${isSynced}`);
      setPosts(items);
    });
    return () => {
      subscription.unsubscribe()
    };
  }, []); // Or [] if effect doesn't need props or state  

  return (
    <View>
      <AddPost />
      <Text>Posts:</Text>
      {posts && posts.sort((a, b) => a.title > b.title ? 1 : -1).map((post, index) => (
        <MyPost key={index} post={post} />
      ))}
    </View>
  );
};


export default MyPosts;


