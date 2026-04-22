import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, index: true },
    password: { type: String, required: true },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model('User', UserSchema);