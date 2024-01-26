import type { GetServerSideProps } from 'next';

function generateSiteMap(
  articles: any,
  brands: any,
  products: any,
  updates: any
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->
    <url>
      <loc>https://mysoklin.com/</loc>
      <lastmod>2024-01-26T01:50:54+00:00</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>https://mysoklin.com/register/</loc>
      <lastmod>2024-01-26T01:50:54+00:00</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>https://mysoklin.com/company-history/</loc>
      <lastmod>2024-01-26T01:50:54+00:00</lastmod>
      <priority>1.00</priority>
    </url>
    ${brands
      .map(({ slug }: { slug: String }) => {
        return `
      <url>
          <loc>${`${'https://mysoklin.com/products/brand'}/${slug}`}</loc>
          <lastmod>2024-01-26T01:50:54+00:00</lastmod>
          <priority>1.00</priority>
      </url>
    `;
      })
      .join('')}
    ${products
      .map(({ slug }: { slug: String }) => {
        return `
      <url>
          <loc>${`${'https://mysoklin.com/products'}/${slug}`}</loc>
          <lastmod>2024-01-26T01:50:54+00:00</lastmod>
          <priority>1.00</priority>
      </url>
    `;
      })
      .join('')}
    ${updates
      .map(({ slug }: { slug: String }) => {
        return `
      <url>
          <loc>${`${'https://mysoklin.com/updates'}/${slug}`}</loc>
          <lastmod>2024-01-26T01:50:54+00:00</lastmod>
          <priority>1.00</priority>
      </url>
    `;
      })
      .join('')}
    ${articles
      .map(({ slug }: { slug: String }) => {
        return `
      <url>
          <loc>${`${'https://mysoklin.com/articles'}/${slug}`}</loc>
          <lastmod>2024-01-26T01:50:54+00:00</lastmod>
          <priority>1.00</priority>
      </url>
    `;
      })
      .join('')}
    <url>
      <loc>https://mysoklin.com/contact/</loc>
      <lastmod>2024-01-26T01:50:54+00:00</lastmod>
      <priority>1.00</priority>
    </url>
    </urlset>`;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // getArticles
  const reqArticle = await fetch(
    'https://mysoklin-dashboard.efectifity.com/api/collections/articles/records?page=1&perPage=10000'
  );
  const articles = await reqArticle.json();
  // getUpdates
  const reqUpdate = await fetch(
    'https://mysoklin-dashboard.efectifity.com/api/collections/updates/records?page=1&perPage=10000'
  );
  const updates = await reqUpdate.json();

  // getBrands
  const reqBrand = await fetch(
    'https://mysoklin-dashboard.efectifity.com/api/collections/product_brands/records?page=1&perPage=100000'
  );
  const brand = await reqBrand.json();
  // getProducts
  const reqProduct = await fetch(
    'https://mysoklin-dashboard.efectifity.com/api/collections/products/records?page=1&perPage=10000'
  );
  const products = await reqProduct.json();

  const sitemap = generateSiteMap(
    articles?.items ?? [],
    brand?.items ?? [],
    products?.items ?? [],
    updates?.items ?? []
  );

  context.res.setHeader('Content-Type', 'text/xml');
  context.res.write(sitemap);
  context.res.end();

  return {
    props: {},
  };
};

export default SiteMap;
