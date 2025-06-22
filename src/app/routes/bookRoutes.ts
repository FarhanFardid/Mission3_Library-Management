import express from 'express';
const { createBook } = require('../controllers/bookController');

const router = express.Router();

router.post('/', createBook);

export default router;
