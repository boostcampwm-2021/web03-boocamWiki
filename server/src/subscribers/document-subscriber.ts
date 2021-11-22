import { increaseViewCount, updateRecentDoc } from '../sql/documents-query';
import { DocumentsCreate, DocumentsSearch, DocumentsUpdate } from '../types/apiInterface';
export function OnDocCreate(body: DocumentsCreate) {
  updateRecentDoc(body as DocumentsUpdate);
}

export async function OnDocViewed(body: DocumentsSearch) {
  increaseViewCount(body);
}
