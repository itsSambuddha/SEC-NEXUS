import { model, models, Schema } from "mongoose";

// TypeScript interface for type safety
export interface IDepartment extends Document {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const DepartmentSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add indexes for better query performance
DepartmentSchema.index({ name: 1 });

// Update the updatedAt field before saving
DepartmentSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Create the model (or reuse if it already exists)
const Department = models.Department || model("Department", DepartmentSchema);

export default Department;