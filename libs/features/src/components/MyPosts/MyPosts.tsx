import { MyPost } from '../MyPost';
import { AddPost } from '../AddPost';
import { selectAllPosts, useAppSelector } from '@my-solution/state';
import { YStack } from '@my-solution/ui'

export function MyPosts() {
  const posts = useAppSelector(selectAllPosts)

  return (
    <YStack gap="$4">
      <AddPost />
      {posts && posts.map((post) => (
        <MyPost key={post.id} post={post} />
      ))}
    </YStack>
  );
}

