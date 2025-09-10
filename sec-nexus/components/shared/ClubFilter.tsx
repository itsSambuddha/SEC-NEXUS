"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { getAllCategories } from "@/lib/actions/category.actions";
import { getAllClubs } from "@/lib/actions/club.actions";
// import { ICategory } from "@/lib/database/models/category.model";
import { IClub } from "@/lib/database/models/club.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
// Make sure to import from 'next/navigation' for App Router
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ClubFilter = () => {
    const [club, setClub] = useState<IClub[]>([]);
      const router = useRouter();
      const searchParams = useSearchParams();

       useEffect(() => {
    const getClub = async () => {
      const clubList = await getAllClubs();

      if (clubList) {
        setClub(clubList as IClub[]);
      }
    }

    getClub();
  }, [])

  const onSelectClub = (club: string) => {
    let newUrl = '';

    if(club && club !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'club',
        value: club
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['club']
      })
    }

    router.push(newUrl, { scroll: false });
  }

  return (
    <Select onValueChange={(value: string) => onSelectClub(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Club" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All Clubs</SelectItem>

        {club.map((club) => (
          <SelectItem value={club.name} key={club._id} className="select-item p-regular-14">
            {club.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default ClubFilter