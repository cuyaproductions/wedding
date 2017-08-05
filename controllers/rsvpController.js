import mongoose from 'mongoose';
import '../models/Rsvp';

const Rsvp = mongoose.model('Rsvp');

function form(request, response) {
  response.render('rsvp', { ...request.content.rsvp, className: 'rsvp' });
}

async function saveRsvp(request, response) {
  console.log(request.body);
  request.body.isComing = request.body.isComing === 'yes';
  const rsvp = await (new Rsvp(request.body)).save();
  // response.render('rsvp', { ...request.content.rsvp, className: 'rsvp' });
  response.send('Got it');
}

export default {
  form,
  saveRsvp,
};