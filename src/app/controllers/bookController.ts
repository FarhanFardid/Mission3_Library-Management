import { Request, Response } from 'express';
import { Book } from '../models/bookModel';

// Create a new book

const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, isbn, description, copies, available } = req.body;
    if (!title || !author || !genre || !isbn || copies === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing',
      });
    }

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: 'A book with this ISBN already exists',
      });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      isbn,
      description,
      copies,
      available,
    });

    const savedBook = await newBook.save();
    const { __v, ...bookData } = savedBook.toObject();
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: bookData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create book',
      error: error.message,
    });
  }
};

const getBooks = async (req: Request, res: Response) => {
  try {
    const filterGenre = req.query.filter as string | undefined;
    const sortBy = (req.query.sortBy as string) || 'createdAt';
    const sortOrder = (req.query.sort as string) === 'asc' ? 1 : -1;
    const limit = parseInt(req.query.limit as string) || 10000;

    const filter: any = {};
    if (filterGenre) {
      filter.genre = filterGenre.toUpperCase();
    }

    const books = await Book.find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(limit)
      .lean();


    const cleanBooks = books.map(({ __v, ...rest }) => rest);

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: cleanBooks,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch books',
      error: error.message,
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId).lean();

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    const { __v, ...bookData } = book;

    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: bookData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch book',
      error: error.message,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const updateData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,       
      runValidators: true 
    }).lean();

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    const { __v, ...bookData } = updatedBook;

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: bookData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update book',
      error: error.message,
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete book',
      error: error.message,
    });
  }
};



module.exports = {createBook,getBooks,getBookById,updateBook,deleteBook };