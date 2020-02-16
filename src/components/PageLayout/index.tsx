import * as React from 'react';
import styled from 'styled-components';

const Layout = styled.section`
  padding: 12px 24px;
  padding-bottom: 48px;

  @media (max-width: 400px) {
    padding: 12px;
    padding-bottom: 48px;
    margin-bottom: 48px;
  }
`;

type Props = {
  children: React.ReactNode;
};

export function PageLayout(props: Props) {
  return <Layout>{props.children}</Layout>;
}
