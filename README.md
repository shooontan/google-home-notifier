# Google Home Notifier

Send notifications to Google Home.

This module is rewrite in TypeScript based on [google-home-notifier](https://github.com/noelportugal/google-home-notifier). We are freed of the need to build with node-gyp when run `npm install`.

## Install

```shell
# npm
$ npm install @shooontan/google-home-notifier

# or yarn
$ yarn add @shooontan/google-home-notifier
```

## Usage

```javascript
const GoogleHomeNotifier = require('@shooontan/google-home-notifier');

(async () => {
  const notifier = new GoogleHomeNotifier();
  await notifier.create();

  const message = 'Hi!';
  await notifier.say(message);
})();
```

### Options

```javascript
const notifier = new GoogleHomeNotifier({
  device: 'Google-Home',
  ip: '192.168.1.20',
  lang: 'ja',
});

const message = 'はーい';
await notifier.say(message);
```
