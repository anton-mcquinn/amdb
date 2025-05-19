import { Request, Response } from 'express'
import * as db from '../db'

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { genre, decade } = req.query
    let sqlQuery = 'SELECT * FROM movies'
    const params: any[] = []
    const conditions: string[] = []

    if (genre) {
      conditions.push(`$${params.length+1} = ANY(genres)`)
      params.push(genre)
    }

    if (decade) {
      const decadeString = decade as string
      const startYear = parseInt(decadeString.replace('s', ''), 10)
      const endYear = startYear + 9

      conditions.push(`year BETWEEN $${params.length+1} AND $${params.length+2}`)
      params.push(startYear, endYear)
    }

    if (conditions.length > 0) {
      sqlQuery += ' WHERE ' + conditions.join(' AND ')
    }

    sqlQuery += ' ORDER BY title ASC'

    const result = await db.query(sqlQuery, params)
    res.status(200).json(result.rows)
    } catch (error) {
    console.error('Error fetching movies:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const addLike = async (req: Request, res: Response): Promise<void> => {
  console.log('Adding like to movie:', req.body)
  try {
    const { id, rating } = req.body;

    if (!id || rating === undefined) {
      res.status(400).json({ error: 'Missing required parameters: id and rating' });
      return;
    }
    const sqlQuery = 'UPDATE movies SET likes = $1 WHERE id = $2 RETURNING *';
    const result = await db.query(sqlQuery, [rating, id]);
    console.log('Result:', result);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }
    res.status(200).json({
      message: 'Rating updated successfully',
      movie: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
