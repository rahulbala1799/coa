import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/products/[id] - Get a single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
  }
}

// PUT /api/products/[id] - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { name, description, price, imageUrl, sku, inventory } = body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Update product
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: name || undefined,
        description: description || undefined,
        price: price !== undefined ? price : undefined,
        imageUrl: imageUrl !== undefined ? imageUrl : undefined,
        sku: sku || undefined,
        inventory: inventory !== undefined ? inventory : undefined,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    if ((error as any).code === 'P2002') {
      return NextResponse.json(
        { error: 'A product with this SKU already exists' },
        { status: 409 }
      );
    }
    
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
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