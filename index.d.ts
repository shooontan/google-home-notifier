interface NotifierOptions {
  device?: string;
  ip?: string;
  lang?: string;
}

type CreatePromise = Promise<string>;
type SayPromise = Promise<string>;
type PlayPromise = Promise<string>;

declare class GoogleHomeNotifier {
  constructor(ops?: NotifierOptions);

  device(name: string): void;
  lang(lang: string): void;
  ip(ip: string): void;

  create(timeout?: number): CreatePromise;
  say(message: string): SayPromise;
  play(url: string): PlayPromise;
}

export default GoogleHomeNotifier;
