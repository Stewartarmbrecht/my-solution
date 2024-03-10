/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createPostData = /* GraphQL */ `mutation CreatePostData(
  $input: CreatePostDataInput!
  $condition: ModelPostDataConditionInput
) {
  createPostData(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePostDataMutationVariables,
  APITypes.CreatePostDataMutation
>;
export const updatePostData = /* GraphQL */ `mutation UpdatePostData(
  $input: UpdatePostDataInput!
  $condition: ModelPostDataConditionInput
) {
  updatePostData(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePostDataMutationVariables,
  APITypes.UpdatePostDataMutation
>;
export const deletePostData = /* GraphQL */ `mutation DeletePostData(
  $input: DeletePostDataInput!
  $condition: ModelPostDataConditionInput
) {
  deletePostData(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePostDataMutationVariables,
  APITypes.DeletePostDataMutation
>;
