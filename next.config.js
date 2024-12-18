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
        source:
          '/articles/cara-menghilangkan-noda-minyak-di-baju-yang-wajib-diketahui/',
        destination:
          '/articles/7-cara-menghilangkan-noda-minyak-di-baju-yang-wajib-diketahui/',
        permanent: true,
      },
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
      {
        source: '/articles/penyebab-dan-cara-mengatasi-alergi-sabun-cuci-baju/',
        destination: 'articles/penyebab-dan-cara-mengatasi-alergi-deterjen/',
        permanent: true,
      },
      {
        source:
          '/articles/tips-baju-bebas-jamur-dan-bau-apek-dengan-rapika-biang/',
        destination:
          'articles/cara-menghilangkan-bau-apek-dan-bebas-jamur-pada-baju/',
        permanent: true,
      },
      {
        source:
          '/articles/jangan-panik-ini-dia-cara-menghilangkan-noda-luntur-pada-pakaian/',
        destination:
          'articles/jangan-panik-ini-dia-cara-menghilangkan-luntur-pada-baju-berwarna/',
        permanent: true,
      },
      {
        source:
          '/articles/moms-ini-cara-memutihkan-seragam-putih-yang-sudah-kuning/',
        destination: 'articles/cara-memutihkan-seragam-putih/',
        permanent: true,
      },
      {
        source:
          '/articles/7-cara-menghilangkan-noda-tinta-yang-sudah-kering-di-baju/',
        destination: 'articles/7-cara-menghilangkan-noda-tinta-di-baju/',
        permanent: true,
      },
      {
        source:
          '/articles/apakah-rapika-3-in-1-harus-dicampur-air-ini-penjelasannya/',
        destination: 'articles/cara-pakai-rapika-3-in-1/',
        permanent: true,
      },
      {
        source:
          '/articles/cari-cairan-pembersih-lantai-yang-wangi-tahan-lama-cek-soklin-lantai-apple-and-peony-ya/',
        destination:
          'articles/cairan-pembersih-lantai-yang-wangi-tahan-lama-soklin-lantai-apple-peony/',
        permanent: true,
      },
      {
        source:
          '/articles/moms-ini-cara-menghilangkan-noda-membandel-di-baju-berwarna/',
        destination:
          'articles/cara-menghilangkan-cat-minyak-yang-sudah-kering/',
        permanent: true,
      },
      {
        source:
          '/articles/gini-lho-cara-menghilangkan-noda-kuning-di-baju-putih-bagian-ketiak/',
        destination:
          'articles/cara-menghilangkan-noda-kuning-di-baju-putih-bagian-ketiak/',
        permanent: true,
      },
      {
        source:
          '/articles/pahami-komposisi-deterjen-cair-agar-tak-salah-pilih/',
        destination: 'articles/komposisi-deterjen-cair',
        permanent: true,
      },
    ];
  },
});
