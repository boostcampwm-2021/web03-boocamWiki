import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 15px;
`;

const IndexDivContainer = styled.div`
  border: 1px solid #bbbbbb;
  border-radius: 10px;
  overflow: hidden;
`;

const IndexDiv = styled.div`
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 36px;
  font-size: 18px;
  color: #0055fb;
  cursor: pointer;

  :not(:first-of-type) {
    border-left: 1px solid #bbbbbb;
  }
  :hover {
    background-color: #f6f6f6;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #0055fb;
  font-style: normal;
  font-weight: normal;
  text-decoration: none;
  outline: none;

  :hover,
  :active {
    text-decoration: none;
  }
`;

const ResultFooter = ({ resultCount }) => {
  const { pathname, search } = useLocation();
  const query = queryString.parse(search);
  const MAX_PAGE_LENGTH = 5;
  const maxPage = Math.ceil(resultCount / 8);
  query.offset = Number(query.offset) ?? 1;

  return (
    <FooterContainer>
      <IndexDivContainer>
        <IndexDiv>
          <StyledLink
            to={`${pathname}?${Object.entries(query)
              .map(([key, val]) =>
                key !== 'offset'
                  ? `${key}=${val}`
                  : `offset=${query.offset - MAX_PAGE_LENGTH >= 1 ? query.offset - MAX_PAGE_LENGTH : 1}`,
              )
              .join('&')}`}
          >
            {'<'}
          </StyledLink>
        </IndexDiv>
        {new Array(MAX_PAGE_LENGTH).fill(0).map((_, idx) => {
          let currentIdx;
          if (query.offset > Math.ceil(MAX_PAGE_LENGTH / 2)) {
            currentIdx = query.offset + 2 > maxPage ? maxPage - 4 + idx : query.offset + idx - 2;
          } else {
            currentIdx = idx + 1;
          }
          return currentIdx >= 1 && currentIdx <= maxPage ? (
            <IndexDiv key={currentIdx}>
              <StyledLink
                to={`${pathname}?${Object.entries(query)
                  .map(([key, val]) => (key !== 'offset' ? `${key}=${val}` : `offset=${currentIdx}`))
                  .join('&')}`}
              >
                {currentIdx}
              </StyledLink>
            </IndexDiv>
          ) : (
            <></>
          );
        })}
        <IndexDiv>
          (
          <StyledLink
            to={`${pathname}?${Object.entries(query)
              .map(([key, val]) =>
                key !== 'offset'
                  ? `${key}=${val}`
                  : `offset=${query.offset + MAX_PAGE_LENGTH <= maxPage ? query.offset + MAX_PAGE_LENGTH : maxPage}`,
              )
              .join('&')}`}
          >
            {'>'}
          </StyledLink>
          )
        </IndexDiv>
      </IndexDivContainer>
    </FooterContainer>
  );
};
export default ResultFooter;
