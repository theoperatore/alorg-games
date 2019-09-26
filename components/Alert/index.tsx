import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ show?: boolean }>`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 12px;
  right: 12px;
  transform: translateY(${props => (props.show ? '12px' : '-100%')});
  transition: all 300ms ease;
  opacity: ${props => (props.show ? 1 : 0)};
`;

type Props = {
  show?: boolean;
  variant: 'danger' | 'success';
  children: React.ReactNode;
};

export function Alert(props: Props) {
  const { show, variant, children } = props;
  return (
    <Container show={show} className="rounded">
      <div className={`alert alert-${variant} mb-0`}>{children}</div>
    </Container>
  );
}
