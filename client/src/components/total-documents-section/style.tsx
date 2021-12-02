import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DocumentLink = styled(Link)`
  color: #36a4f3;
  text-decoration: none;
`;
export const InnerTitle = styled.h1`
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: 400;
`;

export const TotalCount = styled.h2`
  font-size: 16px;
  margin-top: 8px;
  color: #222;
  font-weight: 300;
  text-align: right;
`;

export const Contents = styled.section`
  margin: 20px;
  hr {
    width: 100%;
    height: 1px;
    display: block;
    background-color: #bbb;
    border: none;
  }
`;

export const CategoryCho = styled.h2`
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: 400;
  margin-left: 6px;
`;

export const ListItem = styled.li`
  list-style-position: inside;
  margin: 5px 0px 5px 16px;
`;
