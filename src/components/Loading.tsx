import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { AiOutlineLoading } from 'react-icons/ai';

const rotateKeyframe = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIndicator = styled(AiOutlineLoading)`
  font-size: 2rem;
  animation: ${rotateKeyframe} 0.5s infinite linear;
`;

const LoadingBlock = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    color: white;
  }
`;

type LoadingProps = {
  visible: boolean;
};

const Loading = ({ visible }: LoadingProps) => {
  return (
    <LoadingBlock visible={visible}>
      <div>
        <LoadingIndicator />
        로딩 중...
      </div>
    </LoadingBlock>
  );
};

export default Loading;
