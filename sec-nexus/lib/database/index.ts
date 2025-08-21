import mongoose from 'mongoose'
import { cache } from 'react';

const MONGODB_URI = process.env.MONGODB_URI;

// in this line we initialize a cache variable and we attempt to retrive a mongoose property from a global object 
// the (global as any) saves global variables
let cached = (global as any).mongoose || { conn: null, promise: null };

// we attempt to assign the mongoose property to the global object
export const connectToDatabase = async () => {
    // if the cached connection is already established, we return it
    if (cached.conn) return cached.conn;

    // Checks if MONGODB_URI is defined
    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is missing bro');
    }

    if (!cached.promise) {
        // if the cached promise is not defined, we create a new connection promise
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: 'SEC-NEXUS',
            bufferCommands: false
        });
    }

    cached.conn = await cached.promise;

    return cached.conn;
};

// Question -> Why do we want to use this pattern for caching database connections?
// Answer: This pattern helps to avoid multiple connections to the database by reusing the existing connection. It improves performance and resource utilization. Also because each invocation  of a serverless function could result in a new connection to the database therefore this pattern helps to mitigate the overhead of establishing new connections.