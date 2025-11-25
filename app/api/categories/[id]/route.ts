import { NextResponse } from 'next/server';
import { readData, writeData } from '@/utils/db';

interface Category {
  id: number;
  name: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const categories: Category[] = await readData('categories.json');
  const category = categories.find((c) => c.id === parseInt(params.id));
  if (category) {
    return NextResponse.json(category);
  }
  return NextResponse.json({ error: 'Category not found' }, { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updatedCategoryData = await request.json();
  let categories: Category[] = await readData('categories.json');
  const categoryIndex = categories.findIndex((c) => c.id === parseInt(params.id));

  if (categoryIndex !== -1) {
    categories[categoryIndex] = { ...categories[categoryIndex], ...updatedCategoryData };
    await writeData('categories.json', categories);
    return NextResponse.json(categories[categoryIndex]);
  }
  return NextResponse.json({ error: 'Category not found' }, { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  let categories: Category[] = await readData('categories.json');
  const categoryIndex = categories.findIndex((c) => c.id === parseInt(params.id));

  if (categoryIndex !== -1) {
    categories.splice(categoryIndex, 1);
    await writeData('categories.json', categories);
    return NextResponse.json({ message: 'Category deleted successfully' });
  }
  return NextResponse.json({ error: 'Category not found' }, { status: 404 });
}
