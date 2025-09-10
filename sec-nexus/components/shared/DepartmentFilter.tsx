"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.actions";
import { getAllDepartments } from "@/lib/actions/department.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { IDepartment } from "@/lib/database/models/department.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
// Make sure to import from 'next/navigation' for App Router
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DepartmentFilter = () => {
    const [departments, setDepartments] = useState<IDepartment[]>([]);
      const router = useRouter();
      const searchParams = useSearchParams();

       useEffect(() => {
    const getDepartments = async () => {
      const departmentList = await getAllDepartments();

      departmentList && setDepartments(departmentList as IDepartment[])
    }

    getDepartments();
  }, [])

  const onSelectDepartment = (department: string) => {
    let newUrl = '';

    if(department && department !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'department',
        value: department
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['department']
      })
    }

    router.push(newUrl, { scroll: false });
  }

  return (
    <Select onValueChange={(value: string) => onSelectDepartment(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Department" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All Departments</SelectItem>

        {departments.map((department) => (
          <SelectItem value={department.name} key={department._id} className="select-item p-regular-14">
            {department.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default DepartmentFilter