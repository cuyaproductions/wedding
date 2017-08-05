import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const rsvpSchema = new mongoose.Schema({
  name: {
    type: String, 
    trim: true,
    required: 'Please provide your name',
  },

  isComing: {
    type: Boolean,
    required: 'Please say if you are able to come'
  },

  partySize: {
    type: Number,
    required: function () {
      return this.isComing ? 'Please say how many people will be joining you' : false;
    },
    min: 1,
    max: 5,
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