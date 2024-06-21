/* eslint-disable import/first */
jest.mock('@aws-amplify/datastore', () => ({
  DataStore: {
    observe: jest.fn().mockReturnValue({
      subscribe: jest.fn(),
    }),
    query: jest.fn(),
  },
  initSchema: jest.fn().mockReturnValue({ PostData: jest.fn().mockImplementation((initValues) => initValues) }),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

import { useDispatch } from 'react-redux';
import { DataStore } from '@aws-amplify/datastore';
import { useSynchronizer } from './useSynchronizer';
import { renderHook, act, waitFor } from '@testing-library/react-native';
//fake timers
jest.useFakeTimers();

describe('useSynchronizer', () => {
  it('should dispatch postsLoadedViaSync when data is loaded from the server', async () => {
    const subscribeMock = jest.fn();
    subscribeMock.mockReturnValueOnce({ unsubscribe: jest.fn() });

    const observeMock = DataStore.observe as jest.Mock;
    observeMock.mockReturnValueOnce({ subscribe: subscribeMock });

    const queryMock = DataStore.query as jest.Mock;
    queryMock.mockResolvedValueOnce([{
      id: '1',
      createdAt: '2022-01-01',
      payload: JSON.stringify({
        id: '1',
        title: 'Post 1',
        status: 'ACTIVE',
        rating: 4.5,
        content: 'Lorem ipsum dolor sit amet',
        author: 'tester'
      }),
    },{
      id: '2',
      createdAt: '2022-01-03',
      payload: JSON.stringify({
        id: '2',
        title: 'Post 2',
        status: 'ACTIVE',
        rating: 4.2,
        content: 'Lorem ipsum dolor sit amet 2',
        author: 'tester 2'
      }),
    }]);

    const dispatch = jest.fn();
    const useDispatchMock = useDispatch as unknown as jest.Mock;
    useDispatchMock.mockReturnValue(dispatch);

    renderHook(() => useSynchronizer(true));

    // Fast-forward until all timers have been executed
    jest.runAllTimers();
    
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith({
        type: 'posts/postsLoadedViaSync',
        payload: [{
          id: '2',
          serverId: '2',
          title: 'Post 2',
          status: 'ACTIVE',
          rating: 4.2,
          content: 'Lorem ipsum dolor sit amet 2',
          createdAt: '2022-01-03',
          updatedAt: undefined,
          author: 'tester 2'
        },{
          id: '1',
          serverId: '1',
          title: 'Post 1',
          content: 'Lorem ipsum dolor sit amet',
          rating: 4.5,
          status: 'ACTIVE',
          createdAt: '2022-01-01',
          updatedAt: undefined,
          author: 'tester'
        }]
      })
    );

    expect(subscribeMock).toHaveBeenCalled();
  });

  it('should dispatch postDeletedViaSync when DELETE operation is received', () => {
    const subscribeMock = jest.fn();
    subscribeMock.mockReturnValueOnce({ unsubscribe: jest.fn() });

    const observeMock = DataStore.observe as jest.Mock;
    observeMock.mockReturnValueOnce({ subscribe: subscribeMock });

    const queryMock = DataStore.query as jest.Mock;
    queryMock.mockResolvedValueOnce([{
      id: '2',
      payload: JSON.stringify({
        id: '1',
        title: 'Post 2',
        status: 'ACTIVE',
        rating: 4.5,
        content: 'Lorem ipsum dolor sit amet',
      }),
    }]);

    const dispatch = jest.fn();
    const useDispatchMock = useDispatch as unknown as jest.Mock;
    useDispatchMock.mockReturnValue(dispatch);

    renderHook(() => useSynchronizer(true));

    const deleteMsg = {
      opType: 'DELETE',
      element: {
        id: '2',
        payload: JSON.stringify({
          id: '1',
          title: 'Post 2',
          content: 'Lorem ipsum dolor sit amet',
          rating: 4.5,
          status: 'ACTIVE',
          author: 'John Doe',  
        }),
        createdAt: '2022-01-01',
        updatedAt: '2022-01-02',
      },
    };

    const subscription = subscribeMock.mock.calls[0][0];
    act(() => {
      subscription(deleteMsg);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'posts/postDeletedViaSync',
      payload: {
        id: '1',
        serverId: '2',
        title: 'Post 2',
        content: 'Lorem ipsum dolor sit amet',
        rating: 4.5,
        status: 'ACTIVE',
        author: 'John Doe',
        createdAt: '2022-01-01',
        updatedAt: '2022-01-02',
      },
    });
  });

  it('should dispatch postAddedOrUpdatedViaSync when INSERT operation is received', () => {
    const subscribeMock = jest.fn();
    subscribeMock.mockReturnValueOnce({ unsubscribe: jest.fn() });

    const observeMock = DataStore.observe as jest.Mock;
    observeMock.mockReturnValueOnce({ subscribe: subscribeMock });

    const queryMock = DataStore.query as jest.Mock;
    queryMock.mockResolvedValueOnce([]);

    const dispatch = jest.fn();
    const useDispatchMock = useDispatch as unknown as jest.Mock;
    useDispatchMock.mockReturnValue(dispatch);

    renderHook(() => useSynchronizer(true));

    const deleteMsg = {
      opType: 'INSERT',
      element: {
        id: '2',
        payload: JSON.stringify({
          id: '1',
          title: 'Post 2',
          content: 'Lorem ipsum dolor sit amet',
          rating: 4.5,
          status: 'ACTIVE',
          author: 'John Doe',
        }),
        createdAt: '2022-01-01',
        updatedAt: '2022-01-02',
      },
    };

    const subscription = subscribeMock.mock.calls[0][0];
    act(() => {
      subscription(deleteMsg);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'posts/postAddedOrUpdatedViaSync',
      payload: {
        id: '1',
        serverId: '2',
        title: 'Post 2',
        content: 'Lorem ipsum dolor sit amet',
        rating: 4.5,
        status: 'ACTIVE',
        author: 'John Doe',
        createdAt: '2022-01-01',
        updatedAt: '2022-01-02',
      },
    });
  });

  it('should dispatch postAddedOrUpdatedViaSync when UPDATE operation is received', () => {
    const subscribeMock = jest.fn();
    subscribeMock.mockReturnValueOnce({ unsubscribe: jest.fn() });

    const observeMock = DataStore.observe as jest.Mock;
    observeMock.mockReturnValueOnce({ subscribe: subscribeMock });

    const queryMock = DataStore.query as jest.Mock;
    queryMock.mockResolvedValueOnce([]);

    const dispatch = jest.fn();
    const useDispatchMock = useDispatch as unknown as jest.Mock;
    useDispatchMock.mockReturnValue(dispatch);

    renderHook(() => useSynchronizer(true));

    const deleteMsg = {
      opType: 'UPDATE',
      element: {
        id: '2',
        payload: JSON.stringify({
          id: '1',
          title: 'Post 2',
          content: 'Lorem ipsum dolor sit amet',
          rating: 4.5,
          status: 'ACTIVE',
          author: 'John Doe',
        }),
        createdAt: '2022-01-01',
        updatedAt: '2022-01-02',
      },
    };

    const subscription = subscribeMock.mock.calls[0][0];
    act(() => {
      subscription(deleteMsg);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'posts/postAddedOrUpdatedViaSync',
      payload: {
        id: '1',
        serverId: '2',
        title: 'Post 2',
        content: 'Lorem ipsum dolor sit amet',
        rating: 4.5,
        status: 'ACTIVE',
        author: 'John Doe',
        createdAt: '2022-01-01',
        updatedAt: '2022-01-02',
      },
    });
  });

  it('should not perform any actions if user is not logged in', () => {
    jest.clearAllMocks();
    const subscribeMock = jest.fn();
    subscribeMock.mockReturnValueOnce({ unsubscribe: jest.fn() });

    const observeMock = DataStore.observe as jest.Mock;
    observeMock.mockReturnValueOnce({ subscribe: subscribeMock });

    const queryMock = DataStore.query as jest.Mock;
    queryMock.mockResolvedValueOnce([]);

    const dispatch = jest.fn();
    const useDispatchMock = useDispatch as unknown as jest.Mock;
    useDispatchMock.mockReturnValue(dispatch);

    renderHook(() => useSynchronizer(false));

    expect(dispatch).not.toHaveBeenCalled();
    expect(observeMock).not.toHaveBeenCalled();
    expect(queryMock).not.toHaveBeenCalled();
  });
});