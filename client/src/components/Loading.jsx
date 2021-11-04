import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 1120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <CircularProgress />
    </LoadingWrapper>
  );
};

export default Loading;
