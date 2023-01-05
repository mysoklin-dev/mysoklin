import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  style?: React.CSSProperties | undefined;
  variant?:
    | 'contained'
    | 'outlined'
    | 'elevated'
    | 'contained-blue'
    | undefined;
  icon?: React.ReactNode;
  appendIcon?: React.ReactNode;
  fullWidth?: boolean;
  square?: boolean;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
};

const Button = ({
  children,
  style,
  variant = 'contained',
  icon,
  appendIcon,
  fullWidth = false,
  square = false,
  onClick = () => {},
}: ButtonProps) => {
  const handleOnClick = (e: any) => {
    onClick(e);
  };

  return (
    <>
      <div
        className={`Button flex items-center gap-2 ${variant} ${
          icon ? 'justify-start' : 'justify-center'
        } ${square ? 'square' : ''}`}
        style={style}
        onClick={handleOnClick}
      >
        {icon && <div>{icon}</div>}
        <div>{children}</div>
        {appendIcon && <div className="ml-auto">{appendIcon}</div>}
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

        .Button.square {
          border-radius: 10px !important;
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

        .Button.contained-blue {
          background: #071789;
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
