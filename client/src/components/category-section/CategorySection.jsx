import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MainSection from '../common/MainSection';
import { docTitleGen } from '../../utils/documents';

const DocumentLink = styled(Link)`
  color: #36a4f3;
  text-decoration: none;
`;

const CategorySection = ({ category }) => {
  const [relatedDocuments, setDocuments] = useState([]);

  useEffect(async () => {
    const fetched = await fetch(`/api/categories/${category}`);
    const { result } = await fetched.json();
    setDocuments(result);
  }, [category]);
  return (
    <MainSection title={`분류:${category}`}>
      {relatedDocuments?.map((document) => {
        const id = `${document.generation}_${document.boostcamp_id}_${document.name}`;
        return (
          <DocumentLink to={`/w/${id}`} key={id}>
            {docTitleGen({ ...document, boostcampId: document.boostcamp_id })}
          </DocumentLink>
        );
      })}
    </MainSection>
  );
};

export default CategorySection;
