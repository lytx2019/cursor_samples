'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth';
import { PRODUCTS, SKUS } from '@/mock/data';
import type { Product, SKU } from '@/types';

export default function ProductDetailPage({
  params,
}: {
  params: { name: string };
}) {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [skus, setSkus] = useState<SKU[]>([]);

  useEffect(() => {
    const decodedName = decodeURIComponent(params.name);
    const foundProduct = PRODUCTS.find((p) => p.name === decodedName);
    if (!foundProduct) {
      router.push('/products');
      return;
    }
    setProduct(foundProduct);

    // 根据用户登录状态和租户ID过滤SKU
    const filteredSkus = SKUS.filter((sku) => {
      if (sku.productName !== decodedName) return false;
      if (!sku.grayRelease) return true;
      if (!isLoggedIn) return false;
      if (!user) return false;
      return sku.grayTenants?.includes(user.tenantId);
    });

    setSkus(filteredSkus);
  }, [params.name, isLoggedIn, user, router]);

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {product.summary}
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">类别</dt>
              <dd className="mt-1 text-sm text-gray-900">{product.category}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">标签</dt>
              <dd className="mt-1 text-sm text-gray-900">{product.tag}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">提供商</dt>
              <dd className="mt-1 text-sm text-gray-900">{product.provider}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">详细介绍</dt>
              <dd className="mt-1 text-sm text-gray-900">{product.detailDesc}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900">可选权益包</h3>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skus.map((sku) => (
            <div
              key={sku.name}
              className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
            >
              <div className="px-4 py-5 sm:p-6">
                <h4 className="text-lg font-medium text-gray-900">{sku.name}</h4>
                <p className="mt-1 text-sm text-gray-500">{sku.description}</p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {sku.type}
                  </span>
                  {sku.grayRelease && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      灰度发布
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-gray-900">
                    ¥{sku.price}
                  </p>
                  {sku.availableTime && (
                    <p className="mt-1 text-sm text-gray-500">
                      有效期：{sku.availableTime}
                    </p>
                  )}
                  {sku.instanceLimit && (
                    <p className="text-sm text-gray-500">
                      实例上限：{sku.instanceLimit}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className="mt-6 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  选择此权益包
                </button>
              </div>
              <div className="px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <span className="font-medium text-gray-900">解决方案：</span>
                  {sku.solution} {sku.solutionVersion}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
