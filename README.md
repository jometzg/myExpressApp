# Azure App Services Node.js Workshop
This workshop is a step-by-step guide to exploring the features of app services using a standard Node.js sample application.

This is based on our documentation here https://docs.microsoft.com/en-gb/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-azure-portal

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

