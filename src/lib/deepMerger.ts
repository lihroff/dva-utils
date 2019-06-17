import { isObject, isPrimitive } from './type';

export function deepMergeWithKey(key?: (o: any) => object) {
  return function deepMerge(x: object, y: object) {
    const newObj = {};

    const merge = function(obj) {
      for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) return;

        if (isPrimitive(newObj[prop]) && isPrimitive(obj[prop])) {
          newObj[prop] = obj[prop];
        } else if (isObject(newObj[prop]) && isObject(obj[prop])) {
          newObj[prop] = deepMerge(newObj[prop], obj[prop]);
        } else {
          newObj[prop] = key ? key(obj[prop]) : obj[prop];
        }
      }
    };

    for (const i in arguments) {
      merge(arguments[i]);
    }

    return newObj;
  };
}
