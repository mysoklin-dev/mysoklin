import { withCdn } from '@/helpers';

interface ProductCardProps {
  thumbnail: string;
  title: string;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

const ProductCard = ({
  thumbnail = '/assets/images/wb-1.png',
  title,
  onClick = () => {},
  ...rest
}: ProductCardProps) => {
  const handleOnClick = (e: any) => {
    onClick(e);
  };
  return (
    <div
      className="cardWrapper cursor-pointer"
      {...rest}
      onClick={handleOnClick}
    >
      <div className="thumbnail">
        <img
          src={withCdn({
            w: 162,
            h: 196,
            q: 100,
            img: thumbnail,
          })}
          alt={title}
          width="162"
          height="196"
          loading="lazy"
          style={{ height: 'auto' }}
        />
      </div>

      <div className="card-background pb-10 pt-20">
        <p>{title}</p>

        <div className="productButton cursoir-pointer">See Products</div>
      </div>

      <style jsx>{`
        .cardWrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.2s;
          border: 5px solid transparent;
          padding-top: 20px;
        }

        .cardWrapper:hover {
          background: #eef3f6;
          border-color: #071789;
        }

        .cardWrapper:hover .card-background {
          border-color: transparent;
        }

        .thumbnail {
          width: 162px;
          height: 196px;
          margin: 0 auto -70px;
        }

        .card-background {
          border-top: 5px solid #071789;
          background: #eef3f6;
          text-align: center;
          border-radius: 0 0 20px 20px;
        }

        p {
          font-style: normal;
          font-weight: 700;
          font-size: 25px;
          color: #071789;
        }

        .productButton {
          font-style: normal;
          font-weight: 600;
          font-size: 11px;
          line-height: 16px;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          width: 100px;
          height: 35px;
          margin: 0 auto;
          border: 2px solid #071789;
          margin-top: 20px;
          border-radius: 90px;
          color: #071789 !important;
        }

        .productButton:hover {
          color: #071789 !important;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
