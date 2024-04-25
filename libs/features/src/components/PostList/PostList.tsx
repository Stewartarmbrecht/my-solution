import { PostItem } from '../PostItem';
import { AddPost } from '../AddPost';
import { selectAllPosts, useAppSelector } from '@my-solution/state';
import { YStack } from '@my-solution/ui'

export function PostList() {
  const posts = useAppSelector(selectAllPosts)

  return (
    <YStack gap="$4" mt="$2">
      <AddPost />
      {posts && posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </YStack>
  );
}

