import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MainSection from '../common/MainSection';
import { docTitleGen } from '../../utils/documents';

const DocumentLink = styled(Link)`
  color: #36a4f3;
  text-decoration: none;
`;

const InnerTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Contents = styled.section`
  margin: 20px;
`;

const CategoryCho = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const CategorySection = ({ category }) => {
  const [relatedDocuments, setDocuments] = useState([]);

  useEffect(async () => {
    const fetched = await fetch(`/api/categories/${category}`);
    const { result } = await fetched.json();
    setDocuments(result);
  }, [category]);

  const createDocumentLink = (document) => {
    const id = `${document.generation}_${document.boostcamp_id}_${document.name}`;
    return (
      <DocumentLink to={`/w/${id}`} key={id}>
        {docTitleGen({ ...document, boostcampId: document.boostcamp_id })}
      </DocumentLink>
    );
  };

  return (
    <MainSection title={`분류:${category}`}>
      <Contents>
        <InnerTitle>{`"${category}"`}에 속하는 문서</InnerTitle>
        {Object.entries(relatedDocuments).map(([cho, documents]) => {
          return (
            <article key={cho}>
              <CategoryCho>{cho}</CategoryCho>
              {documents.map(createDocumentLink)}
            </article>
          );
        })}
      </Contents>
    </MainSection>
  );
};

export default CategorySection;
