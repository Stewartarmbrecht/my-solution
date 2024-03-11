/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getPostData = /* GraphQL */ `query GetPostData($id: ID!) {
  getPostData(id: $id) {
    id
    clientId
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
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPostDataQueryVariables,
  APITypes.GetPostDataQuery
>;
export const listPostData = /* GraphQL */ `query ListPostData(
  $filter: ModelPostDataFilterInput
  $limit: Int
  $nextToken: String
) {
  listPostData(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      clientId
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
      owner
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
      clientId
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
      owner
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
