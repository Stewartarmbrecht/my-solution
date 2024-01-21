/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePostDataInput = {
  id?: string | null,
  title: string,
  status: PostStatus,
  rating?: number | null,
  content?: string | null,
  notes?: string | null,
  author?: string | null,
  _version?: number | null,
};

export enum PostStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}


export type ModelPostDataConditionInput = {
  title?: ModelStringInput | null,
  status?: ModelPostStatusInput | null,
  rating?: ModelIntInput | null,
  content?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  author?: ModelStringInput | null,
  and?: Array< ModelPostDataConditionInput | null > | null,
  or?: Array< ModelPostDataConditionInput | null > | null,
  not?: ModelPostDataConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelPostStatusInput = {
  eq?: PostStatus | null,
  ne?: PostStatus | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type PostData = {
  __typename: "PostData",
  id: string,
  title: string,
  status: PostStatus,
  rating?: number | null,
  content?: string | null,
  notes?: string | null,
  author?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdatePostDataInput = {
  id: string,
  title?: string | null,
  status?: PostStatus | null,
  rating?: number | null,
  content?: string | null,
  notes?: string | null,
  author?: string | null,
  _version?: number | null,
};

export type DeletePostDataInput = {
  id: string,
  _version?: number | null,
};

export type ModelPostDataFilterInput = {
  id?: ModelStringInput | null,
  title?: ModelStringInput | null,
  status?: ModelPostStatusInput | null,
  rating?: ModelIntInput | null,
  content?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  author?: ModelStringInput | null,
  and?: Array< ModelPostDataFilterInput | null > | null,
  or?: Array< ModelPostDataFilterInput | null > | null,
  not?: ModelPostDataFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelPostDataConnection = {
  __typename: "ModelPostDataConnection",
  items:  Array<PostData | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionPostDataFilterInput = {
  id?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  rating?: ModelSubscriptionIntInput | null,
  content?: ModelSubscriptionStringInput | null,
  notes?: ModelSubscriptionStringInput | null,
  author?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPostDataFilterInput | null > | null,
  or?: Array< ModelSubscriptionPostDataFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreatePostDataMutationVariables = {
  input: CreatePostDataInput,
  condition?: ModelPostDataConditionInput | null,
};

export type CreatePostDataMutation = {
  createPostData?:  {
    __typename: "PostData",
    id: string,
    title: string,
    status: PostStatus,
    rating?: number | null,
    content?: string | null,
    notes?: string | null,
    author?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdatePostDataMutationVariables = {
  input: UpdatePostDataInput,
  condition?: ModelPostDataConditionInput | null,
};

export type UpdatePostDataMutation = {
  updatePostData?:  {
    __typename: "PostData",
    id: string,
    title: string,
    status: PostStatus,
    rating?: number | null,
    content?: string | null,
    notes?: string | null,
    author?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeletePostDataMutationVariables = {
  input: DeletePostDataInput,
  condition?: ModelPostDataConditionInput | null,
};

export type DeletePostDataMutation = {
  deletePostData?:  {
    __typename: "PostData",
    id: string,
    title: string,
    status: PostStatus,
    rating?: number | null,
    content?: string | null,
    notes?: string | null,
    author?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetPostDataQueryVariables = {
  id: string,
};

export type GetPostDataQuery = {
  getPostData?:  {
    __typename: "PostData",
    id: string,
    title: string,
    status: PostStatus,
    rating?: number | null,
    content?: string | null,
    notes?: string | null,
    author?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListPostDataQueryVariables = {
  id?: string | null,
  filter?: ModelPostDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPostDataQuery = {
  listPostData?:  {
    __typename: "ModelPostDataConnection",
    items:  Array< {
      __typename: "PostData",
      id: string,
      title: string,
      status: PostStatus,
      rating?: number | null,
      content?: string | null,
      notes?: string | null,
      author?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncPostDataQueryVariables = {
  filter?: ModelPostDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncPostDataQuery = {
  syncPostData?:  {
    __typename: "ModelPostDataConnection",
    items:  Array< {
      __typename: "PostData",
      id: string,
      title: string,
      status: PostStatus,
      rating?: number | null,
      content?: string | null,
      notes?: string | null,
      author?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreatePostDataSubscriptionVariables = {
  filter?: ModelSubscriptionPostDataFilterInput | null,
};

export type OnCreatePostDataSubscription = {
  onCreatePostData?:  {
    __typename: "PostData",
    id: string,
    title: string,
    status: PostStatus,
    rating?: number | null,
    content?: string | null,
    notes?: string | null,
    author?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdatePostDataSubscriptionVariables = {
  filter?: ModelSubscriptionPostDataFilterInput | null,
};

export type OnUpdatePostDataSubscription = {
  onUpdatePostData?:  {
    __typename: "PostData",
    id: string,
    title: string,
    status: PostStatus,
    rating?: number | null,
    content?: string | null,
    notes?: string | null,
    author?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeletePostDataSubscriptionVariables = {
  filter?: ModelSubscriptionPostDataFilterInput | null,
};

export type OnDeletePostDataSubscription = {
  onDeletePostData?:  {
    __typename: "PostData",
    id: string,
    title: string,
    status: PostStatus,
    rating?: number | null,
    content?: string | null,
    notes?: string | null,
    author?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
