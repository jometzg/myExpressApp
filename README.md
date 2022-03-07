# Azure App Services Node.js Workshop
This workshop is a step-by-step guide to exploring the features of app services using a standard Node.js sample application.

This is based on our documentation here https://docs.microsoft.com/en-gb/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-azure-portal

What this workshop demonstrates is how to:
1. [Create a web app in the Azure portal](#Create-a-Web-App)
2. [A tour of app services](#A-tour-of-app-service-features)
3. [Create a sample app code on your machine (in Node.js)](#Creating-and-building-the-demo-app)
4. [Deploy to your web app on Azure](#Deploy-the-Express-application-to-an-Azure-Web-App)
5. [Validate it is working and inspect the deployed web app](#Check-that-your-application-has-deployed-correctly)
6. [Demonstrate how to use deployment slots for blue/green deployments](#Blue/Green-Deployments-using-Deployment-Slots)
7. [How to inject variables or secrets into your web app](#Injecting-variables-and-secrets-into-a-web-app)
8. [How to use key vault to store a secret that the web app then uses](#Using-Azure-Key-Vault-to-hold-secrets)

## Prerequisites
1. Access to an Azure subscription or resource group with contributor rights.
2. Command line in Windows/WSL or a Mac (this guide will concentrate on Windows, but it should be very similar in Linux (WSL) or a Mac
3. Visual Studio Code with the *Azure Tools* extension installed (this extension is published by Microsoft)
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


## A tour of app service features

Spend some time looking at some of the features of the web app. A list of the more useful ones is shown below:
1. Overview - URL

![alt text](images/web-app-overview.png "web app overview")

2. Metrics

![alt text](images/web-app-metrics.png "web app metrics")

![alt text](images/service-plan-metrics.png "service plan metrics")

3. Service plan

![alt text](images/service-plan-overview.png "service plan overview")

4. Scale up and scale out

![alt text](images/service-plan-scale-up.png "service plan scale up")

![alt text](images/service-plan-scale-out.png "service plan scale out")

5. Configuration/General Settings - can see the node version

![alt text](images/web-app-general.png "web app general settings")

6. Application settings

![alt text](images/web-app-settings.png "web app application settings")

7. Deployment slots

![alt text](images/web-app-deployment.png "web app deployment slots")

8. Log stream

![alt text](images/web-app-log-stream.png "web app log stream")

9. Diagnostic settings

![alt text](images/web-app-diagnostic-settings.png "web app diagnostic settings")

10. App Service logs

![alt text](images/web-app-logs.png "web app logs")

11. Advanced tools - the Kudu console

![alt text](images/web-app-advanced-tools.png "web app advanced tools")

  1. Look at files

![alt text](images/web-app-bash.png "web app bash console")

  2. Curl http://ifconfig.co for outbound IP address
  3. Nslookup
  4. Ping

![alt text](images/web-app-ssh.png "web app SSH console")


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
7. You should then see in a browser session at http://localhost:3000 the Express default page:

![alt text](images/express-home.png "Express app")

But this is only now running locally, so let's upload this to our previously created web app.


## Deploy the Express application to an Azure Web App
If you have Visual Studio Code (VSCode) installed, the simplest way of lauching it from the command line is to:
```
code .
```

You should then launch VSCode in the correct folder:

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

> For more explanation on what is happening above, the Azure app service can take deployments built elsewhere - in development environments or in DevOps pipelines or it can perform these build steps on its own. In this way, app services can work directly with code repositories. In general, it is more common for applications to be built externally and the pre-built artifacts to be deployed.

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
4. Either *swap* the slots - for a full deployment to the new version
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

Your application on the main URL should now look like this:

![alt text](images/web-app-v2.png "Web App v2")

### Canary deployment
This is a little different to a slot swap, but what we intend here is to use both slots and get app services to push a percentage of requests to the staging slot and then the remainder to the main production slot.

This is done by choosing the main web application (not the staging one) and then alter the percentage to the staging and save.

![alt text](images/deployment-slot-canary.png "Web App canary deployment")

Once this has completed, the web application will serve a ratio of requests from clients. So, in the case above 25% will go to the staging slot and 75% to the main production slot. This can be tested, but this is best in incognito/InPrivate sessions as once one client hits one of the slots, it is sticky.

### Backing out a release
This is straightfoward - it is essentially reversing the previous steps.
1. If a full slot swap was done, then swap again
2. If a canary style deployment, then you should then set the staging slot to now be 0%

Check this out for yourself by doing some experiments. It may be useful to use new browser sessions for each test. 


## Injecting variables and secrets into a web app
This simplest route to injecting variables into your app code is to use *environment variables* these can be then set at a command prompt before running your app and the app can then be amended to pick up a value from an environment variable. App services uses this mechanism to allow you to set a variable in the Azure portal and for your application to the pick it up and use it. 

The same mechanism may be used for *secrets*, such as connection strings to databases.

The steps are:
1. create a variable in the app that picks up an environment variable
2. Update the app to display the variable
3. Test locally by injecting it
4. Upload the app to Azure
5. Add an "Application Setting" for that environment variable and set its value
6. Validate that the application setting gets picked up by the application

### Create an environment variable
This is only needed to be able to locally test the application before deployment. It will not get used by the app service, becasue it is local to your machine.

How to create an environment variable and set its value will depend on which operating system:
```
## Windows
set TITLE=john

## Linux
TITLE=john
```
Now let's use it.

### Update application to display the environment variable's value
You can do almost anything here, but a simple change to our sample application is to update its controller for its main route, so the file *routes/index.js*

```javascript
var express = require('express');
var router = express.Router();
var titletext = process.env.TITLE

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: titletext });
});

module.exports = router;
```
This creates a variable *titletext* and sets its value to that of the environment variable *TITLE*.

### Test locally
You can run the application with:
```
npm start
```
Then validate that the output has changed

![alt text](images/env-variable-local.png "Local with env variable TITLE set to John")

### Upload the application
This is exactly the same process as earlier, going into VSCode and deploying the application from there.

![alt text](images/env-variable-web-app.png "Uploaded")

But there's a problem! We have not set the environment variable for the web application. So let's do that next...

### Set Application Setting
In an app service, the environment variables can be injected into the app runtime by values in *Application Settings*.

Go to Configuration/Application Settings and add a "New Application Setting" called "TITLE" and set its value:

![alt text](images/web-app-set-env-variable.png "Set an Application Setting")

Make sure to also hit "Save" after this dialog. It may also be necessary to *Restart* the web application after this

### Web app with application setting correctly set.

![alt text](images/env-variable-web-app-set.png "Resultant web application")

This is good, but if this varable is really a secret, such as a connection string, we can do better!


## Using Azure Key Vault to hold secrets
To recap so far. We have a web app deployed into app services and we can inject variables. Having these values set in *Application Settings* is much better than having these directly in code - especially so for secrets. But someone with access to the web application in the Azure portal could then read this value. Not ideal if this is a secret.

In this section, the plan is to use an Azure service called *key vault* to store a secret and then to configure the web app to use this value. Here are the steps we will go through:
1. Create a key vault
2. Create a secret of the same name as the environment variable from previous step (but different value)
3. Enable the web app to access the KV by using managed identity (including RBAC to KV)
4. Replace the application setting with a *key vault reference*
5. Check application
6. Look in Kudu at environment variables

Let's start.

### Create a key vault
A key vault is, like its name suggests, a place for holding secrets. A key vault is a separate Azure service that needs to be provisioned and later configured.

For the purposes of this workshop, we are going to create a key vault and just put a simple text value as a secret in the key vault. In normal use, user access to the key vault would be more restricted to enforce a division of responsibilities from those that create and manage secrets from those that either deploy or operationally manage applications.

Search for "key vault":

![alt text](images/search-key-vault.png "Search for key vault")

Choose key vault and *Create*:

![alt text](images/create-key-vault.png "Create key vault")

There is not much interesting here. You need a unique name and you need to decide in which resource group and region for deployment. One choice is to put the key vault in the same resource group as the app and it is recommended this is in the same region.

### Create a secret in the key vault
Inside the key vault in the Azure portal, select *Secrets" on the left menu and then *Generate/Import*

![alt text](images/generate-secret.png "Generate/Import secret")

![alt text](images/create-secret.png "Create secret")

Name your secret *TITLE*. It does not need to be named the same as the previous application setting, but I have named this for convenience. Don't forget to set a value for the secret too.

So, we now have a key vault and secret with a value.

### Enable web app to access the secret
Key vault is a separate service and an application needs to be able to access key vault. Key vault uses Azure AD to authenticate, so there needs to be an identity that can be used to access the key vault. 

The simplest approach is to enable *managed identity* from the web app to give it an identity which key vault can use.

Go to the web app and find the *identity* menu. Enable the system assigned managed identity by pressing *On* and *Save*

![alt text](images/enable-managed-identity.png "Create managed identity")

This then creates and Azure AD identity for the application which the key vault will later be able to accept.

![alt text](images/managed-identity-enabled.png "Created managed identity")

So, now we have an Azure AD identity that represents the application. Next to configure access from the web app to the key vault.

In the key vault, select *Access Policies*:

![alt text](images/access-policy.png "Key vault access policy")

Next, press *Add Access Policy*:

Here, you are going to add an access policy of being able to read secrets. So choose secrets and in its dropdown, only select *Get*

![alt text](images/add-access-policy.png "Key vault add access policy")

Next press the line "none-selected for "Select Principal". A *principal* is essentially the user and this in our context is the managed identity of the web app we created earlier. So in the search list, search for the name of your web app (because the system assigned managed identity is named the same as the web app).

![alt text](images/access-policy-add-principal.png "Key vault add access policy")

Then press *Add* to add this principal. Then press *Save* to Save this:

![alt text](images/save-access-policy.png "Save access policy")

So, now we have a secret in key vault and our web application is allowed to read that secret. So, now we need to configure the web app to use that secret.

### Configure web app to use a key vault secret
To allow a web app to use a key vault secret, there is a special syntax for an application setting that references the key vault. So instead of using the value of the application setting, it refers to a key vault.

The syntax is of the form below:
```
@Microsoft.KeyVault(SecretUri=https://your-key-vault-name.vault.azure.net/secrets/your-secret-name/)
```
So, in the web app, go back to Application Settings and replicate the value of the *TITLE* setting to the key vault reference. In the screen grab below, I have used "Advanced edit" and replaced the value of TITLE with the reference to key vault secret TITLE.

![alt text](images/set-key-vault-in-web-app.png "set key vault reference in web app")

Once this has saved, you then should see something like below:

![alt text](images/set-key-vault-in-web-app-completed.png "set key vault reference in web app")

Notice, that the *Source* field has been replaced by "key vault Reference". After a few seconds, there should be a green tick on this. This indicates that the web app could reference the key vault secret. If this is in red, the you need to check your key vault reference.

Once complete, your application should display the new secret value from key vault.

![alt text](images/app-with-key-vault-reference.png "App with key vault secret")

Here, I chose a different name from that of the previous application setting for *TITLE* to make sure that it was being pulled from key vault.

Just to reiterate, key vault would normally be used for things like connection strings and these would not normally be displayed on the user interface.

Congratulations. The workshop is complete.

# What we have learnt
In this small workshop, we have built a small Node.js application and uploaded this to an Azure web application. We have seen how we can use the notion of *deployment slots* to do safe deployments of our web apps - either in blue-green mode or canary-style releases. We have also seen how variables can be injected into our web apps and how there Azure app service configures these. Finally, for secret variables, we have used Azure Key Vault to store a secret and how to configure the web app to make use of a key vault secret.

App services also has a rich set of other features that may also be easily used to enhance an application.



