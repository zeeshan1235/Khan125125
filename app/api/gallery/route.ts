import { NextResponse } from 'next/server';
import { readData, writeData } from '@/utils/db';

export async function GET() {
  const images = await readData('gallery.json');
  return NextResponse.json(images);
}

export async function POST(request: Request) {
  const { imageUrl } = await request.json();
  const images = await readData('gallery.json');
  images.push(imageUrl);
  await writeData('gallery.json', images);
  return NextResponse.json(imageUrl, { status: 201 });
}

export async function DELETE(request: Request) {
  const { imageUrl } = await request.json();
  let images = await readData('gallery.json');
  images = images.filter((img: string) => img !== imageUrl);
  await writeData('gallery.json', images);
  return NextResponse.json({ message: 'Image deleted successfully' });
}
