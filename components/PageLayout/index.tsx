import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

export function PageLayout(props: Props) {
  return (
    <section>
      {props.children}
      <style jsx>
        {`
          section {
            padding: 12px 24px;
          }

          @media (max-width: 400px) {
            section {
              padding: 12px;
            }
          }
        `}
      </style>
    </section>
  );
}
