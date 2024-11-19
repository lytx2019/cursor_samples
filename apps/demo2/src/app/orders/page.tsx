'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth';

export default function OrdersPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">我的订单</h1>
          <p className="mt-2 text-sm text-gray-700">
            查看您的所有订单记录和状态。
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-8 text-center text-gray-500">
          暂无订单记录
        </div>
      </div>
    </div>
  );
}
