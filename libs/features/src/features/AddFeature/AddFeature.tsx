import { useState } from 'react';
import { useAppDispatch } from '@my-solution/state';
import { nanoid } from '@reduxjs/toolkit';
import { Feature, FeatureStatus, featureAdded } from '@my-solution/shared';
import { logMessage } from '@my-solution/shared';
import { Button, Input, Paragraph, XStack } from '@my-solution/ui';

export function AddFeature() {
  const [newFeatureName, setNewFeatureName] = useState('');
  const dispatch = useAppDispatch();
  const createFeature = async () => {
    const feature: Feature = {
      id: nanoid(),
      title: newFeatureName,
      rating: 5,
      status: FeatureStatus.ACTIVE,
      createdAt: new Date().toISOString(),
    };
    dispatch(featureAdded(feature));
    logMessage('Feature saved successfully!', feature);
  }
  return (
    <XStack gap="$4" ai="center">
      <Paragraph>
        New Feature:
      </Paragraph>
      <Input
        onChangeText={text => setNewFeatureName(text)}
        value={newFeatureName}
        placeholder='New Feature Name'
        accessibilityLabel='New Feature Name'
        flex={1}
        testID='new-feature-name'
        onSubmitEditing={createFeature}
      />
      <Button 
        onPress={createFeature}
        testID="new-feature-submit"
      >Add</Button>
    </XStack>
  );
}
