// we're making this a reusable form component because otherwise the form becomes too complex and hard to manage.
import * as z from "zod"


// this schema checks in accordance with the data model
export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(400, "Description must be at most 400 characters."),
  venue: z.string().min(2, "Location must be at least 2 characters.").max(200, "Location must be at most 200 characters."),
  imageUrl: z.string().refine((val) => val === "" || z.string().url().safeParse(val).success, {
    message: "Image URL must be a valid URL or empty"
  }),
  startDateTime: z.date(),
  endDateTime:z.date(),
  categoryId:z.string(),
  departmentId:z.string(),
  clubId:z.string(),
  clubRole:z.string(),
  url: z.string().refine((val) => val === "" || z.string().url().safeParse(val).success, {
    message: "URL must be a valid URL or empty"
  }),
  status:z.enum(["pending", "approved", "rejected"]),
  isCR:z.boolean()
}).refine((data) => {
  // Can't fill both department and club fields
  if (data.departmentId && data.clubId) {
    return false;
  }
  return true;
}, {
  message: "Cannot select both Department and Club. Please choose only one.",
  path: ["departmentId"] // This will show the error on departmentId field
}).refine((data) => {
  // If department is selected, CR boolean is necessary
  if (data.departmentId && !data.isCR) {
    return false;
  }
  return true;
}, {
  message: "CR status is required when Department is selected.",
  path: ["isCR"]
}).refine((data) => {
  // If club is selected, club role is necessary
  if (data.clubId && !data.clubRole.trim()) {
    return false;
  }
  return true;
}, {
  message: "Club Role is required when Club is selected.",
  path: ["clubRole"]
})
