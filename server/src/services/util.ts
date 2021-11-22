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

export function getObjectValue(arg: object): string[] {
  return Object.entries(arg)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([, value]) => `\'${value}\'`);
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

export function getDocumentKeyValue(arg: Document, stringTypeList: String[], append: String = undefined): String[] {
  return Object.entries(arg)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      let _key = key;
      if (append || append.length > 0) {
        _key = `${append}${key}`;
      }
      return `${_key}=${!stringTypeList.includes(key) ? `'${value}'` : value}`;
    });
}
