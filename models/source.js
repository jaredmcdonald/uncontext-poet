import mongoose from 'mongoose';

const schema = mongoose.Schema({
  text: { type: String, required: true },
  parsed: { type: [String], required : true },
  timestamp: { type: Date, default: Date.now }
});

const model = mongoose.model('Source', schema);

export default model;
