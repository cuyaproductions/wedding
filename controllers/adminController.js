import mongoose from 'mongoose';
import { getAll } from '../models/Rsvp';

const Rsvp = mongoose.model('Rsvp');

function loginPage(request, response) {
  response.render('login', { className: 'login' });
}


function login(request, response) {
  response.redirect('/admin/dashboard');
}

async function dashboard(request, response, next) {
  const rsvps = await getAll();
  console.log(rsvps);
  response.render('adminDashboard', { rsvps, className: 'dashboard' });
}

function logout(request, response) {
  request.logout();
  response.redirect('/admin');
}

export default {
  loginPage,
  login,
  dashboard,
  logout,
};