/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: ['mysoklin.com', 'maindbase.us'],
  },
  async redirects() {
    return [
      {
        source: '/articles/cara-mencuci-pakaian-yang-benar-tanpa-mesin-cuci/',
        destination: '/articles/cara-mencuci-baju-yang-benar-tanpa-mesin-cuci/',
        permanent: true,
      },
      {
        source: '/articles/mudah-ini-cara-menghilangkan-bekas-cat-di-baju/',
        destination: '/articles/mudah-ini-cara-menghilangkan-noda-cat-di-baju/',
        permanent: true,
      },
      {
        source:
          '/articles/7-cara-menghilangkan-noda-kuning-di-baju-putih-secara-efektif/',
        destination:
          '/articles/10-cara-alami-menghilangkan-noda-kuning-di-baju-putih-secara-efektif/',
        permanent: true,
      },
      {
        source:
          '/articles/tips-mencuci-baju-di-mesin-cuci-agar-bersih-ini-perbedaannya-untuk-mesin-1-dan-2-tabung/',
        destination:
          '/articles/perbedaannya-mesin-cuci-1-tabung-dan-2-tabung-cara-mencuci-nya/',
        permanent: true,
      },
      {
        source:
          '/articles/cara-membuat-tampilan-stylish-dengan-rapika-lavender/',
        destination:
          'articles/manfaat-soklin-rapika-untuk-menjadikan-moms-lebih-menawan/',
        permanent: true,
      },
    ];
  },
});
