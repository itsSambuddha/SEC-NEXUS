// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string
  firstName: string
  lastName: string
  username: string
  email: string
  photo: string
}

export type UpdateUserParams = {
  firstName: string
  lastName: string
  username: string
  photo: string
}

// ====== EVENT PARAMS
export type CreateEventParams = {
  userId: string
  event: {
    title: string
    description: string
    venue?: string
    imageUrl: string
    startDateTime: Date
    endDateTime: Date
    url?: string
    categoryId: string
    departmentId?: string
  }
  path: string
}

export type UpdateEventParams = {
  userId: string
  event: {
    _id: string
    title: string
    imageUrl: string
    description: string
    venue?: string
    startDateTime: Date
    endDateTime: Date
    url?: string
    categoryId: string
    departmentId?: string
  }
  path: string
}

export type DeleteEventParams = {
  eventId: string
  path: string
}

export type GetAllEventsParams = {
  query: string
  category: string
  department?: string
  limit: number
  page: number
}

export type GetEventsByUserParams = {
  userId: string
  limit?: number
  page: number
}

export type GetRelatedEventsByCategoryParams = {
  categoryId: string
  eventId: string
  limit?: number
  page: number | string
}

export type Event = {
  _id: string
  title: string
  description: string
  venue?: string
  organizer: {
    _id: string
    firstName: string
    lastName: string
  }
  createdAt: Date
  imageUrl: string
  startDateTime: Date
  endDateTime: Date
  url?: string
  category: {
    _id: string
    name: string
  }
  department?: {
    _id: string
    name: string
  }
  status: 'pending' | 'approved' | 'rejected'
  isCR: boolean
}

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string
}

// ====== DEPARTMENT PARAMS
export type CreateDepartmentParams = {
  departmentName: string
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
