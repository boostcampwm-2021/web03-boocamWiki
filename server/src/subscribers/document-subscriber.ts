import { increaseViewCount, updateRecentDoc } from '../sql/documents-query';
import { DocumentsCreate, DocumentsSearch } from '../types/apiInterface';
export function OnDocCreate(body: DocumentsCreate) {
  updateRecentDoc(body);
}

export async function OnDocViewed(body: DocumentsSearch) {
  increaseViewCount(body);
}
