const GoogleHomeNotifier = require('../build/index');

(async () => {
  const notifier = GoogleHomeNotifier();
  await notifier.create();

  const message1 = 'Hi!';
  await notifier.say(message1);

  const message2 = 'はーい！';
  await notifier.say(message2, {
    lang: 'ja',
  });
})();
