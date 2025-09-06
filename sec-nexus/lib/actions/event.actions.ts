"use server"

import { Query, FilterQuery } from "mongoose";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Event, { IEvent } from "../database/models/event.model";
import { CreateEventParams, UpdateEventParams, DeleteEventParams, GetAllEventsParams, GetEventsByUserParams, GetRelatedEventsByCategoryParams, GetRelatedEventsByDepartmentParams } from "../types"
import { handleError } from "../utils"
import Category from "../database/models/category.model";
import Department from "../database/models/department.model";
// Ensure Club model is registered
import "../database/models/club.model";
import Club from "../database/models/club.model";
import { revalidatePath } from "next/cache";

const populateEvent = <T>(query: Query<T, IEvent>) => {
    return query
    .populate({path:'organizer', model: User, select:'_id firstName lastName clerkId'})
    .populate({path:'category', model:Category, select:'_id name'})
    .populate({path:'department', model:Department, select:'_id name'})
    .populate({path:'club', model:Club, select:'_id name', options: { strictPopulate: false }});
}

export const createEvent = async ({event, userId}:
    CreateEventParams
) => {
    try {
        console.log('createEvent called with:', { userId, eventData: event });

        await connectToDatabase();
        console.log('Database connected successfully');

        // Try to find user by clerkId instead of _id
        const organizer = await User.findOne({ clerkId: userId });
        console.log('Organizer lookup result:', organizer ? 'Found' : 'Not found');

        if (!organizer) {
            throw new Error("Organizer not found");
        }

        const eventData = {
            ...event,
            category: event.categoryId,
            department: event.departmentId,
            club: event.clubId,
            clubRole: event.clubRole,
            organizer: organizer._id
        };
        console.log('Event data to create:', eventData);

        const newEvent = await Event.create(eventData);
        console.log('Event created successfully:', newEvent);

        return JSON.parse(JSON.stringify(newEvent));

    } catch (error) {
        console.error('Error in createEvent:', error);
        console.error('Error type:', typeof error);
        console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

        // Don't call handleError here, let the calling function handle it
        throw error;
    }
  // Your logic to create an event
}

export const getEventById = async (eventId: string)=> {
    try {
        await connectToDatabase();

        const event= await populateEvent(Event.findById(eventId));

        if (!event){
            throw new Error("Event not found");
        }

        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        handleError(error);

    }
}

export const getAllEvents = async ({ query, limit = 6, page = 1, category, department }: GetAllEventsParams) => {
    try {
        await connectToDatabase();

        const conditions: FilterQuery<IEvent> = {};
        if (query) {
            conditions.title = { $regex: query, $options: 'i' };
        }
        if (category) {
            conditions.category = category;
        }
        if (department) {
            conditions.department = department;
        }

        const skipAmount = (Number(page) - 1) * limit;

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit);

        const events = await populateEvent(eventsQuery);
        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),
        };
    } catch (error) {
        handleError(error);
    }
}

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {

    try {
        await connectToDatabase();

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            throw new Error("Event not found");
        }

        revalidatePath(path);

        return JSON.parse(JSON.stringify(deletedEvent));

    } catch (error) {
        handleError(error);
    }
}



// GET EVENTS BY ORGANIZER
export async function getEventsByUser({ userId, limit = 6, page }: GetEventsByUserParams) {
  try {
    await connectToDatabase()

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new Error("User not found");
    }

    const conditions = { organizer: user._id }
    const skipAmount = (page - 1) * limit

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}


export async function getRelatedEventsByDepartment({
  departmentId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByDepartmentParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ department: departmentId }, { _id: { $ne: eventId } }] }

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

export const updateEvent = async ({ userId, event, path }: UpdateEventParams) => {
  try {
    await connectToDatabase();

    const eventToUpdate = await Event.findById(event._id);

    if (!eventToUpdate) {
      throw new Error("Event not found");
    }

    // Check if user is the organizer or an admin
    const user = await User.findOne({ clerkId: userId });
    const isOrganizer = eventToUpdate.organizer.toHexString() === user?._id.toHexString();
    const isAdmin = user?.role === 'management';

    if (!isOrganizer && !isAdmin) {
      throw new Error("Unauthorized");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      {
        ...event,
        category: event.categoryId,
        department: event.departmentId,
        club: event.clubId,
        clubRole: event.clubRole,
      },
      { new: true }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
}
