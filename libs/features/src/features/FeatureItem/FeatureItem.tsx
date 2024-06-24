import { Feature, featureDeleted } from "@my-solution/shared";
import { useAppDispatch } from "@my-solution/state";
import { Button, Card, Stack, Text, YStack } from "@my-solution/ui";
import moment from "moment";
import { Platform } from "react-native";

/* eslint-disable-next-line */
export interface FeatureProps {
  feature: Feature;
}

export function FeatureItem(props: FeatureProps) {
  const dispatch = useAppDispatch();
  const deleteFeatureHandler = () => {
    dispatch(featureDeleted(props.feature));
  }

  return (
    <YStack gap="$2">
      <Card fd="row" key={props.feature.id} testID="feature-item">
        <Stack
          f={1}
          p="$4"
          pr="$0"
          $gtSm={{ flexDirection: "row", alignItems: "center" }} 
        >
          <Text f={1} testID="feature-item.title">{props.feature.title}</Text>
          <Stack
            fd="row"
            mt="$4"
            $gtSm={{ flex: -1, marginTop: "$0", marginLeft: "$4", flexDirection: "row", alignItems: "center" }} 
          >
            <Text
              f={1}
              // Fixes a layout bug on mobile.  if this is set to 1, the title compresses.
              $gtSm={{ flex: /*istanbul ignore next*/Platform.OS === 'web' ? undefined : -1 }}
              fontStyle="italic" 
            >Stewart Armbrecht</Text>
            <Text
              $gtSm={{ alignSelf: "flex-end", paddingRight: "$4"}} 
              pl="$4"
            >{moment(props.feature.createdAt).fromNow()}</Text>
          </Stack>
        </Stack>
        <Button 
          $gtSm={{ height: "100%" }} 
          onPress={deleteFeatureHandler}
        >X</Button>
      </Card>
    </YStack>
  );
}
