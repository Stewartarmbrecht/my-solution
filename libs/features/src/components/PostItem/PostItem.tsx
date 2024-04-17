import { Post, postDeleted } from '@my-solution/shared';
import { useAppDispatch } from '@my-solution/state';
import { Button, Card, Text, YStack } from '@my-solution/ui';

/* eslint-disable-next-line */
export interface PostProps {
  post: Post;
}

export function PostItem(props: PostProps) {
  const dispatch = useAppDispatch();
  const deletePostHandler = () => {
    dispatch(postDeleted(props.post));
  }

  return (
    <YStack gap="$2">
      <Card flexDirection='row' ai="center" key={props.post.id} gap="$4">
        <Button 
          onPress={deletePostHandler}
        >X</Button>
        <Text>{props.post.title}</Text>
      </Card>
    </YStack>
  );
}
