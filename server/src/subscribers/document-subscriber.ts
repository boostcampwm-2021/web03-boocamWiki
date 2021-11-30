import { updateClassification } from '../sql/classification-query';
import { increaseViewCount, updateRecentDoc } from '../sql/documents-query';
import { DocumentsClassification, DocumentsCreate, Document, DocumentsUpdate } from '../types/apiInterface';
export function OnDocCreate(body: DocumentsCreate) {
  updateRecentDoc(body as DocumentsUpdate);
  updateClassification(body as DocumentsClassification);
}

export async function OnDocViewed({ boostcamp_id, generation, name }: Partial<Document>) {
  increaseViewCount({ boostcamp_id, generation, name });
}
