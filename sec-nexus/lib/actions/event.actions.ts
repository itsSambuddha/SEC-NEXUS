"use server"

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Category from "../database/models/category.model";
import {
    CreateEventParams,
    DeleteEventParams,
    GetAllEventsParams,
    GetEventsByUserParams,
    GetRelatedEventsByCategoryParams,
    UpdateEventParams,
    GetRelatedEventsByDepartmentParams,
    GetRelatedEventsByClubParams,
} from "../types";
import Department from "../database/models/department.model";
import Club from "../database/models/club.model";

import { QueryWithHelpers, HydratedDocument, Query } from 'mongoose';
import { IEvent } from "../database/models/event.model";

const populateEvent = async <T>(query: Query<T, HydratedDocument<IEvent>>): Promise<T | null> => {
    return query
        .populate({
            path: "organizer",
            model: User,
            select: "_id firstName lastName clerkId",
        })
        .populate({ path: "category", model: Category, select: "_id name" })
        .populate({
            path: "department",
            model: Department,
            select: "_id name",
        })
        .populate({ path: "club", model: Club, select: "_id name" });
};

export const createEvent = async ({
    event,
    userId,
    path,
}: CreateEventParams) => {
    try {
        await connectToDatabase();

        const organizer = await User.findOne({ clerkId: userId });

        if (!organizer) {
            throw new Error("Organizer not found");
        }

        const newEvent = await Event.create({
            ...event,
            category: event.categoryId,
            organizer: organizer._id,
        });

        revalidatePath(path);

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        handleError(error);
    }
};

export const getEventById = async (eventId: string) => {
    try {
        await connectToDatabase();

        const event = await populateEvent(Event.findById(eventId));

        if (!event) {
            throw new Error("Event not found");
        }

        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        handleError(error);
    }
};

export const getAllEvents = async ({
    query,
    limit = 6,
    page = 1,
    category,
    department,
    club,
}: GetAllEventsParams) => {
    try {
        await connectToDatabase();

        const titleCondition = query ? { title: { $regex: query, $options: "i" } } : {};
        
        let categoryCondition = {};
        if (category) {
            const categoryObject = await Category.findOne({ name: { $regex: category, $options: "i" } });
            if (categoryObject) {
                categoryCondition = { category: categoryObject._id };
            }
        }

        let departmentCondition = {};
        if (department) {
            const departmentObject = await Department.findOne({ name: { $regex: department, $options: "i" } });
            if (departmentObject) {
                departmentCondition = { department: departmentObject._id };
            }
        }

        let clubCondition = {};
        if (club) {
            const clubObject = await Club.findOne({ name: { $regex: club, $options: "i" } });
            if (clubObject) {
                clubCondition = { club: clubObject._id };
            }
        }

        const conditions = {
            $and: [
                titleCondition,
                categoryCondition,
                departmentCondition,
                clubCondition,
            ],
        };

        const skipAmount = (Number(page) - 1) * limit;

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: "desc" })
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
};

export async function updateEvent({ userId, event, path }: UpdateEventParams) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            throw new Error("User not found");
        }

        const eventToUpdate = await Event.findById(event._id);
        if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== user._id.toHexString()) {
            throw new Error("Unauthorized or event not found");
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            event._id,
            { ...event, category: event.categoryId },
            { new: true }
        );
        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedEvent));
    } catch (error) {
        handleError(error);
    }
}

export const deleteEvent = async ({ eventId, path }: DeleteEventParams): Promise<boolean> => {
    try {
        await connectToDatabase();

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (deletedEvent) {
            revalidatePath(path);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        handleError(error);
        return false;
    }
};

export async function getRelatedEventsByCategory({
    categoryId,
    eventId,
    limit = 3,
    page = 1,
}: GetRelatedEventsByCategoryParams) {
    try {
        await connectToDatabase();

        const skipAmount = (Number(page) - 1) * limit;
        const conditions = {
            $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
        };

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: "desc" })
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

export async function getEventsByUser({
    userId,
    limit = 6,
    page = 1,
}: GetEventsByUserParams) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            throw new Error("User not found");
        }

        const conditions = { organizer: user._id };
        const skipAmount = (page - 1) * limit;

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: "desc" })
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

export async function getRelatedEventsByDepartment({
    departmentId,
    eventId,
    limit = 3,
    page = 1,
}: GetRelatedEventsByDepartmentParams) {
    try {
        await connectToDatabase();

        const skipAmount = (Number(page) - 1) * limit;
        const conditions = {
            $and: [{ department: departmentId }, { _id: { $ne: eventId } }],
        };

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: "desc" })
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

export async function getRelatedEventsByClub({
    clubId,
    eventId,
    limit = 3,
    page = 1,
}: GetRelatedEventsByClubParams) {
    try {
        await connectToDatabase();

        const skipAmount = (Number(page) - 1) * limit;
        const conditions = {
            $and: [{ club: clubId }, { _id: { $ne: eventId } }],
        };

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: "desc" })
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