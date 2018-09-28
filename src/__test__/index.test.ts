import Notifier, { GoogleHomeNotifier } from '../index';

test('GoogleHomeNotifier instance', () => {
  const notifier = Notifier();
  expect(notifier).toBeInstanceOf(GoogleHomeNotifier);
});

test('GoogleHomeNotifier options', () => {
  const device = 'google-home';
  const ip = '192.168.0.0';
  const lang = 'jp';

  const notifier = Notifier({
    device,
    ip,
    lang,
  });
  expect(notifier.deviceName).toBe(device);
  expect(notifier.deviceAddress).toBe(ip);
  expect(notifier.language).toBe(lang);
});
