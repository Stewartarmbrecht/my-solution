// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PostStatus = {
  "ACTIVE": "ACTIVE",
  "INACTIVE": "INACTIVE"
};

const { PostData, DataItem, GlobalDataItem } = initSchema(schema);

export {
  PostData,
  DataItem,
  GlobalDataItem,
  PostStatus
};