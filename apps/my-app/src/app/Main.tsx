import { MyComponent, MyPosts } from "@my-solution/my-ui";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export function Main() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
    >
      <View style={styles.section}>
        <Text style={[styles.textXL, styles.appTitleText]} testID="heading">
          Welcome to MyApp 👋
        </Text>
        <Text>
          v0.0.1 Update 001
        </Text>
        <MyComponent />
        <MyPosts />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  textXL: {
    fontSize: 48,
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: '500',
  },
  section: {
    marginVertical: 24,
    marginHorizontal: 12,
  },
});
