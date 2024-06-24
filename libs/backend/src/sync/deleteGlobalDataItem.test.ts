/* eslint-disable import/first */
jest.mock('@aws-amplify/datastore', () => ({
  DataStore: {
    save: jest.fn(),
    query: jest.fn(),
    delete: jest.fn(),
  },
  initSchema: jest.fn().mockReturnValue({ GlobalDataItem: jest.fn().mockImplementation((initValues) => initValues) }),
}));
import { deleteGlobalDataItem } from './deleteGlobalDataItem';
import { GlobalDataItem } from '../models';
import { DataStore } from '@aws-amplify/datastore';
import { Feature, FeatureStatus } from '@my-solution/shared';


describe('deleteGlobalDataItem', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete feature data when serverId is defined', async () => {
    const feature: Feature = {
      id: '1',
      status: FeatureStatus.ACTIVE,
      serverId: '123',
      title: 'Feature 1',
      rating: 4.5,
      content: 'Lorem ipsum dolor sit amet',
      author: 'John Doe',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-02',
    };

    const globalDataItem: GlobalDataItem = {
      id: '123',
      payload: JSON.stringify(feature),
    };

    (DataStore.query as jest.Mock).mockResolvedValue(globalDataItem);

    await deleteGlobalDataItem(feature);

    expect(DataStore.query).toHaveBeenCalledWith(GlobalDataItem, '123');
    expect(DataStore.delete).toHaveBeenCalledWith(globalDataItem);
  });

  it('should not delete feature data when serverId is undefined', async () => {
    const feature: Feature = {
      id: '1',
      status: 'ACTIVE',
      serverId: undefined,
      title: 'Feature 1',
      rating: 4.5,
      content: 'Lorem ipsum dolor sit amet',
      author: 'John Doe',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-02',
    };

    await deleteGlobalDataItem(feature);

    expect(DataStore.query).not.toHaveBeenCalled();
    expect(DataStore.delete).not.toHaveBeenCalled();
  });
  it('should not delete feature data when the feature data is not found', async () => {
    const feature: Feature = {
      id: '1',
      status: 'ACTIVE',
      serverId: '123',
      title: 'Feature 1',
      rating: 4.5,
      content: 'Lorem ipsum dolor sit amet',
      author: 'John Doe',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-02',
    };

    (DataStore.query as jest.Mock).mockResolvedValue(undefined);

    await deleteGlobalDataItem(feature);

    expect(DataStore.query).toHaveBeenCalledWith(GlobalDataItem, '123');
    expect(DataStore.delete).not.toHaveBeenCalled();
  });
});