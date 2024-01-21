/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getPostData = /* GraphQL */ `query GetPostData($id: String!) {
  getPostData(id: $id) {
    id
    title
    status
    rating
    content
    notes
    author
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPostDataQueryVariables,
  APITypes.GetPostDataQuery
>;
export const listPostData = /* GraphQL */ `query ListPostData(
  $id: String
  $filter: ModelPostDataFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listPostData(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      title
      status
      rating
      content
      notes
      author
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPostDataQueryVariables,
  APITypes.ListPostDataQuery
>;
export const syncPostData = /* GraphQL */ `query SyncPostData(
  $filter: ModelPostDataFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPostData(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      title
      status
      rating
      content
      notes
      author
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncPostDataQueryVariables,
  APITypes.SyncPostDataQuery
>;
