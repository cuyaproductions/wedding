import { Router } from 'express';
import adminController from '../controllers/adminController';

function adminRouterConfig(passport) {
  const router = Router();

  router.get('/login', adminController.loginPage);

  router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/admin', successRedirect: '/admin' }));

  router.get('/logout', adminController.logout); 
  
  router.get('*', adminController.isLoggedIn, adminController.dashboard);

  return router;
}

export default adminRouterConfig;
