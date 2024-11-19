'use client';

import { useEffect, useState } from 'react';
import { Product, SKUPackage } from '../../types';

export default function ProductDetailPage({ params }: { params: { name: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [skuPackages, setSkuPackages] = useState<SKUPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSKU, setSelectedSKU] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productResponse = await fetch(`/api/products/${encodeURIComponent(params.name)}`);
        const productData = await productResponse.json();
        setProduct(productData);

        const skuResponse = await fetch(`/api/products/${encodeURIComponent(params.name)}/skus`);
        const skuData = await skuResponse.json();
        setSkuPackages(skuData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [params.name]);

  const handleCreateOrder = async (skuName: string) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: params.name,
          skuName,
        }),
      });

      if (response.ok) {
        alert('订单创建成功！');
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('订单创建失败，请重试');
    }
  };

  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 产品基本信息 */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-96 lg:h-full">
              <img
                src={product.cover}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                  {product.category}
                </span>
                <h1 className="mt-2 text-3xl font-bold text-white">{product.name}</h1>
                <p className="mt-2 text-white/80">{product.summary}</p>
              </div>
            </div>
            <div className="p-8">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">详细介绍</h2>
                <div dangerouslySetInnerHTML={{ __html: product.detailDesc }} />
              </div>
              <div className="mt-8">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">服务商</h3>
                    <p className="mt-1 text-gray-500">{product.provider}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15.585l-7.07 3.714 1.35-7.862L.72 7.177l7.88-1.146L10 0l2.4 6.03 7.88 1.146-5.56 5.426 1.35 7.862z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 权益包列表 */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">选择权益包</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skuPackages.map((sku) => (
              <div
                key={sku.skuName}
                className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                  selectedSKU === sku.skuName
                    ? 'ring-2 ring-primary-500 transform -translate-y-1'
                    : 'hover:shadow-xl hover:-translate-y-1'
                }`}
                onClick={() => setSelectedSKU(sku.skuName)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{sku.skuName}</h3>
                    {sku.skuGray && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        灰度发布
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 mb-4">{sku.skuDesc}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">价格</span>
                      <span className="text-2xl font-bold text-gray-900">
                        ¥{sku.skuPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">解决方案</span>
                      <span className="text-gray-900">
                        {sku.solution} ({sku.solutionVersion})
                      </span>
                    </div>
                    {sku.type === 'solutionInstance' && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">有效期</span>
                          <span className="text-gray-900">{sku.availableTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">实例限制</span>
                          <span className="text-gray-900">{sku.instanceLimit} 个</span>
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => handleCreateOrder(sku.skuName)}
                    className="mt-6 w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  >
                    立即购买
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 相关文档 */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">相关文档</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <a
              href={product.useAgreementURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 border rounded-lg hover:border-primary-500 transition-colors"
            >
              <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">使用协议</h3>
                <p className="mt-1 text-gray-500">查看详细的使用条款和协议</p>
              </div>
            </a>
            <a
              href={product.privacyPolicyURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 border rounded-lg hover:border-primary-500 transition-colors"
            >
              <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">隐私政策</h3>
                <p className="mt-1 text-gray-500">了解我们如何保护您的数据</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
