import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import Category from '@/lib/database/models/category.model';
import { CreateCategoryParams } from '@/lib/types';

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { categoryName } = (await request.json()) as CreateCategoryParams;

    const newCategory = await Category.create({ name: categoryName });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
