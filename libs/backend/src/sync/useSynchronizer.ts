import { useEffect } from 'react';
import { 
  logRaw,
  Post, 
  logCall, 
  logSetup, 
  postAddedOrUpdatedViaSync, 
  postDeletedViaSync, 
  postsLoadedViaSync 
} from '@my-solution/shared';
import { DataStore } from '@aws-amplify/datastore';
import { DataItem } from '../models';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

/**
 * Synchronizes the redux data with the amplify datastore.
 * @returns {JSX.Element} The root component of the app.
 */
export function useSynchronizer(isUserLoggedIn: boolean) {
  logSetup('useSynchronizer');

  const dispatch = useDispatch();

  useEffect(() => {
    logCall('useSynchronizer.useEffect');
    if (!isUserLoggedIn) {
      return;
    }
    const subId = nanoid();
    const subscription = DataStore.observe(DataItem).subscribe(msg => {
      logCall('useSynchronizer.useEffect.DataStore.observe', 'msg:', msg, 'sub:', subId);
      const payload = JSON.parse(msg.element.payload);
      payload.serverId = msg.element.id;
      payload.createdAt = msg.element.createdAt;
      payload.updatedAt = msg.element.updatedAt;
      const post: Post = payload as Post;
      switch (msg.opType) {
        case 'DELETE':
          dispatch(postDeletedViaSync(post));
          break;
        case 'INSERT':
          dispatch(postAddedOrUpdatedViaSync(post));
          break;
        case 'UPDATE':
          dispatch(postAddedOrUpdatedViaSync(post));
          break;
      }
    });
    const loadDataStorePosts = async () => {
      logCall('useSynchronizer.useEffect.loadDataStorePosts');
      try {
        const dataItems: DataItem[] = await DataStore.query(DataItem);
        logCall('useSynchronizer.useEffect.loadDataStorePosts.DataStore.query');
        const posts: Post[] = dataItems.sort((a, b) => {
          /*istanbul ignore next*/
          const aCreatedAt = a.createdAt ?? '9999-12-31T23:59:59.999Z';
          /*istanbul ignore next*/
          const bCreatedAt = b.createdAt ?? '9999-12-31T23:59:59.999Z';
          return bCreatedAt.localeCompare(aCreatedAt);
        }).map((dataItem) => {
          const payload = JSON.parse(dataItem.payload);
          payload.serverId = dataItem.id;
          payload.createdAt = dataItem.createdAt;
          payload.updatedAt = dataItem.updatedAt;
          const post: Post = payload as Post;
          return (post);
        });
        logCall('useSynchronizer.useEffect.loadDataStorePosts.DataStore.query', 'count:', posts.length);
        dispatch(postsLoadedViaSync(posts));
      } /* istanbul ignore next */ catch (error) {
         /* istanbul ignore next */
        logRaw('useSynchronizer.useEffect.loadDataStorePosts.DataStore.query', 'error:', error);
         /* istanbul ignore next */
        throw error;
      }
    }    
    loadDataStorePosts();
    return () => {
      logCall('useSynchronizer.useEffect.unsubscribe');
      subscription.unsubscribe()
    };
  }, [dispatch, isUserLoggedIn]); // Or [] if effect doesn't need props or state  
}
