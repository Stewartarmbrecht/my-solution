import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum PostStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

type PostDataMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DataItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerPostData = {
  readonly id: string;
  readonly clientId: string;
  readonly title: string;
  readonly status: PostStatus | keyof typeof PostStatus;
  readonly rating?: number | null;
  readonly content?: string | null;
  readonly notes?: string | null;
  readonly author?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPostData = {
  readonly id: string;
  readonly clientId: string;
  readonly title: string;
  readonly status: PostStatus | keyof typeof PostStatus;
  readonly rating?: number | null;
  readonly content?: string | null;
  readonly notes?: string | null;
  readonly author?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PostData = LazyLoading extends LazyLoadingDisabled ? EagerPostData : LazyPostData

export declare const PostData: (new (init: ModelInit<PostData, PostDataMetaData>) => PostData) & {
  copyOf(source: PostData, mutator: (draft: MutableModel<PostData, PostDataMetaData>) => MutableModel<PostData, PostDataMetaData> | void): PostData;
}

type EagerDataItem = {
  readonly id: string;
  readonly payload: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDataItem = {
  readonly id: string;
  readonly payload: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DataItem = LazyLoading extends LazyLoadingDisabled ? EagerDataItem : LazyDataItem

export declare const DataItem: (new (init: ModelInit<DataItem, DataItemMetaData>) => DataItem) & {
  copyOf(source: DataItem, mutator: (draft: MutableModel<DataItem, DataItemMetaData>) => MutableModel<DataItem, DataItemMetaData> | void): DataItem;
}