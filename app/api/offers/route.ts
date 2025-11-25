import { NextResponse } from 'next/server';
import { readData, writeData } from '@/utils/db';

export async function GET() {
  const offers = await readData('offers.json');
  return NextResponse.json(offers);
}

export async function POST(request: Request) {
  const newOffer = await request.json();
  const offers = await readData('offers.json');
  newOffer.id = offers.length ? Math.max(...offers.map((o: any) => o.id)) + 1 : 1;
  offers.push(newOffer);
  await writeData('offers.json', offers);
  return NextResponse.json(newOffer, { status: 201 });
}
