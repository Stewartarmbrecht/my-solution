import { useEffect } from 'react';
import { 
  logRaw,
  Post, 
  logCall, 
  logSetup, 
  postAddedOrUpdatedViaSync, 
  postDeletedViaSync, 
  postsLoadedViaSync, 
  Feature,
  featureDeletedViaSync,
  featureAddedOrUpdatedViaSync,
  featuresLoadedViaSync
} from '@my-solution/shared';
import { DataStore } from '@aws-amplify/datastore';
import { DataItem, GlobalDataItem } from '../models';
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
      logCall('useSynchronizer.useEffect.DataStore.DataItem.observe', 'msg:', msg, 'sub:', subId);
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

    const globalSubId = nanoid();
    const globalSubscription = DataStore.observe(GlobalDataItem).subscribe(msg => {
      logCall('useSynchronizer.useEffect.DataStore.GlobalDataItem.observe', 'msg:', msg, 'sub:', globalSubId);
      const payload = JSON.parse(msg.element.payload);
      payload.serverId = msg.element.id;
      payload.createdAt = msg.element.createdAt;
      payload.updatedAt = msg.element.updatedAt;
      const feature: Feature = payload as Feature;
      switch (msg.opType) {
        case 'DELETE':
          dispatch(featureDeletedViaSync(feature));
          break;
        case 'INSERT':
          dispatch(featureAddedOrUpdatedViaSync(feature));
          break;
        case 'UPDATE':
          dispatch(featureAddedOrUpdatedViaSync(feature));
          break;
      }
    });
    const loadDataStoreFeatures = async () => {
      logCall('useSynchronizer.useEffect.loadDataStoreFeatures');
      try {
        const dataItems: GlobalDataItem[] = await DataStore.query(GlobalDataItem);
        logCall('useSynchronizer.useEffect.loadDataStoreFeatures.DataStore.query');
        const features: Feature[] = dataItems.sort((a, b) => {
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
          const feature: Feature = payload as Feature;
          return (feature);
        });
        logCall('useSynchronizer.useEffect.loadDataStoreFeatures.DataStore.query', 'count:', features.length);
        dispatch(featuresLoadedViaSync(features));
      } /* istanbul ignore next */ catch (error) {
         /* istanbul ignore next */
        logRaw('useSynchronizer.useEffect.loadDataStoreFeatures.DataStore.query', 'error:', error);
         /* istanbul ignore next */
        throw error;
      }
    }    
    loadDataStoreFeatures();

    return () => {
      logCall('useSynchronizer.useEffect.unsubscribe');
      subscription.unsubscribe();
      globalSubscription.unsubscribe();
    };
  }, [dispatch, isUserLoggedIn]); // Or [] if effect doesn't need props or state  
}
