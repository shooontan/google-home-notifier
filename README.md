# @shooontan/google-home-notifier

[![npm version](https://badge.fury.io/js/%40shooontan%2Fgoogle-home-notifier.svg)](https://badge.fury.io/js/%40shooontan%2Fgoogle-home-notifier)
[![Build Status](https://travis-ci.org/shooontan/google-home-notifier.svg?branch=master)](https://travis-ci.org/shooontan/google-home-notifier)

Send notifications to Google Home.

This module is rewritten in TypeScript based on [google-home-notifier](https://github.com/noelportugal/google-home-notifier). We are freed of the need to build with node-gyp when run `npm install`.

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
  const notifier = GoogleHomeNotifier();
  await notifier.create();

  const message = 'Hi!';
  await notifier.say(message);
})();
```

## Document

## GoogleHomeNotifier([options])

```javascript
  const notifier = GoogleHomeNotifier(options);
```

`options` arguments is optional.

- `options.device`: `string` device name. example `Google-Home`.
- `options.ip`: `string` Google Home device ip address.
- `options.lang`: `string` language code. [Google Document](https://cloud.google.com/speech-to-text/docs/languages)

### notifier.create()

```javascript
await notifier.create();
```

`notifier.create()` find out Google Home device ip address and auto set ip address to notifier instance.

If setting options.ip, `notifier.create()` does not need.

### notifier.say(message, [options])

```javascript
await notifier.say(message, options);
```

Send notification to Google Home.

- `message`: `string` notification text.
- `options`: `object`
  - `lang`: `string` same as GoogleHomeNotifier `options.lang`.
  - `speed`: `number` notification text speed. default `1`.

### notifier.play(mp3Url)

```javascript
await notifier.play(mp3Url)
```

Play mp3 with Google Home.

- `mp3Url`: `string` | `Array<string>`
