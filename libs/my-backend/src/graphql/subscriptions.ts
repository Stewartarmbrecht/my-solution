/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreatePostData = /* GraphQL */ `subscription OnCreatePostData(
  $filter: ModelSubscriptionPostDataFilterInput
  $owner: String
) {
  onCreatePostData(filter: $filter, owner: $owner) {
    id
    clientId
    title
    status
    rating
    content
    notes
    author
    publishDate
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePostDataSubscriptionVariables,
  APITypes.OnCreatePostDataSubscription
>;
export const onUpdatePostData = /* GraphQL */ `subscription OnUpdatePostData(
  $filter: ModelSubscriptionPostDataFilterInput
  $owner: String
) {
  onUpdatePostData(filter: $filter, owner: $owner) {
    id
    clientId
    title
    status
    rating
    content
    notes
    author
    publishDate
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePostDataSubscriptionVariables,
  APITypes.OnUpdatePostDataSubscription
>;
export const onDeletePostData = /* GraphQL */ `subscription OnDeletePostData(
  $filter: ModelSubscriptionPostDataFilterInput
  $owner: String
) {
  onDeletePostData(filter: $filter, owner: $owner) {
    id
    clientId
    title
    status
    rating
    content
    notes
    author
    publishDate
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePostDataSubscriptionVariables,
  APITypes.OnDeletePostDataSubscription
>;
