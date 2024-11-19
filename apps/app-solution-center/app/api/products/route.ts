import { NextResponse } from 'next/server';
import type { Product } from '../../types';
import { MOCK_IMAGES } from '../../mock/images';

// This is a mock database. In a real application, you would use a proper database.
const products: Product[] = [
  {
    name: '商品1',
    category: '分类1',
    tag: '标签1',
    summary: '这是商品1的简介',
    cover: MOCK_IMAGES.product1,
    description: '这是商品1的详细描述',
    useAgreementUrl: 'https://example.com/agreement1',
    privacyPolicyUrl: 'https://example.com/privacy1',
    provider: '供应商1',
  },
  {
    name: '商品2',
    category: '分类2',
    tag: '标签2',
    summary: '这是商品2的简介',
    cover: MOCK_IMAGES.product2,
    description: '这是商品2的详细描述',
    useAgreementUrl: 'https://example.com/agreement2',
    privacyPolicyUrl: 'https://example.com/privacy2',
    provider: '供应商2',
  },
];

export async function GET() {
  // In a real application, you would fetch this data from a database
  return NextResponse.json(products);
}
