import { Request, Response } from 'express'
import * as db from '../db'

export const add3Star = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: 'Missing required parameter: id' });
      return;
    }

    const sqlQuery = `
      UPDATE users
      SET "threeStarMovies" = CASE
        WHEN "threeStarMovies" IS NULL THEN ARRAY[$1::INTEGER]
        ELSE "threeStarMovies" || ARRAY[$1::INTEGER]
      END
    `;
    const result = await db.query(sqlQuery, [id]);
    console.log('Updated 3Star:', result);
  } catch (error) {
    console.error('Error adding 3-star movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const add4Star = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: 'Missing required parameter: id' });
      return;
    }

    const sqlQuery = `
      UPDATE users
      SET "fourStarMovies" = CASE
        WHEN "fourStarMovies" IS NULL THEN ARRAY[$1::INTEGER]
        ELSE "fourStarMovies" || ARRAY[$1::INTEGER]
      END
    `;
    const result = await db.query(sqlQuery, [id]);
    console.log('Updated 4Star:', result);
  } catch (error) {
    console.error('Error adding 4-star movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const add5Star = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: 'Missing required parameter: id' });
      return;
    }

    const sqlQuery = `
      UPDATE users
      SET "fiveStarMovies" = CASE
        WHEN "fiveStarMovies" IS NULL THEN ARRAY[$1::INTEGER]
        ELSE "fiveStarMovies" || ARRAY[$1::INTEGER]
      END
    `;
    const result = await db.query(sqlQuery, [id]);
    console.log('Updated 5Star:', result);
  } catch (error) {
    console.error('Error adding 5-star movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const get3Star = async (req: Request, res: Response): Promise<void> => {
  try {
    const sqlQuery = 'SELECT "threeStarMovies" FROM users';
    const result = await db.query(sqlQuery, [req.params.id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json({
      message: '3-star movies retrieved successfully',
      movies: result.rows[0].threeStarMovies
    });
  }
}

export const get4Star = async (req: Request, res: Response): Promise<void> => {
  try {
    const sqlQuery = 'SELECT "fourStarMovies" FROM users';
    const result = await db.query(sqlQuery, [req.params.id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json({
      message: '3-star movies retrieved successfully',
      movies: result.rows[0].threeStarMovies
    });
  }
}

export const get5Star = async (req: Request, res: Response): Promise<void> => {
  try {
    const sqlQuery = 'SELECT "fiveStarMovies" FROM users';
    const result = await db.query(sqlQuery, [req.params.id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json({
      message: '3-star movies retrieved successfully',
      movies: result.rows[0].threeStarMovies
    });
  }
}

export const addFavGenre = async (req: Request, res: Response): Promise<void> => {
  try {
    const { genre } = req.body;
    if (!genre) {
      res.status(400).json({ error: 'Missing required parameter: genre' });
      return;
    }
    const sqlQuery = 'UPDATE users SET genres = genres || $1';
    const result = await db.query(sqlQuery, [genre]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json({
      message: 'Favorite genre added successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding favorite genre:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const addFavDecade = async (req: Request, res: Response): Promise<void> => {
  try {
    const { decade } = req.body;
    if (!decade) {
      res.status(400).json({ error: 'Missing required parameter: decade' });
      return;
    }
    const sqlQuery = 'UPDATE users SET decades = decades || $1';
    const result = await db.query(sqlQuery, [decade]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json({
      message: 'Favorite decade added successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding favorite decade:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const getFavGenres = async (req: Request, res: Response): Promise<void> => {
  try {
    const sqlQuery = 'SELECT genres FROM users';
    const result = await db.query(sqlQuery, [req.params.id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json({
      message: 'Favorite genres retrieved successfully',
      genres: result.rows[0].genres
    });
  } catch (error) {
    console.error('Error retrieving favorite genres:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

  export const getFavDecades = async (req: Request, res: Response): Promise<void> => {
    try {
      const sqlQuery = 'SELECT decades FROM users';
      const result = await db.query(sqlQuery, [req.params.id]);
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(200).json({
        message: 'Favorite decades retrieved successfully',
        decades: result.rows[0].decades
      });
    } catch (error) {
      console.error('Error retrieving favorite decades:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    }
