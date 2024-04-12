import React from "react";
import { StyleSheet } from "react-native";
import { View } from '../View';
import { Text } from '../Text';
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Banner() {
  // const dispatch = useAppDispatch();
  // const user = useAppSelector(selectUser);
  // async function handleSignOut() {
  //   await signOut();
  //   dispatch(userLoggedOut());
  // }
  const insets = useSafeAreaInsets();
  
  const styles = StyleSheet.create({
    bannerContainer: {
      marginTop: insets.top,
      flexDirection: 'row',
    },
    appTitleArea: {
      flex: 1,
      flexDirection: 'row'
    },
    appIcon: {
      height: 42,
      aspectRatio: 1,
      margin: 6,
    },
    appTitle: {
      fontSize: 48,
      flex: 2,
    },
    textLg: {
      fontSize: 24,
    },
    textMd: {
      fontSize: 18,
    },
    textCenter: {
      textAlign: 'center',
    },
    signOutButton: {
      backgroundColor: '#cccccc',
      paddingVertical: 16,
      borderRadius: 8,
    },
  });
  
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.appTitleArea}>
        <Image 
          source={require('../../../assets/images/banner-icon.png')} 
          style={styles.appIcon} 
        />
        <Text style={styles.appTitle}>
          My App
        </Text>
      </View>
      {/* <Text style={styles.textLg}>Hello there {user?.userName},</Text>
      <Pressable 
        onPress={handleSignOut}
        style={styles.signOutButton}
      >
        <Text style={[styles.textMd, styles.textCenter]}>Sign Out</Text>
      </Pressable>
      <View>
        <Text>Username: {user?.userName}</Text>
      </View> */}
    </View>
  );
}

