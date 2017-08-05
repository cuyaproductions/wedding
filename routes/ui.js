import { Router } from 'express';
import homeController from '../controllers/homeController';
import rsvpController from '../controllers/rsvpController';

const router = Router();

// Home page
router.get('/', homeController.index);

// RSVP Form
router.get('/rsvp', rsvpController.form);

export default router;
