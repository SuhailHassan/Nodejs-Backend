import mongoose, { Schema } from 'mongoose';

const SessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    refreshToken: String,
    expiresAt: { type: Date, index: true }
  },
  { timestamps: true }
);

// TTL index
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session = mongoose.model('Session', SessionSchema);