import { MyComponent } from "../../components/MyComponent";
import { MyPosts } from "../../components/MyPosts";
import { ScrollView } from "react-native";

export function Main() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ alignSelf: 'stretch', margin: 12 }}
    >
      <MyComponent />
      <MyPosts />
    </ScrollView>
  )
}
