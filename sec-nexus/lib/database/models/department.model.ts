import { model, models, Schema } from "mongoose";

// TypeScript interface for type safety
export interface IDepartment extends Document {
  _id: string;
  name: string;
}

// Define the schema
const DepartmentSchema = new Schema({
  name: { type: String, required: true },
});

// Create the model (or reuse if it already exists)
const Department = models.Department || model("Department", DepartmentSchema);

export default Department;
