import mongoose, { Schema } from 'mongoose'

const TweetSchema = new Schema({
  text: {
    type: String,
    minlength: [5, 'Текст не достаточно длиный'],
    maxlength: [144, 'Текст очень длиный']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

export default mongoose.model('Tweet', TweetSchema)
