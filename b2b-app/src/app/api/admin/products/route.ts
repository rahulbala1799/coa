import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { adminGuard } from '@/lib/auth';

export async function POST(request: NextRequest) {
  // Check if user is admin
  const guardResponse = await adminGuard(request);
  if (guardResponse) {
    return guardResponse;
  }

  try {
    const body = await request.json();
    const { name, description, price, imageUrl, sku, category, inventory } = body;

    // Validation
    if (!name || !description || !price || !sku || !category) {
      return NextResponse.json(
        { error: 'Name, description, price, SKU, and category are required' },
        { status: 400 }
      );
    }

    // Check if SKU already exists
    const existingProduct = await prisma.product.findUnique({
      where: { sku },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this SKU already exists' },
        { status: 409 }
      );
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: typeof price === 'string' ? parseFloat(price) : price,
        imageUrl,
        sku,
        category,
        inventory: inventory || 0,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Check if user is admin
  const guardResponse = await adminGuard(request);
  if (guardResponse) {
    return guardResponse;
  }

  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // Build where clause
    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get products
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error getting products:', error);
    return NextResponse.json({ error: 'Error getting products' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  // Check if user is admin
  const guardResponse = await adminGuard(request);
  if (guardResponse) {
    return guardResponse;
  }

  try {
    const body = await request.json();
    const { id, name, description, price, imageUrl, category, inventory } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Update product
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: typeof price === 'string' ? parseFloat(price) : price,
        imageUrl,
        category,
        inventory,
      },
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  // Check if user is admin
  const guardResponse = await adminGuard(request);
  if (guardResponse) {
    return guardResponse;
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Delete product
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
  }
} 