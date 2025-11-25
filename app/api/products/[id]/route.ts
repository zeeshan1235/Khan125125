import { NextResponse } from 'next/server';
import { readData, writeData } from '@/utils/db';

interface Product {
  id: number;
  name: string;
  price: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const products: Product[] = await readData('products.json');
  const product = products.find((p) => p.id === parseInt(params.id));
  if (product) {
    return NextResponse.json(product);
  }
  return NextResponse.json({ error: 'Product not found' }, { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updatedProductData = await request.json();
  let products: Product[] = await readData('products.json');
  const productIndex = products.findIndex((p) => p.id === parseInt(params.id));

  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProductData };
    await writeData('products.json', products);
    return NextResponse.json(products[productIndex]);
  }
  return NextResponse.json({ error: 'Product not found' }, { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  let products: Product[] = await readData('products.json');
  const productIndex = products.findIndex((p) => p.id === parseInt(params.id));

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    await writeData('products.json', products);
    return NextResponse.json({ message: 'Product deleted successfully' });
  }
  return NextResponse.json({ error: 'Product not found' }, { status: 404 });
}
