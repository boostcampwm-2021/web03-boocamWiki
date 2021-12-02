import {
  Document,
  DocumentsCreate,
  DocumentsUpdate,
  keyofDocumentsCreate,
  keyofDocumentsUpdate,
} from '../types/apiInterface';

export function getObjectKey(arg: object): string[] {
  return Object.entries(arg)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key]) => key);
}

export function getObjectValue(arg: object, stringTypeList: String[]): string[] {
  return Object.entries(arg)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([, value]) => (!stringTypeList.includes(value) ? `\'${value}\'` : value));
}

export function getDocumentsCreateObj(param: DocumentsCreate): object {
  const result = {};
  Object.entries(keyofDocumentsCreate).forEach(([key]) => (result[key] = param[key]));
  return result;
}

export function getDocumentsUpdateObj(param: DocumentsUpdate): object {
  const result = {};
  Object.entries(keyofDocumentsUpdate).forEach(([key]) => (result[key] = param[key]));
  return result;
}

export function getDocumentKeyValue(arg: object, stringTypeList: String[], append: String = undefined): String[] {
  return Object.entries(arg)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      let _key = key;
      if (append && append.length > 0) {
        _key = `${append}${key}`;
      }
      return `${_key}=${!stringTypeList.includes(key) ? `'${value}'` : value}`;
    });
}

export function getSignedInt(str: string, baseNumber: number = 1): number {
  let result = 1;
  try {
    result = parseInt(str);
    if (isNaN(result) || result < baseNumber) result = baseNumber;
  } catch {}
  return result;
}

export function intToIp(ip) {
  return [24, 16, 8, 0].map((n) => (ip >> n) & 0xff).join('.');
}

export function ipToInt(ip) {
  return ip.split('.').reduce((sum, x, i) => sum + (x << (8 * (3 - i))), 0) >>> 0;
}
