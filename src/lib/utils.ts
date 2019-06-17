/**
 *  Returns a partial copy of an object omitting the keys specified.
 *
 * @param {Array} props an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object}
 */
export const omit = (props: string[], obj: object) => {
  const result = {};
  const index = {};
  let idx = 0;
  const len = props.length;

  while (idx < len) {
    index[props[idx]] = 1;
    idx += 1;
  }

  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }
  return result;
};

/**
 *  Returns an array which each value is the prop name of Newly defined.
 *
 * @param {Object} tar The target object
 * @param {Object} sour the source object
 * @return {Array}
 */
export const getNewInProps = (tar: object, sour: object): Array<string> => {
  const array = [Object.keys(sour), Object.keys(tar)];
  return array.reduce((a, b) => a.filter(value => !b.includes(value)));
};
