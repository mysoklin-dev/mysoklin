import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  style?: React.CSSProperties | undefined;
  variant?: 'contained' | 'outlined' | 'elevated' | undefined;
  icon?: React.ReactNode;
  fullWidth?: boolean;
};

const Button = ({
  children,
  style,
  variant = 'contained',
  icon,
  fullWidth = false,
}: ButtonProps) => {
  return (
    <>
      <div
        className={`Button flex items-center justify-center gap-2 ${variant}`}
        style={style}
      >
        {icon && <div className="mr-auto">{icon}</div>}
        <div>{children}</div>
      </div>

      <style jsx>{`
        .Button {
          box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
          border-radius: 100px;
          line-height: 1;
          padding: 10px 25px;
          cursor: pointer;
          height: 40px;
          transition: all 0.2s;
          width: ${fullWidth ? '100%' : 'auto'};
        }

        .Button.elevated {
          background-color: #071789;
          box-shadow: 0px 5px 10px rgba(7, 23, 137, 0.5);
          color: #fff;
        }

        .Button:hover {
          opacity: 0.8;
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
