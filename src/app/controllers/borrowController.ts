import { Request, Response } from 'express';
import { Borrow } from '../models/borrowModel';
import { Book } from '../models/bookModel';

const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    if (!book || !quantity || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Book, quantity, and dueDate are required',
      });
    }

    const targetBook = await Book.findById(book);
    if (!targetBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Check availability
    if (!targetBook.available || targetBook.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough copies available',
      });
    }

 
    await Book.updateCopiesAfterBorrow(book, quantity);

    // Create borrow record
    const borrowRecord = await Borrow.create({
      book,
      quantity,
      dueDate,
    });

    const { __v, ...borrowData } = borrowRecord.toObject();

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrowData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to borrow book',
      error: error.message,
    });
  }
};

module.exports=  { borrowBook };
