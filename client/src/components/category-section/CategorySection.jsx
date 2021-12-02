import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { docTitleGen } from '@utils/documents';
import { WikiCategory } from '../wiki-section/wiki-section-components/WikiCategory';
import { ListItem, DocumentLink, InnerTitle, Contents, TotalCount, CategoryCho } from './style';
import MainSection from '../common/MainSection';
import Loading from '../common/Loading';
import ResultFooter from '../search-section/search-section-components/ResultFooter';

const CategorySection = ({ category }) => {
  const [relatedDocuments, setDocuments] = useState({});
  const { search, pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const { offset } = queryString.parse(search);
  const step = 30;

  useEffect(async () => {
    const fetched = await fetch(`/api/categories/${category}?offset=${offset}`);
    const { result } = await fetched.json();
    setDocuments(result);
    setLoading(false);
  }, [category]);

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
    <MainSection title={`분류:${category}`}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <WikiCategory categories={relatedDocuments.classifications} />
          <Contents>
            <InnerTitle>{`"${category}"`}에 속하는 문서</InnerTitle>
            <hr />
            <TotalCount>전체 {relatedDocuments.count}개 문서</TotalCount>

            {Object.entries(relatedDocuments.list).map(([cho, documents]) => {
              return (
                <article key={cho} style={{ marginBottom: '20px' }}>
                  <CategoryCho>{cho}</CategoryCho>
                  <hr />
                  <ul>{documents.map(createDocumentLink)}</ul>
                </article>
              );
            })}
            <ResultFooter resultCount={relatedDocuments.count} step={step} currentPage={relatedDocuments.offset} />
          </Contents>
        </>
      )}
    </MainSection>
  );
};

export default CategorySection;
