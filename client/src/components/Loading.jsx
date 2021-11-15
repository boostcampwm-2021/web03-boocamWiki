import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const Loading = () => {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;
