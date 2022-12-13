import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  style?: React.CSSProperties | undefined;
  variant: 'contained' | 'outlined' | undefined;
}

const Button: any = ({
  children,
  style,
  variant = 'contained',
}: ButtonProps) => {
  return (
    <>
      <button className={`Button ${variant}`} style={style}>
        {children}
      </button>

      <style jsx>{`
        .Button {
          box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
          border-radius: 100px;
          line-height: 1;
          padding: 10px 15px;
          display: inline-block;
          cursor: pointer;
          height: 40px;
        }

        .Button.contained {
          background: #fb4c06;
          color: #fff;
        }

        .Button.outlined {
          background: #fff;
          color: #071789;
          border: 2px solid #071789;
          box-shadow: none;
        }
      `}</style>
    </>
  );
};

export default Button;
