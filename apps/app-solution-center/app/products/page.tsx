'use client';

import { useEffect, useState } from 'react';
import { Product } from '../types';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">发现优质解决方案</span>
            <span className="block text-primary-600">助力业务腾飞</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            探索我们精心挑选的解决方案，为您的企业带来更高效的工作流程和更好的业务成果。
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              href={`/products/${encodeURIComponent(product.name)}`}
              key={product.name}
              className="group"
            >
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={product.cover}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                      {product.category}
                    </span>
                    <span className="text-sm text-gray-500">{product.provider}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-gray-500 line-clamp-2">{product.summary}</p>
                  <div className="mt-6 flex items-center">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-7.07 3.714 1.35-7.862L.72 7.177l7.88-1.146L10 0l2.4 6.03 7.88 1.146-5.56 5.426 1.35 7.862z"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-7.07 3.714 1.35-7.862L.72 7.177l7.88-1.146L10 0l2.4 6.03 7.88 1.146-5.56 5.426 1.35 7.862z"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-7.07 3.714 1.35-7.862L.72 7.177l7.88-1.146L10 0l2.4 6.03 7.88 1.146-5.56 5.426 1.35 7.862z"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-7.07 3.714 1.35-7.862L.72 7.177l7.88-1.146L10 0l2.4 6.03 7.88 1.146-5.56 5.426 1.35 7.862z"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-7.07 3.714 1.35-7.862L.72 7.177l7.88-1.146L10 0l2.4 6.03 7.88 1.146-5.56 5.426 1.35 7.862z"
                          />
                        </svg>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">5.0 (24 评价)</p>
                    </div>
                    <div className="inline-flex items-center justify-center rounded-full bg-primary-50 p-2">
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
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
