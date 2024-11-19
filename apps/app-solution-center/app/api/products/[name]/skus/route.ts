import { NextResponse } from 'next/server';
import type { SKUPackage } from '../../../../types';

// Mock database
const skuPackages: Record<string, SKUPackage[]> = {
  '商品1': [
    {
      skuName: '权益包1',
      skuDesc: '权益包描述',
      skuGray: false,
      skuPrice: 100,
      solution: 'solution1',
      solutionVersion: '1.0.0',
      guidance: '使用指导',
      type: 'project',
    },
    {
      skuName: '权益包2',
      skuDesc: '权益包描述',
      skuGray: false,
      skuPrice: 0,
      solution: 'solution1',
      solutionVersion: '1.0.0',
      guidance: '使用指导',
      type: 'solutionInstance',
      availableTime: '1年8月12天',
      instanceLimit: 10,
    },
    {
      skuName: '权益包3',
      skuDesc: '权益包描述',
      skuGray: true,
      skuPrice: 999,
      solution: 'solution1',
      solutionVersion: '2.0.0',
      guidance: '使用指导',
      type: 'solutionInstance',
      availableTime: '1年8月12天',
      instanceLimit: 100,
    },
  ],
  '商品2': [
    {
      skuName: '权益包1',
      skuDesc: '权益包描述',
      skuGray: true,
      skuPrice: 999,
      solution: 'solution1',
      solutionVersion: '1.0.0',
      guidance: '使用指导',
      type: 'solutionInstance',
      availableTime: '1年8月12天',
      instanceLimit: 10,
    },
  ],
};

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const productSkus = skuPackages[decodeURIComponent(params.name)];
  
  if (!productSkus) {
    return new NextResponse('SKUs not found', { status: 404 });
  }

  // In a real application, you would filter SKUs based on user's tenant ID for gray release
  return NextResponse.json(productSkus);
}
