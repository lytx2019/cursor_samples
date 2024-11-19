import type { Tenant, User, Solution, Product, SKU } from '@/types';

export const TENANTS: Tenant[] = [
  { id: '10002', name: '兰图科技' },
  { id: '1000001', name: '测试租户1' },
  { id: '1000002', name: '测试租户2' },
];

export const USERS: User[] = [
  { name: 'Bob', tenantId: '10002', userId: '1', isLogin: true, isAdmin: true, role: 'admin' },
  { name: 'John', tenantId: '10002', userId: '2', isLogin: true, isAdmin: true, role: 'admin' },
  { name: 'Alice', tenantId: '1000001', userId: '3', isLogin: true, isAdmin: true, role: 'admin' },
  { name: 'Tom', tenantId: '1000001', userId: '4', isLogin: true, isAdmin: false, role: 'developer' },
  { name: 'Emily', tenantId: '1000002', userId: '5', isLogin: true, isAdmin: true, role: 'admin' },
];

export const SOLUTIONS: Solution[] = [
  {
    name: 'solution1',
    description: '解决方案1',
    owner: 'Bob',
    developer: 'Alice',
    versions: ['1.0.0', '2.0.0'],
  },
];

export const PRODUCTS: Product[] = [
  {
    name: '商品1',
    category: '所属类别',
    tag: '所属标签',
    summary: '商品简介',
    cover: '/images/product1.svg',
    detailDesc: '介绍（图文）',
    useAgreementUrl: '使用协议网址',
    privacyPolicyUrl: '隐私协议网址',
    provider: '兰图科技',
  },
  {
    name: '商品2',
    category: '所属类别2',
    tag: '所属标签2',
    summary: '商品简介2',
    cover: '/images/product2.svg',
    detailDesc: '介绍（图文2）',
    useAgreementUrl: '使用协议网址2',
    privacyPolicyUrl: '隐私协议网址2',
    provider: '兰图科技',
  },
];

export const SKUS: SKU[] = [
  {
    productName: '商品1',
    name: '权益包1',
    description: '权益包描述',
    grayRelease: false,
    price: 100,
    solution: 'solution1',
    solutionVersion: '1.0.0',
    guidance: '使用指导',
    type: 'project',
  },
  {
    productName: '商品1',
    name: '权益包2',
    description: '权益包描述',
    grayRelease: false,
    price: 0,
    solution: 'solution1',
    solutionVersion: '1.0.0',
    guidance: '使用指导',
    type: 'solutionInstance',
    availableTime: '1年8月12天',
    instanceLimit: 10,
  },
  {
    productName: '商品1',
    name: '权益包3',
    description: '权益包描述',
    grayRelease: true,
    price: 999,
    solution: 'solution1',
    solutionVersion: '2.0.0',
    guidance: '使用指导',
    type: 'solutionInstance',
    availableTime: '1年8月12天',
    instanceLimit: 100,
    grayTenants: ['1000001'],
  },
  {
    productName: '商品1',
    name: '权益包4',
    description: '权益包描述',
    grayRelease: true,
    price: 999,
    solution: 'solution1',
    solutionVersion: '2.0.0',
    guidance: '使用指导',
    type: 'project',
    grayTenants: ['1000002'],
  },
  {
    productName: '商品2',
    name: '权益包1',
    description: '权益包描述',
    grayRelease: true,
    price: 999,
    solution: 'solution1',
    solutionVersion: '1.0.0',
    guidance: '使用指导',
    type: 'solutionInstance',
    availableTime: '1年8月12天',
    instanceLimit: 10,
    grayTenants: ['1000001'],
  },
];
