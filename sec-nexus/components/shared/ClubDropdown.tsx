import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IClub } from "@/lib/database/models/club.model"
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
import { createClub, getAllClubs } from "@/lib/actions/club.actions"

type DropdownProps = {
  value: string;
  onChangeHandler: () => void;
  disabled?: boolean;
}

const ClubDropdown = ({ value, onChangeHandler, disabled }: DropdownProps) => {
  const [clubs, setClubs] = useState<IClub[]>([])

  const [newClub, setNewClub] = useState("")

  const handleAddClub = () => {
    createClub({
      clubName: newClub.trim()
    })
    .then((club) => {
      setClubs((prevState) => [...prevState, club])
    })
  }

  useEffect(() => {
    // Fetch clubs when the component mounts
    const getClubs = async () => {
      const clubsList = await getAllClubs();

      if (clubsList) {
        setClubs(clubsList as IClub[]);
      }
    };

    getClubs();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} value={value} disabled={disabled}>
      <SelectTrigger className="select-field w-[180px]">
        <SelectValue placeholder=" Club " />
      </SelectTrigger>
      <SelectContent>
        {clubs.length > 0 &&
          clubs.map((club) => (
            <SelectItem key={club._id} value={club._id} className="select-item p-regular-14">
              {club.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-600">Add Club</AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Club</AlertDialogTitle>
              <AlertDialogDescription>
                <Input type="text" placeholder="Club name" className="input-field mt-3.5" onChange={(e) => setNewClub(e.target.value)} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddClub)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  )
}

export default ClubDropdown
