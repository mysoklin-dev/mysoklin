import Link from 'next/link';

import usePocketBaseAuth from '@/hooks/usePocketBaseAuth';

const DashboardMenu = () => {
  const [admin]: any = usePocketBaseAuth();
  const baseUrl = '/admin';
  const adminMenus = [
    {
      title: 'Overview',
      slug: '/',
    },
    {
      title: 'Products',
      slug: '/products',
      children: [
        {
          title: 'Items',
          slug: '/items',
        },
        {
          title: 'Brands',
          slug: '/brands',
        },
        {
          title: 'Categories',
          slug: '/categories',
        },
      ],
    },
    {
      title: 'Articles',
      slug: '/articles/items',
    },
    {
      title: 'Updates',
      slug: '/updates/items',
    },
  ];

  return (
    <div className="h-full py-6">
      <div className="px-6">
        <h1 className="text-2xl">Dashboard</h1>
      </div>

      <nav className="mt-4">
        <ul className="text-md">
          {admin !== null ? (
            <>
              {adminMenus.map((item: any) => (
                <li key={`admin-menu-${item.slug}`}>
                  <Link
                    className="block py-2 px-6 text-black hover:bg-sky-600 hover:text-white"
                    href={`${baseUrl}${item.slug}`}
                    style={{ fontSize: 16 }}
                  >
                    {item.title}
                  </Link>

                  <ul className="pl-10">
                    {item.children &&
                      item.children.map((child: any) => (
                        <li key={`child-${child.title}`}>
                          <Link
                            className="block py-1 text-black hover:text-sky-600"
                            style={{ fontSize: 14 }}
                            href={`${baseUrl}${item.slug}${child.slug}`}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}

              <li>
                <Link
                  href="/admin/logout"
                  className="block py-2 px-6 text-black hover:bg-sky-600 hover:text-white"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/admin/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>

      <style jsx>{`
        ul ul li {
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default DashboardMenu;
