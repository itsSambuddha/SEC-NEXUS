'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import * as z from "zod"
import { eventDefaultValues } from "@/constants"
import CategoryDropdown from "./CategoryDropdown"
import DepartmentDropdown from "./DepartmentDropdown"
import ClubDropdown from "./ClubDropdown"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "./FileUploader"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useUploadThing } from "@/lib/uploadthing"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"
import { Event } from "@/lib/types"

type EventFormProps = {
  type: "Create" | "Update"
  event?: Event
  eventId?: string
}

const EventForm = ({ type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedClub, setSelectedClub] = useState("")
  const router = useRouter()
  const { user, isLoaded, isSignedIn } = useUser()

  const mapEventToFormValues = (event: Event) => {
    return {
      title: event.title,
      description: event.description,
      venue: event.venue,
      imageUrl: event.imageUrl,
      startDateTime: new Date(event.startDateTime),
      endDateTime: new Date(event.endDateTime),
      categoryId: event.category?._id || "",
      departmentId: event.department?._id || "",
      clubId: event.club?._id || "",
      clubRole: event.clubRole || "",
      url: event.url || "",
      status: event.status as "pending" | "approved" | "rejected",
      isCR: event.isCR,
    }
  }

  const initialValues = event && type === "Update" ? mapEventToFormValues(event) : eventDefaultValues

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  })

  const { startUpload } = useUploadThing("imageUploader")

  // Watch for changes in department and club selections
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'departmentId') {
        const deptId = value.departmentId || ""
        setSelectedDepartment(deptId)
        if (deptId) {
          // Clear club selection when department is selected
          form.setValue('clubId', "")
          setSelectedClub("")
        }
      }
      if (name === 'clubId') {
        const clubId = value.clubId || ""
        setSelectedClub(clubId)
        if (clubId) {
          // Clear department selection when club is selected
          form.setValue('departmentId', "")
          setSelectedDepartment("")
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    if (!isLoaded || !isSignedIn || !user) {
      alert("User not authenticated. Please sign in.")
      return
    }

    const userId = user.id
    const clerkId = user.externalId || userId

    try {
      let uploadedImageUrl = values.imageUrl

      if (files.length > 0) {
        const uploadedImages = await startUpload(files)
        if (uploadedImages && uploadedImages[0]) {
          uploadedImageUrl = uploadedImages[0].ufsUrl
        } else {
          alert("Image upload failed. Please try again.")
          return
        }
      }

      if (type === "Create") {
        const newEvent = await createEvent({
          event: {
            ...values,
            imageUrl: uploadedImageUrl,
          },
          userId: clerkId,
          path: "/profile",
        })

        if (newEvent) {
          form.reset()
          router.push(`/events/${newEvent._id}`)
        } else {
          alert("Failed to create event. Please try again.")
        }
      } else {
        if (!eventId) {
          alert("Event ID missing for update.")
          router.back()
          return
        }

        const updatedEvent = await updateEvent({
          userId: clerkId,
          event: {
            ...values,
            imageUrl: uploadedImageUrl,
            _id: eventId,
            startDateTime: values.startDateTime.toISOString(),
            endDateTime: values.endDateTime.toISOString(),
          },
          path: `/events/${eventId}`,
        })

        if (updatedEvent) {
          form.reset()
          router.push(`/events/${updatedEvent._id}`)
        } else {
          alert("Failed to update event. Please try again.")
        }
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <h3>Event Title</h3>
                <FormControl>
                  <Input placeholder="Event Title" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <h3 className="mt-5">Category</h3>
                <FormControl>
                  <CategoryDropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem className="w-full">
                <h3 className="mt-5">Department</h3>
                <FormControl>
                  <DepartmentDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    disabled={!!selectedClub}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clubId"
            render={({ field }) => (
              <FormItem className="w-full">
                <h3 className="mt-5">Club</h3>
                <FormControl>
                  <ClubDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    disabled={!!selectedDepartment}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Conditional fields based on selection */}
        {selectedDepartment && (
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="isCR"
              render={({ field }) => (
                <FormItem className="w-full">
                  <h3 className="mt-5">Are you the CR registering for the event?</h3>
                  <FormControl>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        onChange={(e) => field.onChange(e.target.checked)}
                        checked={field.value}
                        id="isCR"
                        className="mr-2"
                      />
                      <label htmlFor="isCR" className="text-sm">Yes, I am the CR</label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {selectedClub && (
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="clubRole"
              render={({ field }) => (
                <FormItem className="w-full">
                  <h3 className="mt-5">Club Role</h3>
                  <FormControl>
                    <Input placeholder="Your role in the club" {...field} className="input-field" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="flex flex-col gap-6 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <h3 className="mt-5">Description</h3>
                <FormControl>
                  <Textarea placeholder="Event Description" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full mb-8">
                <h3 className="mt-5">Event Banner or Flyer</h3>
                <FormControl>
                  <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem className="w-full">
                <h3 className="mt-8">Venue</h3>
                <FormControl>
                  <div className="flex-center h-[76px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <img src="/assets/icons/location-grey.svg" alt="location icon" width={20} height={16} />
                    <Input placeholder="Event Venue for eg. AV ROOM 1" {...field} className="input-field" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-7 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <h3 className="mt-8">Start Date</h3>
                <FormControl>
                  <div className="flex flex-col md:flex-row justify-center items-center space-y-1 md:space-y-0 md:space-x-3 w-full overflow-hidden rounded-full bg-gray-50 px-5 py-4">
                    <img src="/assets/icons/calendar.svg" alt="calendar icon" width={20} height={16} style={{ filter: "grayscale(100%)", float: "left" }} />
                    <DatePicker selected={field.value} onChange={(date: Date | null) => field.onChange(date)} showTimeSelect timeInputLabel="Time" dateFormat="MM/dd/yyyy h:mm aa" wrapperClassName="datePicker" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <h3 className="mt-8">End Date</h3>
                <FormControl>
                  <div className="flex flex-col md:flex-row justify-center items-center space-y-1 md:space-y-0 md:space-x-3 w-full overflow-hidden rounded-full bg-gray-50 px-5 py-4">
                    <img src="/assets/icons/calendar.svg" alt="calendar icon" width={20} height={16} style={{ filter: "grayscale(100%)", float: "left" }} />
                    <DatePicker selected={field.value} onChange={(date: Date | null) => field.onChange(date)} showTimeSelect timeInputLabel="Time" dateFormat="MM/dd/yyyy h:mm aa" wrapperClassName="datePicker" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <h3 className="mt-8">Provide a Google Form URL</h3>
                <FormControl>
                  <div className="flex-center h-[76px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <img src="/assets/icons/link.svg" alt="link icon" width={20} height={16} />
                    <Input placeholder="URL" {...field} className="input-field" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="button col-span-2 w-full mt-10">
          {form.formState.isSubmitting ? "Submitting..." : `${type} Event`}
        </Button>
      </form>
    </Form>
  )
}

export default EventForm
