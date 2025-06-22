import express from 'express';
const { borrowBook } = require('../controllers/borrowController');

const router = express.Router();

router.post('/', borrowBook);

export default router;
