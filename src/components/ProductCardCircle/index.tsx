import Link from 'next/link';

import { withCdn } from '@/helpers';

type IProductCardCircleProps = {
  id?: string;
  img: string;
  title: string;
  slug?: string;
};

const ProductCardCircle = ({ img, title, slug }: IProductCardCircleProps) => {
  return (
    <div className="text-center">
      <Link
        href={`/products/${slug}`}
      >
        <div className="thumb mb-10">
          <div className="radial"></div>
          <img
            src={withCdn({ img, w: 130, h: 200, q: 100 })}
            style={{ width: 'auto', height: 200 }}
            width="130"
            height="200"
            alt=""
          />
        </div>
      </Link>

      <div className="text-xl font-bold text-blue-400">
        <Link
          href={`/products/${slug}`}
        >
          <span className="text-blue-400">{title}</span>
        </Link>
      </div>

      <style jsx>{`
        .thumb {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .thumb {
          display: inline-block;
        }
        .radial {
          position: absolute;
          width: 192px;
          height: 192px;
          background: radial-gradient(
            50% 50% at 50% 50%,
            #00a0ff 0%,
            #31b2ff 44.79%,
            #bce6ff 100%
          );
          top: 32px;
          left: 50%;
          transform: translateX(-50%);
          right: 0;
          margin: 0 auto;
          border-radius: 192px;
          z-index: -1;
        }
      `}</style>
    </div>
  );
};

export default ProductCardCircle;
