'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              解决方案中心
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/products"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                浏览方案
              </Link>
              {isLoggedIn && (
                <Link
                  href="/orders"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  我的订单
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <BellIcon className="h-6 w-6" />
                </button>
                <div className="ml-4 flex items-center">
                  <UserCircleIcon className="h-8 w-8 text-gray-600" />
                  <div className="ml-2">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </div>
                    <div className="text-xs text-gray-500">{user?.role}</div>
                  </div>
                  <button
                    onClick={logout}
                    className="ml-4 text-sm text-gray-600 hover:text-gray-900"
                  >
                    退出
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
