export const isPrimitive = (val: any): boolean => {
  if (val == null) return true;
  switch (typeof val) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'symbol':
      return true;
    default:
      return false;
  }
};

export function isObject(x: any): boolean {
  return Object.prototype.toString.call(x) === '[object Object]';
}

export function isArray(x: any): boolean {
  try {
    return Array.isArray(x);
  } catch {
    return x != null && x.length >= 0 && Object.prototype.toString.call(x) === '[object Array]';
  }
}

export function isFunction(x: any): boolean {
  var type = Object.prototype.toString.call(x);
  return (
    type === '[object Function]' ||
    type === '[object AsyncFunction]' ||
    type === '[object GeneratorFunction]' ||
    type === '[object AsyncGeneratorFunction]'
  );
}
