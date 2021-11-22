import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { flexBox } from '../../../styles/styled-components/mixin';

const Category = styled.div`
  border: 1px solid #bbb;
  border-radius: 10px;
  height: 30px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 0px 4px;
  ${flexBox({ alignItems: 'center' })}
`;

const Divider = styled.div`
  border-left: 1px solid #d7d7d7;
  width: 1px;
  height: 22px;
  margin: 0px 6px;
`;

const CategoryLink = styled(Link)`
  color: #36a4f3;
  text-decoration: none;
`;

const Flexed = styled.div`
  ${flexBox({})}
`;

export const WikiCategory = ({ categories }) => {
  return (
    <Category>
      {' '}
      분류{' '}
      {categories.map((item) => (
        <Flexed key={item}>
          <Divider />
          <CategoryLink to="#">{item}</CategoryLink>
        </Flexed>
      ))}
    </Category>
  );
};
