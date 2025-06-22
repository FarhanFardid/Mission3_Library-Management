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

const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      {
        $unwind: '$bookDetails',
      },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);

        const formattedSummary = summary.map((item) => ({
      book: item.book,
      totalQuantity: item.totalQuantity,
    }));

    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: formattedSummary,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve borrow summary',
      error: error.message,
    });
  }
};
module.exports=  { borrowBook,getBorrowSummary };
