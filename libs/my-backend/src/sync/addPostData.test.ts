/* eslint-disable import/first */
jest.mock('@aws-amplify/datastore', () => ({
  DataStore: {
    save: jest.fn(),
  },
  initSchema: jest.fn().mockReturnValue({ PostData: jest.fn().mockImplementation((initValues) => initValues) }),
}));
import { addPostData } from './addPostData';
import { Post, PostStatus } from '@my-solution/my-shared';
import { DataStore } from '@aws-amplify/datastore';

describe('addPostData', () => {
  it('should create a new PostData object with the correct properties', () => {
    const post = getDefaultPost();

    addPostData(post);

    expect(DataStore.save).toHaveBeenCalledWith(expect.objectContaining({
      clientId: post.id,
      title: post.title,
      status: post.status,
      rating: post.rating,
      content: post.content,
      author: post.author,
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