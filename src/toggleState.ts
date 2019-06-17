import verbose from './lib/verbose';

const NODE_ENV = process.env.NODE_ENV;

interface ObjectWithKey {
  key: 'string';
  ['props']: any;
}

/**
 * The common method which can be used to toggle set partial prop of state
 * @param {object} state
 * @param {object} action - { key: 'name' }
 * @return {object} new state
 *
 * @example
 *
 * //  in the effects
 * yield put({
 *   type: 'toggleState',
 *   key: 'visible',
 * });
 *
 */
export function toggleState(state: object, action: ObjectWithKey) {
  const { key } = action;
  if (key) {
    if (NODE_ENV !== 'production') {
      verbose(
        !state.hasOwnProperty(key),
        '调用 toggleState(state, action) 时action指定的 %s 属性在state中未定义,请确认!',
        key,
      );
    }
    return {
      ...state,
      [key]: !state[key],
    };
  }
  return state;
}
