import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";

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
import { Input } from "../ui/input";
import { createCategory, getAllCategories } from "@/lib/actions/category.actions";

type DropdownProps={
  value: string;
  onChangeHandler: () => void;
}

const CategoryDropdown = ({value, onChangeHandler}: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([])

  const [newCategory, setNewCategory] = useState(""); 


  const handleAddCategory = () => {

    createCategory({
      categoryName: newCategory.trim()
    })

    .then((category)=>{
      setCategories((prevState) => [...prevState, category])
    })
 }

 useEffect(() => {
   // Fetch categories when the component mounts
   const getCategories = async () => {
     const categoriesList = await getAllCategories();

     if (categoriesList) {
      setCategories(categoriesList as ICategory[]);
     }
   };

   getCategories();
 }, []);

  // const CategoryDropdown = ({value, onChangeHandler}: DropdownProps) => {
  // const [categories, setCategories] = useState<ICategory[]>([{ _id: '1', name: 'Workshop' }, { _id: '2', name: 'Seminar' }, { _id: '3', name: 'Hackathon' }]); // Example categories, replace with actual data fetching logic



  return (
      <Select onValueChange={onChangeHandler} value={value}>
    <SelectTrigger className="select-field w-[180px]">
      <SelectValue placeholder=" Category " />
    </SelectTrigger>
    <SelectContent>
      {categories.length > 0 && 
        categories.map((category) => (
          <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
            {category.name}
          </SelectItem>
        ))}

                <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-600">Add Category</AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category </AlertDialogTitle>
              <AlertDialogDescription>
                <Input type="text" placeholder="Category name" className="input-field mt-3.5" onChange={(e) => setNewCategory(e.target.value)}/>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=> startTransition(handleAddCategory)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
 
    </SelectContent>
  </Select>
  )
}

export default CategoryDropdown


// // SelectItem can be placed using these for departments but not for category as that would be done dynamically
//     <SelectContent>
//       <SelectItem value="light">Light</SelectItem>
//       <SelectItem value="dark">Dark</SelectItem>
//       <SelectItem value="system">System bibibibibibibib</SelectItem>
//     </SelectContent>
// if this is used we would not have to use many imports. simple add the boilerplate from shadcn and continue adding
