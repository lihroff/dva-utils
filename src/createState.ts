/**
 * The common method which can be used to toggle set partial prop of state
 * @param {object} initState
 * @return {function} Calling this method will return initState
 *
 * @example
 *
 * const initState = createState({
 *    data: {},
 *    isFetching: false,
 *    isFailed: false,
 * })
 *
 * // ... in the model ...
 * {
 *    state: initState(),
 *    reducers: {
 *       initState,
 *       // ...
 *    }
 *    // ...
 * }
 *
 */
export function createState(initState: object): () => object {
  return () => initState;
}
