import { Button, Text, YStack } from "@my-solution/ui";
import { selectUser, useAppDispatch, useAppSelector } from "@my-solution/state";
//import { signOut } from "@my-solution/backend";
import { userLoggedOut } from "@my-solution/shared";

export function Settings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  async function handleSignOut() {
    //await signOut();
    dispatch(userLoggedOut());
  }
  return (
    <YStack gap="$4" m="$4">
      <Text>Hello there {user?.userName},</Text>
      <Button onPress={handleSignOut}>Sign Out</Button>
    </YStack>
  )
}
