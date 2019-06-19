import { deepMergeWithKey } from './lib/deepMerger';
import { omit } from './lib/utils';

/**
 * The common method which can be used to deeply merge partial prop of state
 *
 * @param {object} state
 * @param {object} partials
 * @return {object} new state
 *
 */
export function deepMergeState(state: object, partials: object) {
  const that = this;
  const deepMerge = deepMergeWithKey((k, l, r) => r);
  const argus = [];
  for (const i in arguments) {
    // redux-saga specifc
    argus.push(i ? omit(['type'], arguments[i]) : arguments[i]);
  }

  return deepMerge.apply(that, argus);
}
