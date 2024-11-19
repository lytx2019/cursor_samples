'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;

    try {
      login(username);
      router.push('/products');
    } catch (err) {
      setError('登录失败，请稍后重试');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登录解决方案中心
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            探索我们精心挑选的解决方案，为您的企业带来更高效的工作流程和更好的业务成果。
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                用户名
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="请输入用户名（例如：Alice）"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              登录
            </button>
          </div>

          <div className="text-sm text-center text-gray-600">
            可用的测试账号：
            <div className="mt-1 space-x-2">
              <span className="inline-block px-2 py-1 bg-gray-100 rounded">Bob</span>
              <span className="inline-block px-2 py-1 bg-gray-100 rounded">Alice</span>
              <span className="inline-block px-2 py-1 bg-gray-100 rounded">Tom</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
