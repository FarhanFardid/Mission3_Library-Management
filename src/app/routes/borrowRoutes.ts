import express from 'express';
const { borrowBook,getBorrowSummary } = require('../controllers/borrowController');

const router = express.Router();

router.post('/', borrowBook);
router.get('/', getBorrowSummary); 

export default router;
