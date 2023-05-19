import { CSSProperties } from 'react';

interface IFloatingBall {
  type: string;
}

export const FloatingBalls = ({ type }: IFloatingBall) => {
  const style: CSSProperties = {
    position: 'absolute',
    background: ' #ffebea',
    width: ' 20rem',
    height: '20rem',
    borderRadius: ' 66% 34% 62% 38% / 42% 52% 48% 58%',
    animation: `floatingBall${type} 15s infinite alternate linear`,
    boxShadow: 'inset 1rem 1rem 4rem #f2786b7f',
    filter: 'blur(3rem)',
  };
  return <div style={style} />;
};
