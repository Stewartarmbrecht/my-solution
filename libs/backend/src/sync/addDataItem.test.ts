/* eslint-disable import/first */
jest.mock('@aws-amplify/datastore', () => ({
  DataStore: {
    save: jest.fn(),
  },
  initSchema: jest.fn().mockReturnValue({ DataItem: jest.fn().mockImplementation((initValues) => initValues) }),
}));
import { addDataItem } from './addDataItem';
import { Post, PostStatus } from '@my-solution/shared';
import { DataStore } from '@aws-amplify/datastore';

describe('addDataItem', () => {
  it('should create a new DataItem object with the correct properties', () => {
    const post = getDefaultPost();

    addDataItem(post);

    expect(DataStore.save).toHaveBeenCalledWith(expect.objectContaining({
      payload: JSON.stringify(post),
    }));
  });

  // Add more test cases as needed
});

function getDefaultPost(): Post {
  return {
    id: '1',
    status: PostStatus.ACTIVE,
    rating: 4.5,
    title: 'Sample Post',
    content: 'Lorem ipsum dolor sit amet',
    author: 'John Doe',
  };
}