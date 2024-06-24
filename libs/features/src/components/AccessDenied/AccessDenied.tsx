import { signOut } from "@my-solution/backend";
import { Button, Card, H1, Stack, Text, View, YStack } from "@my-solution/ui";

export function AccessDenied() {
  return (
    <YStack gap="$4" m="$4">
      <H1 textAlign="center">Access Denied</H1>
      <Text f={1} testID="access-denied.message">You do not have access.  Please click Sign Out and then sign in as a user that does.</Text>
      <Button 
        $gtSm={{ height: "100%" }} 
        onPress={signOut}
        testID="access-denied.sign-out"
      >Sign Out</Button>
    </YStack>
  );
}
