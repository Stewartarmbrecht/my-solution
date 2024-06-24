import { PostsScreen } from '@my-solution/features';
import { YStack } from '@my-solution/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PostsTab() {
  const insets = useSafeAreaInsets();
  return (
    <YStack f={1} ml={insets.left} mr={insets.right}>
      <PostsScreen />
    </YStack>
  );
}
