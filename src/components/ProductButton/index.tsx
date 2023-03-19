import Link from 'next/link';

const ProductButton = (props: any) => {
  return (
    <Link
      href={`/products/brand/${props.data.title
        .replaceAll(' ', '-')
        .toLowerCase()}`}
    >
      <div className="product-opt flex items-center gap-4 px-5 md:px-10">
        <div className="w-3/12">
          <img
            src={props.logo}
            width="80"
            height="80"
            style={{ height: 'auto!important' }}
            loading="lazy"
            alt=""
          />
        </div>

        <div className="w-7/12 font-black text-blue-400 md:text-xl">
          {props.title}
        </div>

        <div className="w-2/12 text-right">
          <img
            src="/assets/images/chevron-right.svg"
            loading="lazy"
            alt=""
            className="inline-block"
          />
        </div>

        <style jsx>{`
          .product-opt {
            background: #ffffff;
            height: 80px;
            border: 0.5px solid #071789;
            border-radius: 20px;
            cursor: pointer;
          }
        `}</style>
      </div>
    </Link>
  );
};

export default ProductButton;
