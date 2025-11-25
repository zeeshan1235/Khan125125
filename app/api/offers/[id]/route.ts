import { NextResponse } from 'next/server';
import { readData, writeData } from '@/utils/db';

interface Offer {
  id: number;
  title: string;
  description: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const offers: Offer[] = await readData('offers.json');
  const offer = offers.find((o) => o.id === parseInt(params.id));
  if (offer) {
    return NextResponse.json(offer);
  }
  return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updatedOfferData = await request.json();
  let offers: Offer[] = await readData('offers.json');
  const offerIndex = offers.findIndex((o) => o.id === parseInt(params.id));

  if (offerIndex !== -1) {
    offers[offerIndex] = { ...offers[offerIndex], ...updatedOfferData };
    await writeData('offers.json', offers);
    return NextResponse.json(offers[offerIndex]);
  }
  return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  let offers: Offer[] = await readData('offers.json');
  const offerIndex = offers.findIndex((o) => o.id === parseInt(params.id));

  if (offerIndex !== -1) {
    offers.splice(offerIndex, 1);
    await writeData('offers.json', offers);
    return NextResponse.json({ message: 'Offer deleted successfully' });
  }
  return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
}
