/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { MyComponent, MyPosts } from '@my-sample/my-ui';
import { MyData } from '@my-sample/my-state';

export const App = () => {
  return (
    <MyData>
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View style={styles.section}>
              <Text style={[styles.textXL, styles.appTitleText]} testID="heading">
                Welcome to MyApp v1.0.1 👋
              </Text>
              <MyComponent />
              <MyPosts />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </MyData>
  );
};
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

export default App;
