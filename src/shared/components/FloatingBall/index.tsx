import { CSSProperties } from 'react';

interface IFloatingBall {
  type: string;
  ballSize: number;
}

export const FloatingBalls = ({ type, ballSize }: IFloatingBall) => {
  const style: CSSProperties = {
    position: 'absolute',
    background: ' #ffeaffea',
    width: `${ballSize}rem`,
    height: `${ballSize}rem`,
    borderRadius: ' 66% 34% 62% 38% / 42% 52% 48% 58%',
    animation: `floatingBall${type} 20s infinite alternate linear`,
    boxShadow: 'inset 1rem 1rem 4rem #f2866bb9',
    filter: 'blur(2rem)',
  };
  return <div style={style} />;
};
