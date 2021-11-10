import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  return (
    <FooterContainer>
      <IndexDivContainer>
        {new Array(pageLength)
          .fill(0)
          .map((_, idx) => idx)
          .map((el, idx) => (
            <IndexDiv idx={idx} key={el}>
              <StyledLink to="/">{el + 1}</StyledLink>
            </IndexDiv>
          ))}
      </IndexDivContainer>
    </FooterContainer>
  );
};
export default ResultFooter;
