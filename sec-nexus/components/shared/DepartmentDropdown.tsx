import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IDepartment } from "@/lib/database/models/department.model"
import { startTransition, useEffect, useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { createDepartment, getAllDepartments } from "@/lib/actions/department.actions"

type DropdownProps = {
  value: string;
  onChangeHandler: () => void;
  disabled?: boolean;
}

const DepartmentDropdown = ({ value, onChangeHandler, disabled }: DropdownProps) => {
  const [departments, setDepartments] = useState<IDepartment[]>([])

  const [newDepartment, setNewDepartment] = useState("")

  const handleAddDepartment = () => {
    createDepartment({
      departmentName: newDepartment.trim()
    })
    .then((department) => {
      setDepartments((prevState) => [...prevState, department])
    })
  }

  useEffect(() => {
    // Fetch departments when the component mounts
    const getDepartments = async () => {
      const departmentsList = await getAllDepartments();

      if (departmentsList) {
        setDepartments(departmentsList as IDepartment[]);
      }
    };

    getDepartments();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} value={value} disabled={disabled}>
      <SelectTrigger className="select-field w-[180px]">
        <SelectValue placeholder=" Department " />
      </SelectTrigger>
      <SelectContent>
        {departments.length > 0 &&
          departments.map((department) => (
            <SelectItem key={department._id} value={department._id} className="select-item p-regular-14">
              {department.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-600">Add Department</AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Department</AlertDialogTitle>
              <AlertDialogDescription>
                <Input type="text" placeholder="Department name" className="input-field mt-3.5" onChange={(e) => setNewDepartment(e.target.value)} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddDepartment)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  )
}

export default DepartmentDropdown
