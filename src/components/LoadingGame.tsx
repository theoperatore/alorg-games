import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    background-color: rgba(51, 51, 51, 0.15);
  }
  50% {
    background-color: rgba(51, 51, 51, 0.25);
  }
  100% {
    background-color: rgba(51, 51, 51, 0.15);
  }
`;

export const LoadingGame = styled.div`
  position: relative;
  height: 450px;
  width: 100%;
  border-radius: 12px;
  color: #fff;

  padding: 12px;
  display: flex;
  align-items: flex-end;
  background-color: rgba(51, 51, 51, 0.15);
  animation: ${pulse} 1.5s ease-in-out infinite;
`;
