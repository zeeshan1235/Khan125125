import { NextResponse } from 'next/server';
import { readData, writeData } from '@/utils/db';

export async function GET() {
  const categories = await readData('categories.json');
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const newCategory = await request.json();
  const categories = await readData('categories.json');
  newCategory.id = categories.length ? Math.max(...categories.map((c: any) => c.id)) + 1 : 1;
  categories.push(newCategory);
  await writeData('categories.json', categories);
  return NextResponse.json(newCategory, { status: 201 });
}
