import Link from 'next/link';

const ProductButton = (props: any) => {
  return (
    <Link href="/product-detail">
      <div className="product-opt flex items-center gap-4 px-10">
        <div>
          <img
            src={props.logo}
            width="80"
            height="80"
            style={{ height: 'auto!important' }}
            loading="lazy"
            alt=""
          />
        </div>

        <div className="ml-10 text-xl font-black text-blue-400">
          {props.title}
        </div>

        <div className="ml-auto">
          <img src="/assets/images/chevron-right.svg" loading="lazy" alt="" />
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
