import { Router } from 'express';
import rsvpController from '../controllers/rsvpController';

const router = Router();

router.post('/rsvp/create', rsvpController.createRsvp);

export default router;