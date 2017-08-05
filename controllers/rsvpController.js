import mongoose from 'mongoose';
import '../models/Rsvp';

const Rsvp = mongoose.model('Rsvp');

function form(request, response) {
  response.render('rsvp', { ...request.content.rsvp, className: 'rsvp' });
}

async function createRsvp(request, response) {
  request.body.isComing = (request.body.isComing === 'yes');

  try {
    const rsvp = await (new Rsvp(request.body)).save();
    response.json({
      success: true,
      data: rsvp,
    });
  } catch(error) {
    response.json({
      success: false,
      error,
    });
  }
}

export default {
  form,
  createRsvp,
};