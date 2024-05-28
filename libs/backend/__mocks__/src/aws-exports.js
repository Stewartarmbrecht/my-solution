// __mocks__/aws-exports.js

const awsmobile = {
  aws_project_region: "mock-region",
  aws_appsync_graphqlEndpoint: "mock-endpoint",
  aws_appsync_region: "mock-region",
  aws_appsync_authenticationType: "mock-auth-type",
  aws_cognito_identity_pool_id: "mock-pool-id",
  aws_cognito_region: "mock-region",
  aws_user_pools_id: "mock-user-pools-id",
  aws_user_pools_web_client_id: "mock-client-id",
  oauth: {},
  aws_cognito_username_attributes: [],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ["EMAIL"],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: []
  },
  aws_cognito_verification_mechanisms: []
};

export default awsmobile;