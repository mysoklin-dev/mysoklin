import Link from 'next/link';

interface ProductCardProps {
  thumbnail: string;
  title: string;
  link: string;
}

const ProductCard = ({
  thumbnail = '/assets/images/wb-1.png',
  title,
  link,
}: ProductCardProps) => {
  return (
    <div className="cardWrapper">
      <div className="thumbnail">
        <img
          src={thumbnail}
          alt={title}
          width="162"
          height="196"
          loading="lazy"
          style={{ height: 'auto' }}
        />
      </div>

      <div className="card-background pt-20 pb-10">
        <h4>{title}</h4>

        <Link href={link}>
          <div className="productButton">See Products</div>
        </Link>
      </div>

      <style jsx>{`
        .cardWrapper {
          position: relative;
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

        h4 {
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
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
