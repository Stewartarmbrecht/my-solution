import { MyComponent } from "../../components/MyComponent";
import { MyPosts } from "../../components/MyPosts";
import { ScrollView, StyleSheet } from "react-native";
import { View } from '../../components/View';
import { Text } from '../../components/Text';

export function Main() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.section}>
        <Text 
          style={[styles.textXL, styles.appTitleText]} 
          testID="heading"
        >
          Welcome to MyApp 👋
        </Text>
        <Text>
          v0.0.2 Update 002
        </Text>
        <MyComponent />
        <MyPosts />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
