import mongoose, { Schema } from 'mongoose';

const RoleSchema = new Schema({
  name: { type: String, unique: true },
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }]
});

export const Role = mongoose.model('Role', RoleSchema);