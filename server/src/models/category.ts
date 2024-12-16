import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  _id: string;
  name: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: false, unique: true },
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category