import { isObject, isPrimitive, isPlainObject } from './type';
import { has } from './utils';

export function deepMergeWithKey(fn: (k: string, l: object, r: object) => any) {
  // eslint-disable-next-line no-unused-vars
  return function deepMerge(
    p1: object,
    p2: object,
    p3?: object,
    p4?: object,
    p5?: object,
    p6?: object,
    p7?: object,
  ) {
    const merge = function(l: object, r: object): object {
      const result = {};
      let k;

      for (k in l) {
        if (has(k, l)) {
          if (!has(k, r)) {
            result[k] = l[k];
          } else if (isPrimitive(l[k])) {
            result[k] = r[k];
          } else if (isObject(r[k]) && isObject(l[k])) {
            if (isPlainObject(r[k]) && isPlainObject(l[k])) {
              result[k] = deepMerge(l[k], r[k]);
            } else {
              result[k] = r[k];
            }
          } else {
            result[k] = fn(k, l[k], r[k]);
          }
        }
      }

      for (k in r) {
        if (has(k, r) && !has(k, result)) {
          result[k] = r[k];
        }
      }

      return result;
    };

    const [init, ...rest] = arguments;

    return rest.reduce((i, j) => merge(i, j), { ...init });
  };
}
