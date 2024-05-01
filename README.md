# My Solution

# Solution Architecture


## Objectives
Below are the objectives that drove the design of this solution.
1. **Universal App (Mobile, Web, and eventually TV)** - This app uses Expo to enable using a single code base to deploy mobile, web, and tv apps.

2. **Offline First** - This app should be capable of running offline as well as online with realtime updates streaming to the app when updates are made in other apps.

3. **Container Based Development** - The development environment is setup to run in a Docker container.

4. **Scalable Development Model** - The solution is designed to support the deployment of multiple environments that would be useful for a team based development model.  This includes individual development environments, preview environments that can be used for external user testing, and a production environment.

5. **Concept to Cash** - While not achieved yet, ultimately the goal is to setup this repo as a starting point that provides a complete development pipeline for you.  Designed to handle standard flows for:
    1. Initial Environment Setup for Local Dev, Shared Preview, and Production
    2. Local, offline development, testing, and debugging
    2. Source Control Management <-- Not Added Yet
    2. Continuous Integration and Continuous Deployment <-- Not Added Yet
    3. Production Monitoring <-- Not Added Yet
    4. Collecting Payments <-- Not Added Yet


## Project Technologies

1. **IDE - VS Code** - The development environment was built assuming the user is using VS Code.  While we have avoided using VS Code specific flows (like using VS Code posts for development activities), we have not explicitly designed the code base or tested it to see if the flows work outside of VS Code.  Instructions on performing setup activities will assume you are working in VS Code.

2. **Containerization - Docker** - Used to enable setting up development environments across multiple platforms: Windows, Mac, or Linux.

3. **Source Code - Git** - Used for source control with remotes hosted on GitHub.

4. **Monorepo - Nx** - Used for manage aspects of working in a monorepo. 

5. **Code - TypeScript** - Used to provide type saftey.

6. **Development Framework - Expo** - Used to provide the universal app development model.

7. **Mobile Framework - React Native** - Foundation for mobile app development.

8. **Transpilation - Babel** - Used for transpiling typescript.

9. **Bundling - Metro** - Used for bundling the web and mobile app.

10. **Static Code Analysis - ESLint & Prettier** - 

11. **Mobile Builds and Deployments - EAS** - Expo's EAS services are used to build and deploy IOS and Andriod mobile apps.

12. **Backend, Web Hosting, & Offline Storage - Amplify** - Used for providing backend services for authentication and data sync.  This also includes enabling offline storage on both mobile and web.


# SETUP 


## SOURCE CODE REPOSITORY
Our approach for establishing the full development ecosystem for your solution starts first with setting up a repository to store you code.
1. [Setup GitHub Account.](https://github.com/)
2. Create a new repo using [this repo](https://github.com/Stewartarmbrecht/my-solution) as the template.  At the top right of the repo in GitHub click the green 'Use this template' button and selec 'Create a new repository'.


## DEVELOPMENT ENVIRONMENT SETUP

### INSTALL PREREQUISITES
1. [Install Docker](https://www.docker.com/get-started/)
2. [Install Visual Studio Code](https://code.visualstudio.com/download)

### PERSONALIZE SOLUTION
1. **Clone Repo** - Clone the repo you created
```
git clone <your repo url>
```
2. **Start IDE** - Open in Visual Studio.
```
cd my-solution
code .
```
3. **Open In Container** - Open the workspace in a development container.  
NOTE:  The devcontainer.json file is set to forward port 19001 to your container.
This port is used by Expo to connect your dev build on a physical device to the metro server hosted in your container.

You can change this if you like.  Just make sure to find all other references to 19001 in the solution files and update them as well.
```
Cntrl+Shift+P
"Reopen in Container"
```
4. **Install** - Install the project depdendencies using npm.
```
npm install
```
5. **Claim Project** - Run the claim-workspace.js script.  
    * **Argument 1: Solution Name** - This script updates all references from 'my' or 'My' to your solution name.  
    * **Argument 2: Company Slug** - This value will be cast to lower case and inserted into the app identifiers.  Ex. com.stewartarmbrecht.myapp.com.
    * **Argument 3: IP Address** - Sets your host maching IP address in the .env file in the root of the project.  This enables the expo dev build to connect to your metro server hosted in the container.
```
node ./tools/scripts/claim-project Better BoundByBetter 10.24.1.57 19001
```
6. **Rebuild Dev Container** - After you have 'claimed' the project rebuild the container.
```
Cntrl+Shift+P
"Rebuild Container"
```

## SETUP PROD BACKEND (AMPLIFY)

1. Create Amazon account if you don't already have one:  [Sign Up for AWS](https://portal.aws.amazon.com/billing/signup?nc2=h_ct&src=header_signup&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start/email)

2. Initialize Amplify
You need to initialize amplify to create some local files so that you can run the app.
Note: if amplify is not recognized as a command I have found that rebuilding the container will fix this.  Just press Cntrl+Shift+P and them type Rebuild Container and select the Dev Container command.
```
npx nx amplify-init <solutionName>-backend
```
* **Environment Name:** prod
* **Default Editor:** Visual Studio Code
* **Authentication:** AWS Profile
* **New User:** Yes
* **Region:** Your choice.
* **Amplify CLI User:** Click the link and follow the instructions to set a user that your Amplify CLI will use to connect to AWS.  Set a name that will help you identify the cli running in your dev container.  If you are connecting to a shared AWS account consider adding a name like:  mySolutionBackend-<userName>
* **accessKeyId:** Copied from access key created in instructions provided.
* **secretAccessKey:** Copied from access key created in instructions provided.
* **Profile Name:** (default)
* **Profile to Use:** default

3. Create amplify backend resources.
```
npx nx amplify-push <solutionName>-backend
```
  * **✔ Are you sure you want to continue? (Y/n):** Yes
  * **? Do you want to update code for your updated GraphQL API (Y/n):** No

## RUN LOCAL WEB APP

1. Run the app to verify the setup.
To run the app you need to export the ip address of your machine and set the port for the javascript bundle to the value you set above then start the app.  This command will start the app in web mode:

```
npx nx start my-app
after the app starts press 'w'
```

## DEBUG LOCAL WEB APP
To debug the web app, just open the browser devTools.
Be sure to install the React Developer Tools and the Redux Developer Tools add ons to help debug the application.

## RUN UNIT TESTS
1. Run all unit tests and verify success.
```
npx nx run-many -t test
```

## DEPLOY MOBILE DEVELOPMENT BUILD

1. Create an Expo Account:  [Expo Sign Up](https://expo.dev/signup)
2. Remove eas project id and updates URL.  In the app.config.js, comment out 'updates' and the 'extra.eas' sections so it looks like this:
```
  ...
  // updates: {
  //   url: 'https://u.expo.dev/0b1aa1f3-a7d9-4a39-8bfe-024107fcfbdb',
  // },
  ...
  extra: {
    // This is the project ID from the previous step
    // eas: {
    //   projectId: '0b1aa1f3-a7d9-4a39-8bfe-024107fcfbdb',
    // },
  },
  ...
``` 
2. Create a build:
```
npx nx build-dev my-app
```
* Email or username: [from the EAS account you created]
* Password: [Your EAS password]
* Select Platform: [Select the one you want]
* Would you like to automatically create an EAS project for @stewartoutlook/my-app? Y

You will get an error because the project uses dynamic app configuration.  Follow the instructions to update the app.config.js file with your expo.extra.eas.projectId property.
```
Warning: Your project uses dynamic app configuration, and the EAS project ID can't automatically be added to it.
https://docs.expo.dev/workflow/configuration/#dynamic-configuration-with-appconfigjs

To complete the setup process, set "extra.eas.projectId" in your app.config.js:

{
  "expo": {
    "extra": {
      "eas": {
        "projectId": "[your id]"
      }
    }
  }
}
...
```
3. Edit app.config.js using the directions above.
While you are updating this file from the directions above.  You should also set the updates.url in the file.  
Change the guid in the url to match the value you set for your projectId above.
```
  updates: {
    url: "https://u.expo.dev/fbd799b8-ac94-42ee-83ff-194ce23b9a59"
  },
```
You should also update the owner to match your account:
```
owner: "stewartarmbrecht"
```
4. Rerun the build:
```
npx nx build-dev my-app
```
5. Install development build by scanning the QR Code


## RUN MOBILE DEVELOPMENT BUILD ON PHYSICAL DEVICE
After you have installed the development build.  Run the app:
```
npx nx start my-app
```
Then scan the QR Code with your phone.  The app should be running on your phone.
If you have a problem with the preview app being loaded from the dev server QR code, then just enter the URL manually in the dev instance of the app.  The URL should be http://<your IP Address>:<The port you selected>

## RUN MOBILE DEVELOPMENT BUILD ON ANDROID EMULATOR
### First Time
```
npx nx run-android my-app
```
### After Dev Build Installed
'''
npx nx start-local my-app
'''
Then press a to run on android.

## DEBUG MOBILE APP

### Debugging Code
1. **Start App:**  Start the app use the instructions for Running the development build on a physical device above.
2. **Open Browswer:**  Open Edge or Chrome and enter ```edge://inspect``` or ```chrome://inspect```
3. **Set Network Targets:** Next to Discover network targets click configure and enter your host machines ip address and the port you started the development build on (ex. 19001)
4. **Inspect Hermes React Native:** Click the 'inspect' link under Hermes React Native shown under remote targets.
5. **Find Code:** To find the code hit Cntrl-P and type in the name of the code file.  
//TODO: Load the code into the workspace.
6. **Break Points**: Breakpoints did not work for me.  Instead I added ```debugger;``` into my code to break.
//TODO: Fix code mapping to breakpoints line up to code.
//TODO: Enable code debugging in VS Code.

### Inspecting UI and Performance Tracing (React Dev Tools)
1. **Start App Server:**  Start the app using ```npx nx start my-app```.
2. **Open App on Phone:**  Start the app on your phone.
2. **Open React Dev Tools:**  Hit Shift+M in the terminal where you started the app to open more tools options.  Select ```Open React devtools``` and then hit enter.  Enter yes to option to open the browser page.
3. **Reload the App:** Open the app on your phone.  The browser should then connect to your app and allow you to inspect the UI elements and take performance snapshots.


## DEPLOY MOBILE PREVIEW BUILD
The mobile preview build gives you an instance of the application that will run without the metro server running.  This instance will also accept updates via the preview channel.
1. Create a preview build:
```
npx nx build-preview my-app
```
2. Install Preview.  Scan the QR Code from running the last command and install the app on your phone.

## DEPLOY MOBILE PREVIEW UPDATE
The mobile preview update allows you to push changes to your preview users without having to re-install the app on the phone.
1. Update Main.tsx.  Update the Update number:
```
        <Text>
          v0.0.1 Update 002
        </Text>
```
1. Deploy update.
```
npx nx update-preview my-app
```
2. Test update.
Open and close the app on your phone 2 or more times and you should see the update.

## SETUP CI/CD - PRODUCTION WEB HOSTING AND MOBILE UPDATE DEPLOYMENT

### EAS Build Token
You need to create an EAS Robot token so that Amplify can trigger a build and deployment of your app.  For more information see this:  [Robot users and access tokens](https://docs.expo.dev/accounts/programmatic-access/#personal-access-tokens) 
**Add Robot:** Create a new robot on the ```https://expo.dev/accounts/**your account**/settings/access-tokens``` page.
  * **Name:** Your app name+ "-delpoyment".
  * **Role:** "Developer".
**Create Token:** Click the create token under the new robot you just created.
  * **Token name:** Your app name+"-deployment-token".
**SAVE TOKEN:** Make sure to save your token somewhere safe where you can access it later.

### Setup Prod Amplify Hosting
[AWS Amplify Hosting Guide](https://docs.amplify.aws/javascript/tools/cli/hosting/#using-aws-amplify-console)
```
npx nx amplify-add-hosting backend
```
**Select the plugin module to execute …** ❯ Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
**Choose a type** > Continuous deployment (Git-based deployments)
**Select Repo:** The last selection should launch a browser and take you to your app console.  Select Hosting Environment and then select your repo.  
**Select Branch:** Select your main or master branch.  Do NOT select the option that designated your repo as a monorepo.
**App Build and Test Settings:** Our setup uses an amplify.yaml file in the root of the report to handle the deployment.
  * **Repo:** Select your repo.
  * **Branch:** Select master.
  * **App Name:**  Select the backend we deployed earlier.
  * **Environment:** Select 'prod'.
  * **Service Role:** Select the one you created earlier.  //TODO: Update with when this was created.
  * **Advanced Settings:** Expand this section:
    * **Environment Variables:** Click add under the Environment Variables section and add the following variables:
      * **EXPO_TOKEN:**  Use the EAS robot token you created earlier.

Save and run the deployment.

### Setup Dev Amplify Hosting
1. In the amplify console, go to the 'Backend environments' tab.  
2. On the 'prod' environment click 'Actions' and the choose 'Clone'.
3. Enter 'dev' and click 'Clone'.
4. After the deployment of the new 'dev' environment is complete, go to the 'Hosting environments' tab.
5. Click 'Connect a branch' button.
    * **Branch:** dev
    * **App name:** Select the app we have been working with.
    * **Environment:** Select the branch we just created: 'dev'.  
6. To Develop using the dev environment run the following command:
```
npx nx amplify-pull-dev backend

? Select the authentication method you want to use: AWS profile
? Please choose the profile you want to use: default
? Which app are you working on? <your app id>
✔ Choose the type of app that you're building: javascript
? What javascript framework are you using: react-native
? Source Directory Path:  src
? Distribution Directory Path: /
? Build Command:  npm run-script build
? Start Command: npm run-script start
? Do you plan on modifying this backend? Yes
```
Then switch to using that environment for development:
```
npx nx amplify-checkout-dev backend
```
Then switch to the dev branch in the repo and merge master into dev:
```
git checkout dev
git merge master
```

Save and run the deployment.


  

## ENABLE OFFLINE DEVELOPMENT
TBD...
### Amplify Local Dev Environment
TBD...


# DEVELOPMENT FLOW
In the code below, replace my-app with the name of your application.

## New Feature Development

1. **Write End-to-End (E2E) Web Test:** Write a cypress test that performs the new feature you want to build.  This test should be located in the 'my-app-e2e/cypress/e2e' folder.
2. **Verify E2E Web Test Fails:** Start the app and the Cypress test runner:
In the first terminal run metro and verify the app is up and running.
```
npx nx start my-app
w <- type 'w' to launch a browser and push metro through the first build.
```
In the second terminal:
```
npx nx test-web-dev my-app-e2e
```
3. **Write E2E Mobile Test:** Write a detox test that performs the new feature you want to build.  This test should be located in the 'my-app-e2e/detox' folder.
4. **Run E2E Mobile Test:** Run the new E2E test you wrote for mobile.
3. **Write Unit Test:** Write a unit test the requires the new code you need to write.
4. **Verify Unit Test Fails:** Run your unit test and verify it fails:
```
Cntrl/Cmd+Shift+P
Test: Run Test at Cursor
```
5. **Write Code:** Write your code and rerun the tests until they pass.
6. **Verify Unit Test Passes:** If you need to debug a test:
```
Cntrl/Cmd+Shift+P
Test: Debug Test at Cursor
```
7. **Verify E2E Test Passes:** Run your test that you created through the Cypress UI.
8. **Verify in App:** Manually verify your new feature in the web browser that you started in the first step.
9. **Debug Web App:** 
Once the app is started.  Open the dev tools.  In the sources tab you can find files using Cmd/Cntrl+Shift+P and typing the file name.  You can also set breakpoints.  Install the redux tools as well as the React Native tools and you can inspect redux, the UI elements, and the UI performance.
10. **Run All Unit Tests:** Run all unit tests to verify all are still passing:
```
npx nx run-many -t test
```
Alternatively, you can run all unit tests in a single project (ex. my-app) using:
```
npx nx test my-app
```
11. **Verify Unit Test Code Coverage:** After you completed building your feature and have all tests passing, verify you have 100% code coverage.
```
npx nx run-many -t test-coverage
```
Alternatively, you can check code coverage for a single project (ex. my-app) using:
```
npx nx test-coverage my-app
```
12. **Run All E2E Web Tests:** Run all the cypress tests to verify 

## Adding Dependencies

1. **Install Expo Modules:** Use the following command to install expo modules in your app project:
```
npx nx install my-app package1,package2,package3
```
2. **Sort Package Dependencies:** Use the following command to sort the dependencies in a package.json
```
cd to-directory-with-package-json
npx sort-package-json
```
3. **Update Development Build:** If you install modules that require updating the development build that is deployed to devices:
```
npx nx build-dev my-app
```
After you run the build, you will need to scan the QR code on all devices to update your development build.


# DEPLOYMENT FLOW

1. **Add Backend Features** - Make changes to the backend that only add new features that will not interfere with the existing production app.

2. 

