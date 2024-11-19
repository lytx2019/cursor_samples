export interface Tenant {
  id: string;
  name: string;
}

export interface User {
  name: string;
  tenantId: string;
  userId: string;
  isLogin: boolean;
  isAdmin: boolean;
  role: 'admin' | 'developer';
}

export interface Solution {
  name: string;
  description: string;
  owner: string;
  developer: string;
  versions: string[];
}

export interface Product {
  name: string;
  category: string;
  tag: string;
  summary: string;
  cover: string;
  detailDesc: string;
  useAgreementUrl: string;
  privacyPolicyUrl: string;
  provider: string;
}

export interface SKU {
  productName: string;
  name: string;
  description: string;
  grayRelease: boolean;
  price: number;
  solution: string;
  solutionVersion: string;
  guidance: string;
  type: 'project' | 'solutionInstance';
  availableTime?: string;
  instanceLimit?: number;
  grayTenants?: string[];
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

export interface AuthState {
  isLoggedIn: boolean;
  user?: User;
  tenant?: Tenant;
}
