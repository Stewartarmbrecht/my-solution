const config = {
  "amplify": {
    "projectName": process.env.PROJECT_NAME,
    "envName": process.env.USER_BRANCH,
    "defaultEditor": "code",
    "appId": process.env.AMPLIFY_BACKEND_APP_ID
  },
  "frontend": {
    "frontend": "javascript",
    "framework": "react-native",
    "config": {
      "SourceDir": "src",
      "DistributionDir": "build",
      "BuildCommand": "npm run-script build",
      "StartCommand": "npm run-script start"
    }
  },
  "providers": {
    "awscloudformation": {
      "configLevel": "project",
      "useProfile": false,
      "accessKeyId": process.env.USER_KEY,
      "secretAccessKey": process.env.USER_SECRET,
      "region": "us-east-1"
    }
  }
}
module.exports = config;