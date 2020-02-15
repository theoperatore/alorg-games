import * as React from 'react';
import Router from 'next/router';

type Props = {
  to: string;
};

export function Redirect(props: Props) {
  const { to } = props;

  React.useEffect(() => {
    Router.push(to);
  }, [props, to]);

  return null;
}
