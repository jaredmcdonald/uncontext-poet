module.exports = function (mongoose) {
  var schema = mongoose.Schema({
    text: { type: String, required: true },
    parsed: { type: [String], required : true },
    timestamp: { type: Date, default: Date.now }
  });

  return mongoose.model('Source', schema);
};
