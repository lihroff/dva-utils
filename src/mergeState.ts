import verbose from './lib/verbose';
import { omit, getNewInProps, PowerPartial } from './lib/utils';

const NODE_ENV = process.env.NODE_ENV;

/**
 * The common method which can be used to merge partial prop of state
 * @param {object} state
 * @param {object} partials
 * @return {object} new state
 *
 * @example
 *
 * //  in the effects
 * yield put({
 *   type: 'mergeState',
 *   data,
 * });
 *
 */
export function mergeState<T>(state: T, partials: PowerPartial<T>) {
  const [org, ...rest] = arguments;
  let newState = { ...org };
  for (let i in rest) {
    // redux specifc
    const cur = omit(['type'], rest[i]);
    if (NODE_ENV !== 'production') {
      const diff = getNewInProps(newState, cur);
      verbose(diff.length > 0, '调用 mergeState() 时存在未定义属性:[ %s ]请确认!', diff);
    }
    newState = {
      ...newState,
      ...cur,
    };
  }
  return newState;
}
