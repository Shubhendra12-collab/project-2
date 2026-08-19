import mongoose from "mongoose";
import { PropertyPriceType, PropertyType } from "../types/enum.types";
interface TProperty {
  host: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  price_type: PropertyPriceType;
  address: {
    country: string;
    city: string;
    street_name: string;
    zipcode: string;
  };
  rooms: number;
  property_type: PropertyType;
}

const propertySchema = new mongoose.Schema<TProperty>(
  {
    // host:6a7bec43aa9b83c5a3686395
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      minLength: 5,
      maxLength: 50,
    },
    description: {
      type: String,
      trim: true,
    },
    price: { type: Number, required: true, min: 0 },
    price_type: {
      type: String,
      enum: Object.values(PropertyPriceType),
      default: PropertyPriceType.PER_DAY,
    },
    address: {
      type: {
        country: { type: String, required: true },
        city: { type: String, required: true },
        street_name: { type: String, required: true },
        zipcode: { type: String, required: true },
      },
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
      min: 1,
    },
    property_type: {
      type: String,
      required: true,
      enum: Object.values(PropertyType),
    },
  },
  { timestamps: true },
);

const Property = mongoose.model<TProperty>("property", propertySchema);
export default Property;