import { model, models, Schema, Types } from "mongoose";

export interface IEvent extends Document {
    _id: string;
  title: string;
  description: string;
  venue?: string;
  organizer: { _id: string; firstname: string, lastname:string }; // Ref to Admin
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  url?: string;
  category: { _id: string; name: string }; // Ref to Category
  status: string; // "pending", "approved", "rejected"
  isCR: boolean; // true if registrant is Class Representative
}

const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    venue: { type: String },
    organizer: { type: Schema.Types.ObjectId, ref:'user', required: true },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    url: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    status: { type: String, default: "pending", enum: ["pending", "approved", "rejected"] },
    isCR: { type: Boolean, default: false }
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
