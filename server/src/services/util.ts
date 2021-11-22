import { Document } from '../types/apiInterface';

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

export function getDocumentKeyValue(arg: Document, stringTypeList: String[]): String[] {
  return Object.entries(arg)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${!stringTypeList.includes(key) ? `'${value}'` : value}`);
}
