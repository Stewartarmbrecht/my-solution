/* eslint-disable import/first */
jest.mock('@aws-amplify/datastore', () => ({
  DataStore: {
    save: jest.fn(),
    query: jest.fn(),
    delete: jest.fn(),
  },
  initSchema: jest.fn().mockReturnValue({ PostData: jest.fn().mockImplementation((initValues) => initValues) }),
}));
import { deletePostData } from './deletePostData';
import { PostData } from '../models';
import { DataStore } from '@aws-amplify/datastore';
import { Post, PostStatus } from '@my-solution/shared';


describe('deletePostData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete post data when serverId is defined', async () => {
    const post: Post = {
      id: '1',
      status: PostStatus.ACTIVE,
      serverId: '123',
      title: 'Post 1',
      rating: 4.5,
      content: 'Lorem ipsum dolor sit amet',
      author: 'John Doe',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-02',
    };

    const postData: PostData = {
      id: '123',
      clientId: '1',
      title: 'Post 1',
      status: PostStatus.ACTIVE,
      rating: 4.5,
      content: 'Lorem ipsum dolor sit amet',
      author: 'John Doe',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-02',
    };

    (DataStore.query as jest.Mock).mockResolvedValue(postData);

    await deletePostData(post);

    expect(DataStore.query).toHaveBeenCalledWith(PostData, '123');
    expect(DataStore.delete).toHaveBeenCalledWith(postData);
  });

  it('should not delete post data when serverId is undefined', async () => {
    const post: Post = {
      id: '1',
      status: 'ACTIVE',
      serverId: undefined,
      title: 'Post 1',
      rating: 4.5,
      content: 'Lorem ipsum dolor sit amet',
      author: 'John Doe',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-02',
    };

    await deletePostData(post);

    expect(DataStore.query).not.toHaveBeenCalled();
    expect(DataStore.delete).not.toHaveBeenCalled();
  });
  it('should not delete post data when the post data is not found', async () => {
    const post: Post = {
      id: '1',
      status: 'ACTIVE',
      serverId: '123',
      title: 'Post 1',
      rating: 4.5,
      content: 'Lorem ipsum dolor sit amet',
      author: 'John Doe',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-02',
    };

    (DataStore.query as jest.Mock).mockResolvedValue(undefined);

    await deletePostData(post);

    expect(DataStore.query).toHaveBeenCalledWith(PostData, '123');
    expect(DataStore.delete).not.toHaveBeenCalled();
  });
});