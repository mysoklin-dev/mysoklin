import type { ReactNode } from 'react';

type IContainerProps = {
  children?: ReactNode;
  className?: string;
};

const Container = ({ children, className, ...rest }: IContainerProps) => {
  return (
    <div className={`mx-auto max-w-6xl ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Container;
