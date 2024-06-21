/* eslint-disable import/first */
jest.mock('@aws-amplify/datastore', () => ({
  DataStore: {
    save: jest.fn(),
    query: jest.fn(),
    delete: jest.fn(),
  },
  initSchema: jest.fn().mockReturnValue({ DataItem: jest.fn().mockImplementation((initValues) => initValues) }),
}));
import { deleteDataItem } from './deleteDataItem';
import { DataItem } from '../models';
import { DataStore } from '@aws-amplify/datastore';
import { Post, PostStatus } from '@my-solution/shared';


describe('deleteDataItem', () => {
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

    const dataItem: DataItem = {
      id: '123',
      payload: JSON.stringify(post),
    };

    (DataStore.query as jest.Mock).mockResolvedValue(dataItem);

    await deleteDataItem(post);

    expect(DataStore.query).toHaveBeenCalledWith(DataItem, '123');
    expect(DataStore.delete).toHaveBeenCalledWith(dataItem);
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

    await deleteDataItem(post);

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

    await deleteDataItem(post);

    expect(DataStore.query).toHaveBeenCalledWith(DataItem, '123');
    expect(DataStore.delete).not.toHaveBeenCalled();
  });
});