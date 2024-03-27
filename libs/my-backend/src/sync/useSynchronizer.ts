import { useEffect } from 'react';
import { 
  logRaw,
  Post, 
  logCall, 
  logSetup, 
  postAddedOrUpdatedViaSync, 
  postDeletedViaSync, 
  postsLoadedViaSync 
} from '@my-solution/my-shared';
import { DataStore } from '@aws-amplify/datastore';
import { PostData } from '../models';
import { useDispatch } from 'react-redux';

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
    const subscription = DataStore.observe(PostData).subscribe(msg => {
      logCall('useSynchronizer.useEffect.DataStore.observe', 'msg:', msg);
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
      logCall('useSynchronizer.useEffect.loadDataStorePosts');
      try {
        const postsData: PostData[] = await DataStore.query(PostData);
        logCall('useSynchronizer.useEffect.loadDataStorePosts.DataStore.query');
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
      subscription.unsubscribe()
    };
  }, [dispatch, isUserLoggedIn]); // Or [] if effect doesn't need props or state  
}
