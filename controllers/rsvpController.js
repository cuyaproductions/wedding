import mongoose from 'mongoose';

const Rsvp = mongoose.model('Rsvp');

function form(request, response) {
  response.render('rsvp', { ...request.content.rsvp, className: 'rsvp' });
}

async function createRsvp(request, response) {
  const { confirmation } = request.content;
  request.body.isComing = (request.body.isComing === 'yes');
  let message;
  let title;

  try {
    const rsvp = await (new Rsvp(request.body)).save();
    const { isComing, name } = rsvp;
    const firstName = name.split(' ')[0];
    const { yes, no } = confirmation;

    message = `${isComing ? yes : no} ${firstName}${isComing ? '!' : '.'}`;
    title = confirmation.title;
  } catch(error) {
    console.error(error);
    message = confirmation.error;
    title = confirmation.titleError;
  }

  response.render('confirmation', { message, title, className: 'rsvp'});
}

export default {
  form,
  createRsvp,
};