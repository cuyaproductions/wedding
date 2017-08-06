import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const rsvpSchema = new mongoose.Schema({
  name: {
    type: String, 
    trim: true,
    required: 'Please provide your name',
  },

  date: {
    type: Date,
    required: true,
    default: Date.now
  },

  isComing: {
    type: Boolean,
    required: 'Please say if you are able to come'
  },

  otherGuests: {
    type: String,
    trim: true,
  },
  
  partySize: {
    type: Number,
    required: false,
  },

  foodRestrictions: {
    type: String,
    trim: true,
  },

  songRequest: {
    type: String,
    trim: true,
  },

  comments: {
    type: String,
    trim: true,
  },
});

mongoose.model('Rsvp', rsvpSchema);