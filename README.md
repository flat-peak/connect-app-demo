# Introduction

This React Native app is a template that you can use to build FlatPeak Connect user experience into your mobile app or another system. While we currently only maintain iOS version, it can be easily ported to Android or webView. You will only need to change the publishing wrapper. Contact [support](mailto:support@flatpeak.energy) for further assistance.

Main tools used to develop this project:

- React - https://reactjs.org
- Expo - https://expo.dev

## Running locally
### Install dependencies


```
npm install
```

### Update environment variables

- Copy **eas.json.blank** to **eas.json**
- Copy **app.config.js.blank** to **app.config.js**

### To run app in development mode

```
npm start
```

### To run iOS app in development mode

```
npm run ios
```

## Build and Release

We use [Expo & EAS](https://www.npmjs.com/package/eas-cli) to build and release this template app. You can integrate an alternative build/publishing tool or follow the steps below.

### Install EAS

- Install `npm install -g eas-cli`

- In **package.json**
  - Increment `"version": "x.x.x",`

- In **app.config.js**:

  - Replace `projectId=****************` with projectId of your AppleDeveloper account (only if you want to publish into Apple's App store).

  - Replace `bundleIdentifier: IS_DEV ? "<name>.<domain>.dev" : "<name>.<domain>",` with your bundle identifier; refer to [Expo Docs](https://docs.expo.dev/versions/v45.0.0/config/app/#bundleidentifier)

### Build preview

```
eas build --profile preview --platform ios
```

### Build production release
Refer to [Expo Build Docs](https://docs.expo.dev/deploy/build-project/)

```
eas build --profile production --platform ios
```

### Submit production release
Refer to [Expo Submit Docs](https://docs.expo.dev/deploy/submit-to-app-stores/)

```
eas submit --profile production --platform ios
```
