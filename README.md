# Azure App Services Node.js Workshop
This workshop is a step-by-step guide to exploring the features of app services using a standard Node.js sample application.

This is based on our documentation here https://docs.microsoft.com/en-gb/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-azure-portal

What this workshop demonstrates is how to:
1. Create a web app in the Azure portal
2. Create a sample app code on your machine (in Node.js)
3. Test the sample app locally
4. Deploy to your web app on Azure
5. Validate it is working and inspect the deployed web app
6. Demonstrate how to use deployment slots for blue/green deployments
7. How to inject variables or secrets into your web app
8. How to use key vault to store a secret that the web app then uses

## Prerequisites
1. Access to an Azure subscription or resource group with contributor rights.
2. Command line in Windows/WSL or a Mac (this guide will concentrate on Windows, but it should be very similar in Linux (WSL) or a Mac
3. Visual Studio Code with the Azure extension installed
4. A version of Node.js 

## Create a Web App
It may be a little confusing, but web apps in Azure come under the product "app services". This is because, there are several types of web app, but they all use a common infrastrcture. So, if you hear app services on Azure - these are web apps. There are other means of hosting web apps, but app services is the main one and is the subject of this workshop.

![alt text](images/create-web-app.png "Create a web app")

You need to have:
1. A globally unique name
2. Choose Node as the runtime
3. Your favourite Azure region
4. A service plan of at least an S1 type (this will be needed for later stages)

Once deployed, your new app should have a holding page:
![alt text](images/web-app-holding-page.png "Create a web app")

## A tour of app service features.

Spend some time looking at some of the features of the web app. A list of the more useful ones is shown below:
1. Overview - URL
2. Metrics
3. Service plan
4. Scale up and scale out
5. Configuration/General Settings - can see the node version
6. Log stream
7. Diagnostic settings
8. App Service logs
9. Advanced tools - the Kudu console - SSH or Bash
  1. Look at files
  2. Curl http://ifconfig.co for outbound IP address
  3. Nslookup
  4. Ping

## Creating and building the demo app
For this we are using node to create an Express demo app.

1. Open up a command prompt into a new working directory/folder - name it what you like
2. Check that node is alive 
```javascript
node --version
```
3. Create the Express app
```javascript
npx express-generator myExpressApp --view pug
```
4. This should have created an app in the folder *myExpressApp*
5. cd to myExpressApp
6. Build the app, getting its dependencies
```javascript
npm install
```
6. The application can be locally tested by:
```javascript
npm start
```
7. You should then see in a browser session at http://localhost:300 the Express default page:

![alt text](images/express-home.png "Express app")

But this is only now running locally, so let's upload this to our previously created web app.

## Deploy the Express application to an Azure Web App
If you have Visual Studio Code (VSCode) installed, the simplest way of lauching it from the command line is to:
```
code .
```

You should then VSCode launch in the correct folder:

![alt text](images/vscode.png "VSCode")

If you have the Azure extension installed, there should be an "A" icon down the left side of VSCode. 

Click on it:

![alt text](images/vscode-azure-web.png "VSCode Azure Web Apps")

You should see your subscription and if you press the *>* arrow, it will then open and show a list of the web apps in that subscription. 
1. Choose your web app from the earlier step and right click
2. choose the item "Deploy to Web App..."
3. Pick "Yes" if it asks if you want to build on the web app
4. Pick "Deploy" - if you are sure

![alt text](images/vscode-deploy.png "VSCode Deploy warning")

6. Wait until it completes.

## Check that your application has deployed correctly
You can now go back to the Azure portal and on the Overview click the "URL"

![alt text](images/web-app-url.png "Azure portal Wb App Overview")

which show show the web app exactly like it was when running locally.

![alt text](images/web-app-test.png "Web App running")

Congratulations. You now have your app on Azure!

## Blue/Green Deployments using Deployment Slots
We now want to be able to deploy our application safely. Azure app services has the notion of *deployment slots*. These allow deployments to be made to another *slot* not directly impacting the main production web site. This is documented here https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots

To use deployment slots, there are several stages:
1. Create a deployment slot for our web application. 
2. Amend our application so this can represent a new version or release of our software
3. Deploy this version to the deployment slot
4. Either *swap* the slots - for a full deployment to tyhe new version
5. Or, only send a percentage of requests to the new slot - sometimes known as a canary release
6. Show that a deployment can be backed-out by swapping the slots again

### Create a deployment slot "staging"
The web app has a section "deployment slots". Choose this and then "Add Slot"

![alt text](images/create-deployment-slot.png "Create deployment slot staging")

You can name it anything you like, but *staging* is most meaningful in this context:

![alt text](images/deployment-slots-default.png "Deployment slot staging")

### Amend application to represent a new release
In VS Code amend your app and then save it.

![alt text](images/app-version-2.png "Amended app")

### Deploy to the "staging" slot
This deploy is very similar to the previous deployment, but inside the Azure extension for VSCode, you navigate inside the web app using the *>* and then select your named slot (should be "staging")

![alt text](images/vscode-deploy-to-slot.png "Deploy to slot from VSCode")

Follow all of the questions until you can see that it has deployed.

### Check the main application
This should be no different as you should have deployed to the staging slot only.

![alt text](images/web-app-test.png "Web App running")

### Swap slots
Choose *swap* and then on the confirmation dialog, press the *swap* button.

![alt text](images/web-app-slot-swap.png "Web App slot swap")

This can often take a minute or two. There then should be a confirmation - close the dialog.

### Canary deployment

### Backing out a release

## Injecting variables and secrets into a web app
The plan:
1. create a variable in the app that picks up an environment variable
2. Update the app to display the variable
3. Test locally by injecting it
4. Upload the app to Azure
5. Add an "Application Setting" for that environment variable and set its value
6. Validate that the application setting gets picked up by the application

This is good, but if this varable is really a secret - like a connection string, we can do better!

## Using Azure Key Vault to hold secrets
The plan:
1. Create a key vault
2. Create a secret of the same name as the environment variable from previous step (but different value)
3. Enable the web app to access the KV by using managed identity (including RBAC to KV)
4. Replace the application setting with a *key vault reference*
5. Check application
6. Look in Kudu at environment variables



8. 
