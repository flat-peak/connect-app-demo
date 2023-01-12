# Introduction

This React Native app is a template that you can use to build FlatPeak user experience into your mobile app or another system. While this template is **iOS only**, it can be easily and quicly ported for Android as most of the elements can be reused. Contact [support](mailto:support@flatpeak.energy) for further assistance.

Main tools used to develop this project:

- React - https://reactjs.org
- Expo - https://expo.dev

## Running locally

Create `.env` file in the root folder with the following content:

```
API_URL=https://api.flatpeak.energy
API_PUBLISHABLE_KEY=pk_****_****************
```
Pick value for *API_PUBLISHABLE_KEY* from FlatPeak Dashboard.

### Install dependencies


```
npm install
```

### Update environment variables

- Copy **.env.blank** to **.env** and set up the variables in the file. Get correct values from FlatPeak Dashboard.
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

### Install EAS

FlatPeak Demo Client app uses [Expo & EAS](https://www.npmjs.com/package/eas-cli)

- Install EAS `npm install -g eas-cli`

- In **package.json**
  - Increment `"version": "x.x.x",`

- In **app.config.js**:

  - Replace `projectId=****************` with projectId of your AppleDeveloper account.

  - Replace `bundleIdentifier: IS_DEV ? "<name>.<domain>.dev" : "<name>.<domain>",` with your bundle identifier; refer to [Expo Docs](https://docs.expo.dev/versions/v45.0.0/config/app/#bundleidentifier)

  - Replace `"API_PUBLISHABLE_KEY": "pk_test_****************"` in `./eas.json` with publishable **test** key from FlatPeak Dashboard.

  - Replace `"API_PUBLISHABLE_KEY": "pk_live_****************"` in `./eas.json` with publishable **live** key from FlatPeak Dashboard.

### Build preview

The preview is not published to Apple App Store (find it in TestFlight). Access it via direct device install ([Expo Doc](https://docs.expo.dev/build/internal-distribution/))

```
eas build --profile preview --platform ios
```

### Build & Submit production release

Production is published into Apple App Store (find it in TestFlight).

```
eas build --profile production --platform ios
```

```
eas submit --profile production --platform ios
```
