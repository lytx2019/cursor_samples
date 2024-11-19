import { NextResponse } from 'next/server';
import type { Product } from '../../../types';
import { MOCK_IMAGES } from '../../../mock/images';

// Mock database
const products: Record<string, Product> = {
  '商品1': {
    name: '商品1',
    category: '所属类别',
    tag: '所属标签',
    summary: '商品简介',
    cover: MOCK_IMAGES.product1,
    detailDesc: '介绍（图文）',
    useAgreementURL: '使用协议网址',
    privacyPolicyURL: '隐私协议网址',
    provider: '兰图科技',
  },
  '商品2': {
    name: '商品2',
    category: '所属类别2',
    tag: '所属标签2',
    summary: '商品简介2',
    cover: MOCK_IMAGES.product2,
    detailDesc: '介绍（图文2）',
    useAgreementURL: '使用协议网址2',
    privacyPolicyURL: '隐私协议网址2',
    provider: '兰图科技',
  },
};

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const product = products[decodeURIComponent(params.name)];
  
  if (!product) {
    return new NextResponse('Product not found', { status: 404 });
  }

  return NextResponse.json(product);
}
