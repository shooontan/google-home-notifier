import GoogleHomeNotifier, { Options } from './GoogleHomeNotifier';

const notifier = (opts: Options) => {
  return new GoogleHomeNotifier(opts);
};

export default notifier;
export { GoogleHomeNotifier };

module.exports = notifier;
module.exports.GoogleHomeNotifier = GoogleHomeNotifier;
