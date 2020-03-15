import * as React from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';

const Container = styled(animated.button)`
  appearance: none;
  outline: 0;
  border: 0;
  position: fixed;
  bottom: 48px;
  right: 16px;

  height: 64px;
  width: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;

  font-size: 2em;
  color: white;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
`;

export function ScrollTopButton() {
  const [, setY] = useSpring(() => ({
    y: 0,
    onFrame: (props: any) => window.scroll(0, props.y),
  }));
  const [props, set] = useSpring(() => ({
    transform: 'scale(0) rotate(180deg)',
    config: config.stiff,
  }));

  React.useEffect(() => {
    function handleScroll() {
      const isScrolled = window.scrollY >= 100;
      set({
        transform: isScrolled
          ? 'scale(1) rotate(0deg)'
          : 'scale(0) rotate(180deg)',
      });
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [set]);

  function handleScrollTop() {
    setY({
      y: 0,
      reset: true,
      from: { y: window.scrollY },
    });
  }

  return (
    <Container style={props} onClick={handleScrollTop}>
      &uarr;
    </Container>
  );
}
