import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import MainSection from '../common/MainSection';
import { docTitleGen } from '../../utils/documents';
import { ListItem, DocumentLink, InnerTitle, Contents, TotalCount, CategoryCho } from './style';
import Loading from '../common/Loading';
import ResultFooter from '../search-section/search-section-components/ResultFooter';

const TotalDocumentsSection = () => {
  const [totalDocuments, setDocuments] = useState({});
  const { search, pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const { offset } = queryString.parse(search);
  const step = 30;

  useEffect(async () => {
    const fetched = await fetch(`/api/documents/all?offset=${offset}`);
    const { result } = await fetched.json();
    setDocuments(result);
    setLoading(false);
  }, [search, pathname]);

  const createDocumentLink = (document) => {
    const id = `${document.generation}_${document.boostcamp_id}_${document.name}`;
    return (
      <ListItem key={id}>
        <DocumentLink to={`/w/${id}`} key={id}>
          {docTitleGen({ ...document, boostcampId: document.boostcamp_id })}
        </DocumentLink>
      </ListItem>
    );
  };

  return (
    <MainSection title="전체 문서">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Contents>
            <InnerTitle>부캠 위키에 있는 모든 문서</InnerTitle>
            <hr />
            <TotalCount>전체 {totalDocuments.count}개 문서</TotalCount>

            {Object.entries(totalDocuments.list).map(([cho, documents]) => {
              return (
                <article key={cho} style={{ marginBottom: '20px' }}>
                  <CategoryCho>{cho}</CategoryCho>
                  <hr />
                  <ul>{documents.map(createDocumentLink)}</ul>
                </article>
              );
            })}
            <ResultFooter resultCount={totalDocuments.count} step={step} currentPage={totalDocuments.offset} />
          </Contents>
        </>
      )}
    </MainSection>
  );
};

export default TotalDocumentsSection;
