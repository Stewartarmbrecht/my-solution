import { PostList } from "../../components/PostList";
import { ScrollView } from "react-native";
import { YStack } from "@my-solution/ui";

export function Main() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ alignSelf: 'stretch', margin: 12 }}
    >
      <YStack gap="$4">
        <PostList />
      </YStack>
    </ScrollView>
  )
}
