import { View } from '../View';
import { Text } from '../Text';
import { MyPost } from '../MyPost';
import { AddPost } from '../AddPost';
import { selectAllPosts, useAppSelector } from '@my-solution/my-state';

export function MyPosts() {
  const posts = useAppSelector(selectAllPosts)

  return (
    <View>
      <AddPost />
      <Text>Posts:</Text>
      {posts && posts.map((post) => (
        <MyPost key={post.id} post={post} />
      ))}
    </View>
  );
}

