type ICardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties | undefined;
};

const Card = ({ children, className, style, ...rest }: ICardProps) => {
  return (
    <div className={`card bg-white ${className}`} {...rest} style={style}>
      {children}

      <style jsx>{`
        .card {
          background: #ffffff;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default Card;
