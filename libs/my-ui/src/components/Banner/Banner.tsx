import { userLoggedOut } from "@my-solution/my-shared";
import { selectUser, useAppDispatch, useAppSelector } from "@my-solution/my-state";
import { signOut } from "@my-solution/my-backend";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { View } from '../View';
import { Text } from '../Text';

export function Banner() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  async function handleSignOut() {
    await signOut();
    dispatch(userLoggedOut());
  }
  return (
    <View style={styles.section}>
      <Text style={styles.textLg}>Hello there {user?.userName},</Text>
        <Pressable 
          onPress={handleSignOut}
          style={styles.testButton}
        >
          <Text style={[styles.textMd, styles.textCenter]}>Sign Out</Text>
        </Pressable>
        <View>
          <Text>Username: {user?.userName}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginVertical: 24,
    marginHorizontal: 12,
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
  testButton: {
    backgroundColor: '#cccccc',
    paddingVertical: 16,
    borderRadius: 8,
    width: '50%',
    marginTop: 24,
  },
});
