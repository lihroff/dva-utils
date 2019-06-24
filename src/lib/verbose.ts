/**
 *
 * Same as invariant but use console instead of Error.
 *
 * Use verbose() to report practical info which your program assumed.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The verbose will not use in production mode.
 */

var isprod = process.env.NODE_ENV === 'production';

export enum LogLevel {
  Log = 'log',
  Error = 'error',
  Warn = 'warn',
}

interface VerboseOption {
  format: string;
  prefix?: string;
  level?: LogLevel | string;
}

var verbose = function(condition: any, config: string | VerboseOption, a?, b?, c?, d?, e?, f?, g?) {
  let format, level, prefix;

  if (isprod) return;

  if (config === undefined) {
    throw new Error('verbose requires an error message argument');
  }
  if (typeof config === 'string') {
    format = config;
  } else {
    format = config.format;
    level = config.level;
    prefix = config.prefix;
  }

  if (condition) {
    // assert
    // eslint-disable-next-line no-unused-vars
    var [_1, _2, ...rest] = arguments;

    let index = 0,
      info;
    var formatted = format.replace(/%s/g, function() {
      return rest[index++];
    });
    info = prefix ? `${prefix} ${formatted}` : formatted;

    // minify consoloe scope
    switch (level) {
      case 'error':
      case 'warn':
      case 'log': {
        console[level](info);
        break;
      }
      default: {
        console.warn(info);
      }
    }
  }
};

export default verbose;
