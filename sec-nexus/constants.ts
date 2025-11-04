export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Event',
    route: '/events/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
]

export const adminLinks = [
  {
    label: 'Admin Dashboard',
    route: '/admin/dashboard',
  },
]

export const eventDefaultValues = {
    title: "",
    description: "",
    venue: "",
    imageUrl: "",
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: "",
    departmentId: "",
    clubId: "",
    clubRole: "",
    url: "",
    status: "pending",
    isCR: "no"
  } as const
