import { updateClassification } from '../sql/classification-query';
import { increaseViewCount, updateRecentDoc } from '../sql/documents-query';
import { DocumentsClassification, DocumentsCreate, DocumentsSearch, DocumentsUpdate } from '../types/apiInterface';
export function OnDocCreate(body: DocumentsCreate) {
  updateRecentDoc(body as DocumentsUpdate);
  updateClassification(body as DocumentsClassification);
}

export async function OnDocViewed(body: DocumentsSearch) {
  increaseViewCount(body);
}
