import mongoose from 'mongoose';
import moment from 'moment';
import { getAll } from '../models/Rsvp';

const Rsvp = mongoose.model('Rsvp');

function loginPage(request, response) {
  response.render('login', { className: 'login' });
}

async function dashboard(request, response, next) {
  const rsvps = await getAll();
  response.render('adminDashboard', { rsvps, className: 'dashboard' });
}

function logout(request, response) {
  request.logout();
  response.redirect('/admin');
}

function isLoggedIn (request, response, next) {
  if (request.isAuthenticated()) {
    next();
    return;
  }

  response.redirect('/admin/login');
}
export default {
  loginPage,
  dashboard,
  logout,
  isLoggedIn,
};