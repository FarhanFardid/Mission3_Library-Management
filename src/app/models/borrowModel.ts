import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrowInterface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'Book ID is required for borrowing'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be an integer',
      },
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
  },
  {
    timestamps: true,
  }
);

borrowSchema.pre('save', function (next) {
  console.log(` Borrow record is being saved: Book=${this.book}, Quantity=${this.quantity}`);
  next();
});

borrowSchema.post('save', function (doc) {
  console.log(`Borrow record saved with ID: ${doc._id}`);
});

export const Borrow = model<IBorrow>('Borrow', borrowSchema);