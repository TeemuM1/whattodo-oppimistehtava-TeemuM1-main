import { Request, Response } from 'express';
import Category from '../models/category';

//Hae kaikki kategoriat
export const getCategories = async (req: Request, res: Response) => {
  try {
      const categories = await Category.find(); //Haetaan kategoriat tietokannasta
      res.json(categories.map(category => ({
          _id: category._id.toString(), // Muutetaan kategorian ObjectID merkkijonoksi
          name: category.name
      })));
  } catch (error) {
      res.status(500).json({ message: 'Error fetching categories', error });
  }
};


export const createCategory = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name } = req.body;

    // Tarkista, onko nimi annettu
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Tarkista, onko kategoria jo olemassa
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    // Luo uusi kategoria
    const newCategory = new Category({ name });
    await newCategory.save();

    return res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create category' });
  }
};