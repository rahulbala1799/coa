import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, imageUrl, sku, inventory } = body;

    // Simple validation
    if (!name || !description || !price || !sku) {
      return NextResponse.json(
        { error: 'Name, description, price, and SKU are required' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        sku,
        inventory: inventory || 0,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if ((error as any).code === 'P2002') {
      return NextResponse.json(
        { error: 'A product with this SKU already exists' },
        { status: 409 }
      );
    }
    
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
} 