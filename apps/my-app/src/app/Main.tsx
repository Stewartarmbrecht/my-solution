import { MyComponent, MyPosts } from "@my-sample/my-ui";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export function Main() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
    >
      <View style={styles.section}>
        <Text style={[styles.textXL, styles.appTitleText]} testID="heading">
          Welcome to MyApp v1.0.3 👋
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
