'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth';
import { PRODUCTS } from '@/mock/data';
import type { Product } from '@/types';

export default function ProductsPage() {
  const { isLoggedIn, user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // 根据用户登录状态和租户ID过滤商品
    if (isLoggedIn) {
      setProducts(PRODUCTS);
    } else {
      // 未登录用户只能看到非灰度发布的商品
      setProducts(PRODUCTS.slice(0, 1));
    }
  }, [isLoggedIn, user]);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">解决方案列表</h1>
          <p className="mt-2 text-sm text-gray-700">
            浏览我们提供的所有解决方案，选择最适合您需求的产品。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.name}
            href={`/products/${encodeURIComponent(product.name)}`}
            className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-w-3 aspect-h-2">
              <div className="h-48 bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white text-4xl font-bold">
                {product.name}
              </div>
            </div>
            <div className="flex-1 p-6 space-y-2">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.summary}</p>
              <div className="mt-4">
                <div className="text-sm text-gray-500">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {product.category}
                  </span>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {product.provider}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
