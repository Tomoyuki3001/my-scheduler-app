import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
    },
    bookedDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Booking = model("Booking", bookingSchema);
export default Booking;
