import { AuthUser, getCurrentUser, signOut } from "@my-sample/my-backend";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function Banner() {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  async function handleSignOut() {
    await signOut();
  }
  useEffect(() => {
    async function loadUser() {
      setUser(await getCurrentUser());
    }
    loadUser();
  });
  return (
    <View style={styles.section}>
      <Text style={styles.textLg}>Hello there {user?.username},</Text>
        <Pressable 
          onPress={handleSignOut}
          style={styles.testButton}
        >
          <Text style={[styles.textMd, styles.textCenter]}>Sign Out</Text>
        </Pressable>
        <View>
          <Text>Username: {user?.username}</Text>
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
