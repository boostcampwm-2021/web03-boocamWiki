import { updateRecentDoc } from '../sql/documents-query';
import { DocumentsCreate } from '../types/apiInterface';
export function OnDocCreate(body: DocumentsCreate) {
  updateRecentDoc(body);
}
