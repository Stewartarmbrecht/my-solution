import React from 'react';

import { ExternalLink } from '../../components/ExternalLink';

import { Card, Text, View, YStack } from '@my-solution/ui';

export function EditScreenInfo({ path }: { path: string }) {
  return (
    <YStack>
      <YStack>
        <Text>
          Open up the code for this screen:
        </Text>

        <View>
          <Text>{path}</Text>
        </View>

        <Text>
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </YStack>

      <Card>
        <ExternalLink
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
          <Text>
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </ExternalLink>
      </Card>
    </YStack>
  );
}
