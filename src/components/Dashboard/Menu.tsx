import Link from 'next/link';
import { useRouter } from 'next/router';
import { removeCookie } from 'typescript-cookie';

import usePocketBaseAuth from '@/hooks/usePocketBaseAuth';

const DashboardMenu = () => {
  const [admin]: any = usePocketBaseAuth();
  const router = useRouter();
  const baseUrl = '/admin';
  const adminMenus = [
    {
      title: 'Overview',
      slug: '/overview',
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
          title: 'Add New',
          slug: '/add-new',
        },
      ],
    },
    {
      title: 'Brands',
      slug: '/brands',
    },
    {
      title: 'Categories',
      slug: '/categories',
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
        <h1 className="text-xl">MySoklin Dashboard</h1>
      </div>

      <nav className="mt-4">
        <ul>
          {admin !== null ? (
            <>
              {adminMenus.map((item: any) => (
                <li key={`admin-menu-${item.slug}`}>
                  <Link
                    className={`block py-2 px-6 hover:bg-sky-600 hover:text-white ${
                      router &&
                      router.asPath &&
                      router.asPath.replace('/admin', '').includes(item.slug)
                        ? 'bg-sky-600 text-white'
                        : 'text-white'
                    }`}
                    href={`${baseUrl}${item.slug}`}
                    style={{ fontSize: 14 }}
                  >
                    {item.title}
                  </Link>

                  <ul className="pl-10">
                    {item.children &&
                      item.children.map((child: any) => (
                        <li key={`child-${child.title}`}>
                          <Link
                            className="block py-1 text-white hover:text-sky-600"
                            href={`${baseUrl}${item.slug}${child.slug}`}
                            style={{ fontSize: 13 }}
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
                  href="/"
                  onClick={() => {
                    removeCookie('token');
                    removeCookie('admin');
                    localStorage.removeItem('pocketbase_auth');
                  }}
                  className="block py-2 px-6 text-white hover:bg-sky-600 hover:text-white"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/admin/login"
                className='hover:text-white" block py-2 px-6 text-black hover:bg-sky-600'
              >
                Login
              </Link>
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
