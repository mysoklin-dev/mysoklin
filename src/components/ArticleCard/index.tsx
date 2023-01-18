import Link from 'next/link';

interface ArticleCardProps {
  thumbnail: string;
  title: string;
  link: string;
  text: string;
}

const ArticleCard = ({
  thumbnail,
  title,
  link = '/article-detail',
  text,
}: ArticleCardProps) => {
  return (
    <div className="cardWrapper">
      <div className="thumbnail">
        <img
          src={thumbnail}
          alt={title}
          width="337"
          height="216"
          loading="lazy"
          style={{ height: 'auto' }}
        />
      </div>

      <div className="card-background pt-20 pb-10">
        <h4 className="mb-3">{title}</h4>

        <p className="mb-3">{text}</p>

        <Link href={link === '#' ? '/article-detail' : link}>
          <div className="button text-blue-400">Read</div>
        </Link>
      </div>

      <style jsx>{`
        .cardWrapper {
          text-align: center;
        }

        h4 {
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 150%;
        }

        .thumbnail {
          object-fit: cover !important;
          margin: 0 auto;
          position: relative;
          z-index: 0;
        }

        .thumbnail img {
          display: inline-block;
          width: 100%;
        }

        p {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 150%;
        }

        .card-background {
          background: #fff;
          border: 0.5px solid #aaaaaa;
          border-radius: 5px;
          padding: 40px 30px 30px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          text-align: center;
          width: 90%;
          transition: all 0.15s ease-in;
          transform: translateY(-40px);
        }

        .cardWrapper:hover .card-background {
          transform: scale(1.25) translateY(-10px);
          border-radius: 0;
        }

        .button {
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

export default ArticleCard;
