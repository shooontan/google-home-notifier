import { Client, DefaultMediaReceiver } from 'castv2-client';
import googletts from 'google-tts-api';
import mdns from 'mdns-js';

interface Options {
  device?: string;
  ip?: string;
  lang?: string;
}

export default class GoogleHomeNotifier {
  deviceName: string;
  deviceAddress: string;
  language: string;

  constructor(options?: Options) {
    const assignOps = Object.assign(
      {
        device: '',
        ip: '',
        lang: 'en',
      },
      options
    );
    this.deviceName = assignOps.device;
    this.deviceAddress = assignOps.ip;
    this.language = assignOps.lang;
  }

  device(name: string) {
    this.deviceName = name;
  }

  lang(lang: string) {
    this.language = lang;
  }

  ip(ip: string) {
    this.deviceAddress = ip;
  }

  create(timeout: number = 5000) {
    const browser = mdns.createBrowser(mdns.tcp('googlecast'));

    const timeoutProm = new Promise((_, reject) => {
      setTimeout(() => {
        return reject(new Error('timeout create browser'));
      }, timeout);
    });

    const browserProm = new Promise(resolve => {
      browser.on('ready', () => {
        browser.discover();
      });

      browser.on('update', service => {
        if (
          service.fullname != undefined &&
          service.fullname.indexOf(this.deviceName.replace(' ', '-')) !== -1
        ) {
          this.ip(service.addresses[0]);
          browser.stop();
          return resolve(
            `'Device "${service.fullname}" at ${service.addresses[0]}:${
              service.port
            }`
          );
        }
      });
    });

    return Promise.race([timeoutProm, browserProm]);
  }

  say(message: string) {
    if (!this.deviceAddress) {
      return Promise.reject(new Error('no deviceAddress'));
    }
    if (!message) {
      return Promise.reject(new Error('no message'));
    }
    return this.getSpeechUrl(message, this.deviceAddress);
  }

  play(mp3Url: string) {
    if (!this.deviceAddress) {
      return Promise.reject(new Error('no deviceAddress'));
    }
    if (!mp3Url) {
      return Promise.reject(new Error('no mp3 url'));
    }
    return this.getPlayUrl(mp3Url, this.deviceAddress);
  }

  getSpeechUrl(text: string, host: string) {
    return googletts(text, this.language, 1, 1000).then(url => {
      return this.onDeviceUp(host, url).catch(error => {
        throw error;
      });
    });
  }

  getPlayUrl(mp3Url: string, host: string) {
    return this.onDeviceUp(host, mp3Url);
  }

  onDeviceUp(host: string, url: string) {
    return new Promise((resolve, reject) => {
      const client = new Client();
      client.connect(
        host,
        () => {
          client.launch(DefaultMediaReceiver, (error: Error, player: any) => {
            if (error) {
              return reject(error);
            }
            const media = {
              contentId: url,
              contentType: 'audio/mp3',
              streamType: 'BUFFERED',
            };
            player.load(media, { autoplay: true }, (error: Error) => {
              if (error) {
                return reject(error);
              }
              client.close();
              resolve('Device notified');
            });
          });
        }
      );

      client.on('error', (error: Error) => {
        client.close();
        reject(error);
      });
    });
  }
}

module.exports = GoogleHomeNotifier;
