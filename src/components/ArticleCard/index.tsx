import Link from 'next/link';

import { withCdn } from '@/helpers';

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
        <Link
          href={link === '#' ? '/article-detail' : link}
          style={{ color: '#000' }}
        >
          <img
            src={withCdn({
              img: thumbnail,
              w: 357,
              h: 357,
              q: 100,
            })}
            alt={title}
            width="337"
            height="216"
            loading="lazy"
          />
        </Link>
      </div>

      <div className="card-background pb-10 pt-20">
        <Link
          href={link === '#' ? '/article-detail' : link}
          style={{ color: '#000' }}
        >
          <p
            className="heading mb-3"
            title={title}
            dangerouslySetInnerHTML={{ __html: title }}
          ></p>
        </Link>

        <div
          className="excerpt mb-3"
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>

        <Link href={link === '#' ? '/article-detail' : link}>
          <div className="button text-blue-400">Read</div>
        </Link>
      </div>

      <style jsx>{`
        .cardWrapper {
          text-align: center;
        }

        p.heading {
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 150%;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
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
          height: 240px;
          object-fit: cover;
          object-position: center;
        }

        .excerpt {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 150%;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
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
