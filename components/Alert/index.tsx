import * as React from 'react';

type Props = {
  show?: boolean;
  variant: 'danger' | 'success';
  children: React.ReactNode;
};

export function Alert(props: Props) {
  const { show, variant, children } = props;
  return (
    <>
      <div className={`alert-container ${show ? 'shadow-lg' : ''} rounded`}>
        <div className={`alert alert-${variant} mb-0`}>{children}</div>
      </div>
      <style jsx>{`
        .alert-container {
          z-index: 2;
          position: fixed;
          top: 0;
          left: 12px;
          right: 12px;
          transform: translateY(${show ? '12px' : '-100%'});
          transition: transform 300ms ease;
          opacity: ${show ? 1 : 0};
        }
      `}</style>
    </>
  );
}
