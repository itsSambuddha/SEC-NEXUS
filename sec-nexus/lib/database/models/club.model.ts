import { model, models, Schema } from "mongoose";

export interface IClub extends Document {
  _id: string;
  name: string;
  createdAt: Date;
}

const ClubSchema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Club = models.Club || model("Club", ClubSchema);

export default Club;
