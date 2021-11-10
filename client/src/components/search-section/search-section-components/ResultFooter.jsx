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
`;

const IndexDiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 36px;
  color: #0055fb;
  ${(props) => (props.idx !== 0 ? 'border-left: 1px solid #bbbbbb;' : '')}
`;

const StyledLink = styled(Link)`
  color: #0055fb;
  font-size: 18px;
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
  const pageLength = Math.ceil(resultCount / 8);
  const { pathname, search } = useLocation();
  const query = queryString.parse(search);
  query.offset = query.offset ?? 1;

  return (
    <FooterContainer>
      <IndexDivContainer>
        {new Array(pageLength)
          .fill(0)
          .map((_, idx) => idx)
          .map((el, idx) => (
            <IndexDiv idx={idx} key={el}>
              <StyledLink
                to={`${pathname}?${Object.entries(query)
                  .map(([key, val]) => (key !== 'offset' ? `${key}=${val}` : `offset=${el + 1}`))
                  .join('&')}`}
              >
                {el + 1}
              </StyledLink>
            </IndexDiv>
          ))}
      </IndexDivContainer>
    </FooterContainer>
  );
};
export default ResultFooter;
