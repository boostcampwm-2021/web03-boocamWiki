import { DocumentsCreate, DocumentsUpdate, keyofDocumentsCreate, keyofDocumentsUpdate } from '../types/apiInterface';

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

export function getDocumentsCreateKV(param: DocumentsCreate): object {
  const result = {};
  Object.entries(keyofDocumentsCreate).forEach(([key]) => (result[key] = param[key]));
  return result;
}

export function getDocumentsUpdateKV(param: DocumentsUpdate): object {
  const result = {};
  Object.entries(keyofDocumentsUpdate).forEach(([key]) => (result[key] = param[key]));
  return result;
}
