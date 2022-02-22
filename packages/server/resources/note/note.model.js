const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    body: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    }
    // createdBy: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: 'user',
    //   required: true
    // }
  },
  { timestamps: true }
)

module.exports = mongoose.model('note', noteSchema)
