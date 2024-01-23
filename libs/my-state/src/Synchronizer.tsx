import { useEffect } from 'react';
import { PostData, DataStore } from '@my-sample/my-backend'
import { useAppDispatch } from './hooks';
import { Post } from './types';
import { postAddedOrUpdatedViaSync, postDeletedViaSync, postsLoadedViaSync } from './postsSlice';
import logRaw, { logCall, logSetup } from '@my-sample/my-logger';

/**
 * Synchronizes the redux data with the amplify datastore.
 * @returns {JSX.Element} The root component of the app.
 */
export function Synchronizer({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  logSetup('Synchronizer');

  const dispatch = useAppDispatch();

  useEffect(() => {
    logCall('Synchronizer.useEffect');
    const subscription = DataStore.observe(PostData).subscribe(msg => {
      logCall('Synchronizer.useEffect.DataStore.observe', 'msg:', msg);
      switch (msg.opType) {
        case 'DELETE':
          dispatch(postDeletedViaSync({
            id: msg.element.clientId,
            serverId: msg.element.id,
            title: msg.element.title,
            content: msg.element.content,
            rating: msg.element.rating,
            status: msg.element.status,
            author: msg.element.author,
            createdAt: msg.element.createdAt,
            updatedAt: msg.element.updatedAt,
          }));
          break;
        case 'INSERT':
          dispatch(postAddedOrUpdatedViaSync({
            id: msg.element.clientId,
            serverId: msg.element.id,
            title: msg.element.title,
            content: msg.element.content,
            rating: msg.element.rating,
            status: msg.element.status,
            author: msg.element.author,
            createdAt: msg.element.createdAt,
            updatedAt: msg.element.updatedAt,
          }));
          break;
        case 'UPDATE':
          dispatch(postAddedOrUpdatedViaSync({
            id: msg.element.clientId,
            serverId: msg.element.id,
            title: msg.element.title,
            content: msg.element.content,
            rating: msg.element.rating,
            status: msg.element.status,
            author: msg.element.author,
            createdAt: msg.element.createdAt,
            updatedAt: msg.element.updatedAt,
          }));
          break;
      }
    });
    const loadDataStorePosts = async () => {
      logCall('getDataStorePosts');
      try {
        const postsData: PostData[] = await DataStore.query(PostData);
        logCall('getDataStorePosts.DataStore.query');
        const posts: Post[] = postsData.map((postData) => ({
            id: postData.clientId,
            serverId: postData.id,
            title: postData.title,
            content: postData.content,
            rating: postData.rating,
            status: postData.status,
            author: postData.author,
            createdAt: postData.createdAt,
            updatedAt: postData.updatedAt,
        }));
        logCall('getDataStorePosts', 'count:', posts.length);
        dispatch(postsLoadedViaSync(posts));
      } catch (error) {
        logRaw('getDataStorePosts', 'error:', error);
        throw error;
      }
    }    
    loadDataStorePosts();
    return () => {
      subscription.unsubscribe()
    };
  }, [dispatch]); // Or [] if effect doesn't need props or state  

  return (children)

}

