import { NextResponse } from 'next/server';
import { createEvent } from '@/lib/actions/event.actions';
import { CreateEventParams } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const { event, userId, path } = (await request.json()) as CreateEventParams;

    const newEvent = await createEvent({ event, userId, path });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
