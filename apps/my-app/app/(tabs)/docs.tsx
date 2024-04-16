import { EditScreenInfo } from '@my-solution/features';
import { H3, Separator, YStack } from '@my-solution/ui';

export default function TabTwoScreen() {
  return (
    <YStack>
      <H3>Documentation</H3>
      <Separator />
      <EditScreenInfo path="app/(tabs)/docs.tsx" />
    </YStack>
  );
}
