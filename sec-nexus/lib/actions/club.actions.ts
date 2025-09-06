"use server"

import { revalidatePath } from "next/cache"
import { connectToDatabase } from "../database"
import Club from "../database/models/club.model"

export const createClub = async ({ clubName }: { clubName: string }) => {
  try {
    await connectToDatabase()

    const newClub = await Club.create({ name: clubName })

    revalidatePath("/")

    return JSON.parse(JSON.stringify(newClub))
  } catch (error) {
    console.log(error)
    throw new Error("Failed to create club")
  }
}

export const getAllClubs = async () => {
  try {
    await connectToDatabase()

    const clubs = await Club.find()

    return JSON.parse(JSON.stringify(clubs))
  } catch (error) {
    console.log(error)
    throw new Error("Failed to get clubs")
  }
}
