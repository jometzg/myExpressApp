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

