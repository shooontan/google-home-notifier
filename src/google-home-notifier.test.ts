import GoogleHomeNotifier from './google-home-notifier';

const deviceName = 'google-home';
const ip = '192.168.0.0';
const lang = 'jp';
const timeout = 1000;

test('notifier instance', () => {
  const notifier = new GoogleHomeNotifier();
  notifier.device(deviceName);
  notifier.ip(ip);
  notifier.lang(lang);
  expect(notifier.deviceName).toBe(deviceName);
  expect(notifier.deviceAddress).toBe(ip);
  expect(notifier.language).toBe(lang);
});

test('notifier instance options', () => {
  const notifier = new GoogleHomeNotifier({
    device: deviceName,
    lang,
  });
  expect(notifier.deviceName).toBe(deviceName);
  expect(notifier.deviceAddress).toBe('');
  expect(notifier.language).toBe(lang);
});

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
});
