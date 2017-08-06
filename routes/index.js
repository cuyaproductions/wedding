import express from 'express';
import uiRouter from './ui';
import findLanguage from '../middleware/international';

const router = express.Router();

// UI routing
router.use('/:lang?', findLanguage);
router.use('/:lang', uiRouter);

export default router;
