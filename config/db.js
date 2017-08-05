import mongoose from 'mongoose';

mongoose.connect(process.env.DB_URI, {useMongoClient: true});
mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.error(`⚠️ ⚠️ ⚠️ ⚠️  ↠  ${err.message}`);
});