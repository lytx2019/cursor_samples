export interface Product {
  name: string;
  category: string;
  tag: string;
  summary: string;
  cover: string;
  detailDesc: string;
  useAgreementURL: string;
  privacyPolicyURL: string;
  provider: string;
}

export interface SKUPackage {
  skuName: string;
  skuDesc: string;
  skuGray: boolean;
  skuPrice: number;
  solution: string;
  solutionVersion: string;
  guidance: string;
  type: 'project' | 'solutionInstance';
  availableTime?: string;
  instanceLimit?: number;
}

export interface User {
  name: string;
  tenantId: string;
  userId: string;
  isLogin: boolean;
  isAdmin: boolean;
  role: string;
}

export interface Order {
  id: string;
  productName: string;
  skuName: string;
  userId: string;
  tenantId: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}
