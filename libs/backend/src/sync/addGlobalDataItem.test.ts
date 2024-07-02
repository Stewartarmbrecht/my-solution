/* eslint-disable import/first */
jest.mock('@aws-amplify/datastore', () => ({
  DataStore: {
    save: jest.fn(),
  },
  initSchema: jest.fn().mockReturnValue({ GlobalDataItem: jest.fn().mockImplementation((initValues) => initValues) }),
}));
import { addGlobalDataItem } from './addGlobalDataItem';
import { Feature, FeatureStatus } from '@my-solution/shared';
import { DataStore } from '@aws-amplify/datastore';

describe('addGlobalDataItem', () => {
  it('should create a new GlobalDataItem object with the correct properties', () => {
    const feature = getDefaultFeature();

    addGlobalDataItem(feature);

    expect(DataStore.save).toHaveBeenCalledWith(expect.objectContaining({
      payload: JSON.stringify(feature),
    }));
  });

  // Add more test cases as needed
});

function getDefaultFeature(): Feature {
  return {
    id: '1',
    status: FeatureStatus.ACTIVE,
    rating: 4.5,
    title: 'Sample Feature',
    content: 'Lorem ipsum dolor sit amet',
    author: 'John Doe',
  };
}