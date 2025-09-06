import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import Department from '@/lib/database/models/department.model';
import { CreateDepartmentParams } from '@/lib/types';

export async function GET() {
  try {
    await connectToDatabase();

    const departments = await Department.find();

    return NextResponse.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { departmentName } = (await request.json()) as CreateDepartmentParams;

    const newDepartment = await Department.create({ name: departmentName });

    return NextResponse.json(newDepartment, { status: 201 });
  } catch (error) {
    console.error('Error creating department:', error);
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 });
  }
}
