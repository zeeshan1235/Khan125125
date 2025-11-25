import { NextResponse } from 'next/server';
import { readData, writeData } from '@/utils/db';

export async function GET() {
  const products = await readData('products.json');
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const newProduct = await request.json();
  const products = await readData('products.json');
  newProduct.id = products.length ? Math.max(...products.map((p: any) => p.id)) + 1 : 1;
  products.push(newProduct);
  await writeData('products.json', products);
  return NextResponse.json(newProduct, { status: 201 });
}
