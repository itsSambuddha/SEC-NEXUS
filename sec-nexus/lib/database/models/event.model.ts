import { model, models, Schema } from "mongoose";

export interface IEvent extends Document {
    _id: string;
  title: string;
  description?: string;
  venue?: string;
  organizer: Schema.Types.ObjectId; // Ref to User
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  url?: string;
  category: Schema.Types.ObjectId; // Ref to Category
  status: "pending" | "approved" | "rejected";
  department?: Schema.Types.ObjectId; // Ref to Department
  club?: Schema.Types.ObjectId; // Ref to Club
  clubRole?: string;
  isCR: "yes" | "no";
}

const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    venue: { type: String },
    organizer: { type: Schema.Types.ObjectId, ref:'User', required: true },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    url: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    club: { type: Schema.Types.ObjectId, ref: 'Club' },
    clubRole: { type: String },
    status: { type: String, default: "pending", enum: ["pending", "approved", "rejected"] },
    isCR: { type: String, enum: ["yes", "no"], default: "no" }
});



// Pre-validation: Either club or department is required
EventSchema.pre('validate', function(next) {
  if (!this.club && !this.department) {
    return next(new Error('Either club or department is required'));
  }
  // If club is present, clubRole is required
  if (this.club && !this.clubRole) {
    return next(new Error('clubRole is required when club is specified'));
  }
  // If department is present, isCR is required
  if (this.department && this.isCR === undefined) {
    return next(new Error('isCR is required when department is specified'));
  }
  next();
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
