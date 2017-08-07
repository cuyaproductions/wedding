import { Router } from 'express';
import adminController from '../controllers/adminController';

function isLoggedIn (request, response, next) {
  if (request.isAuthenticated()) {
    next();
    return;
  }

  response.redirect('/admin/login');
}

function adminRouterConfig(passport) {
  const router = Router();

  router.get(['/', '/login'], adminController.loginPage);
  
  router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/admin/login' }), 
    adminController.login);

  router.get('/logout', adminController.logout); 
  
  router.get('/dashboard', isLoggedIn, adminController.dashboard);

  return router;
}

export default adminRouterConfig;
