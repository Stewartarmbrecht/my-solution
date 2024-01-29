import { SafeAreaView, StatusBar, View } from "react-native";
import { Banner } from "./Banner";
import { Main } from "./Main";

export function Shell() {
  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Banner />
        <Main />
      </SafeAreaView>
    </View>
  );
}