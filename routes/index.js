import express from 'express';
import apiRouter from './api';
import uiRouter from './ui';
import findLanguage from '../middleware/international';

const router = express.Router();

// API routing
router.use('/api', apiRouter);

// UI routing
router.use('/:lang?', findLanguage);
router.use('/:lang', uiRouter);

export default router;
