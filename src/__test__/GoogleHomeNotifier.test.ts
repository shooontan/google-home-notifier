import GoogleHomeNotifier from '../GoogleHomeNotifier';

const deviceName = 'google-home';
const ip = '192.168.0.0';
const lang = 'jp';
const timeout = 1000;

test('create browser error', async () => {
  const notifier = new GoogleHomeNotifier({
    device: deviceName,
  });
  await expect(notifier.create(timeout)).rejects.toEqual(
    new Error('timeout create browser')
  );
});

test('say command', async () => {
  const notifier = new GoogleHomeNotifier({
    device: deviceName,
  });
  await expect(notifier.say('')).rejects.toEqual(new Error('no deviceAddress'));
  notifier.ip('192.168.0.0');
  await expect(notifier.say('')).rejects.toEqual(new Error('no message'));
});

test('play command', async () => {
  const notifier = new GoogleHomeNotifier({
    device: deviceName,
  });
  await expect(notifier.play('')).rejects.toEqual(
    new Error('no deviceAddress')
  );
  notifier.ip('192.168.0.0');
  await expect(notifier.play('')).rejects.toEqual(new Error('no mp3 url'));
  // @ts-ignore
  await expect(notifier.play(1)).rejects.toEqual(
    new Error('play() arg is string or string[]')
  );
});
