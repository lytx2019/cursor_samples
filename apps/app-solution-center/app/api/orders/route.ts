import { NextResponse } from 'next/server';
import type { Order } from '../../types';

// Mock database
const orders: Order[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productName, skuName } = body;

    // In a real application, you would:
    // 1. Validate the user's session
    // 2. Get the user's tenant ID
    // 3. Check if the SKU is available for the tenant (gray release)
    // 4. Create the order in the database
    // 5. Send notifications to relevant parties

    const order: Order = {
      id: `order-${Date.now()}`,
      productName,
      skuName,
      userId: '1', // Mock user ID
      tenantId: '10002', // Mock tenant ID
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    orders.push(order);

    // In a real application, you would send notifications here
    console.log(`New order created: ${order.id}`);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return new NextResponse('Error creating order', { status: 500 });
  }
}
