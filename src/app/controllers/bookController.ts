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

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: savedBook,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create book',
      error: error.message,
    });
  }
};

module.exports = {createBook };