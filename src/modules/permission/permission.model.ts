import mongoose, { Schema } from 'mongoose';

const PermissionSchema = new Schema({
  resource: { type: String, required: true },
  action: { type: String, required: true }
});

PermissionSchema.index({ resource: 1, action: 1 }, { unique: true });

export const Permission = mongoose.model('Permission', PermissionSchema);