import { model, models, Schema } from "mongoose";

export interface ICategory extends Document {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Add indexes for better query performance
CategorySchema.index({ name: 1 });

// Update the updatedAt field before saving
CategorySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;