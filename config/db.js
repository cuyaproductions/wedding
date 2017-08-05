import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/wedding', {useMongoClient: true});
mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});