import { View, Text } from 'react-native';
import { MyPost } from './MyPost';
import AddPost from './AddPost';
import { selectAllPosts, useAppSelector } from '@my-sample/my-state';

export function MyPosts() {
  const posts = useAppSelector(selectAllPosts)

  // useEffect(() => {
  //   const subscription = DataStore.observeQuery(
  //     Post,
  //     p => p, {
  //       sort: s => s.rating(SortDirection.ASCENDING)
  //     }
  //   ).subscribe(snapshot => {
  //     const { items, isSynced } = snapshot;
  //     console.log(`[Snapshot] item count: ${items.length}, isSynced: ${isSynced}`);
  //     setPosts(items);
  //   });
  //   return () => {
  //     subscription.unsubscribe()
  //   };
  // }, []); // Or [] if effect doesn't need props or state  

  return (
    <View>
      <AddPost />
      <Text>Posts:</Text>
      {posts && posts.map((post) => (
        <MyPost key={post.id} post={post} />
      ))}
    </View>
  );
};


export default MyPosts;
