# How to Authorize a New URL for Google OAuth

This guide will walk you through the steps to add your new Netlify URL to your Google Cloud project's list of authorized origins. This is necessary to fix the "Error 401: invalid_client" when signing in with Google on your live website.

### Step 1: Go to the Google Cloud Console Credentials Page

Click this link to go directly to the right page: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

You will be asked to sign in to your Google Account. Please use the same account you used to set up the project originally.

### Step 2: Select Your Project

At the top of the page, there is a dropdown menu, likely to the right of the "Google Cloud" logo. Make sure the project you created for SkinProve is selected.

### Step 3: Select Your OAuth Client ID

On the main part of the page, you will see a section titled **"OAuth 2.0 Client IDs"**. Underneath this, you should see the client ID you created for the web application. It is likely named something like "Web client 1". Click on its name to edit it.

### Step 4: Add the New URI

You are now on the configuration page for your client ID.
1.  Scroll down until you see the section called **"Authorized JavaScript origins"**.
2.  Click the **"+ ADD URI"** button.
3.  A new text box will appear. In this box, type the base URL of your Netlify site: `https://magenta-peony.netlify.app`
4.  Do not add a slash `/` at the end.

Your "Authorized JavaScript origins" section should now have at least two URIs:
*   `http://localhost:5173` (or whatever port you use locally)
*   `https://magenta-peony.netlify.app`

### Step 5: Save Your Changes

Scroll to the bottom of the page and click the blue **"Save"** button.

It may take a minute or two for Google's servers to update. After waiting a moment, please try to sign in with Google on your live Netlify site again. The error should now be gone.