declare module 'castv2-client';

declare module 'google-tts-api' {
  type GoogleTTSApiPromise = Promise<string>;

  export default function(
    text: string,
    lang?: string,
    speed?: number,
    timeout?: number
  ): GoogleTTSApiPromise;
}

declare module 'mdns-js' {
  interface BrowserOptions {}

  interface Browser extends NodeJS.EventEmitter {
    discover(): any;
    stop(): any;
    on(event: string, listener: Function): this;
    on(event: 'update', listener: (info: Service) => void): this;
  }

  interface Service {
    addresses: Array<string>;
    flags: number;
    fullname: string;
    host: string;
    interfaceIndex: number;
    name?: string;
    rawTxtRecord?: Buffer;
    txtRecord?: any;
    networkInterface: string;
    port: number;
    replyDomain: string;
    type: ServiceType;
  }

  interface ServiceType {}

  function tcp(name: string): ServiceType;

  function createBrowser(
    serviceType: ServiceType,
    options?: BrowserOptions
  ): Browser;
}
