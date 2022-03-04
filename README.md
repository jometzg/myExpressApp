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

## A tour of app service features.

If you don't have an app service (web app already created
1. URL
2. Metrics in the overview
3. Service plan
4. Scale up and scale out
5. Configuration/General Settings - can see the node version
6. Log stream
7. Diagnostic settings
8. App Service logs
9. Advanced tools - the Kudu console - SSH or Bash
10. 	Look at files
11. 	Curl ifocnfig.co for outbound IP address
12. 	Nslookup
13. 	Ping


