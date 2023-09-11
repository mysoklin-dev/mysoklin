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
      title: 'General Settings (WIP)',
      slug: '/general',
      children: [
        {
          title: 'Main Carousel',
          slug: '/carousel',
        },
        {
          title: 'Video Carousel',
          slug: '/video-carousel',
        },
        {
          title: 'Social Media',
          slug: '/social',
        },
        {
          title: 'Social Group',
          slug: '/social-group',
        },
      ],
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
      slug: '/product_brands',
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
      title: 'Categories',
      slug: '/product_categories',
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
      title: 'Articles',
      slug: '/articles',
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
      title: 'Updates',
      slug: '/updates/items',
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
  ];

  const isActive = (item: any) => {
    return (
      router &&
      router.asPath &&
      router.asPath.replace('/admin', '').includes(item.slug)
    );
  };

  return (
    <div className="h-full py-6">
      <div className="px-6">
        <h1 className="text-xl">Dashboard</h1>
      </div>

      <nav className="mt-4">
        <ul>
          {admin !== null ? (
            <>
              {adminMenus.map((item: any) => (
                <li key={`admin-menu-${item.slug}`}>
                  <Link
                    className={`block py-2 px-6 hover:bg-sky-600 hover:text-white ${
                      isActive(item) ? 'bg-sky-600 text-white' : 'text-white'
                    }`}
                    href={`${baseUrl}${item.slug}`}
                    style={{ fontSize: 14 }}
                  >
                    {item.title}
                  </Link>

                  <ul
                    className="pl-10"
                    style={{ display: isActive(item) ? 'block' : 'none' }}
                  >
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

              <li className="w-100 block cursor-pointer py-2 px-6 text-white hover:bg-sky-600 hover:text-white">
                <button
                  onClick={() => {
                    removeCookie('token');
                    removeCookie('admin');
                    localStorage.removeItem('pocketbase_auth');
                    window.location.href = '/';
                  }}
                >
                  <span>Logout</span>
                </button>
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
