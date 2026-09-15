import { db } from './db.js';
import express from 'express';
import cors from 'cors';
import type { CreateReviewInput, MovieReview, UpdateReviewInput } from './types.js';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json())

app.get('/api/movies', (req, res) => {
    db.all('SELECT * FROM reviews', [], (err, rows) => {
        if(err) {
            return res.status(500).json({error: 'Database query to find all movies failed'});
        }
        res.json(rows);
    });
});

app.get('/api/movies/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM reviews WHERE id = ?', [id], (err, row) => {
        if(err) {
            return res.status(500).json({error: `Database query to find movie id: ${id} failed`});
        }
        if(!row) {
            return res.status(404).json({message: `Movie with id ${id} not found!`});
        }
        res.json(row);
    });
});

app.post('/api/movies', (req, res) => {
    const {movieName, review, rating, userId} = req.body as CreateReviewInput;
    db.run('INSERT INTO reviews (movieName, review, rating, userId) VALUES(?, ?, ?, ?)', [movieName, review, rating, userId], 
        function(err) {
            if(err) {
                return res.status(500).json({error: 'Failed to insert the new movie!'});
            }
            res.status(201).json({
                id: this.lastID,
                movieName,
                review,
                rating,
                userId,
            });
        }
    );
});

app.put('/api/movies/:id', (req, res) => {
    const { id } = req.params;
    const { movieName, review, rating } = req.body as UpdateReviewInput;
    let columnsToUpdate = '';
    const updateParameters = [];
    if(movieName) {
        columnsToUpdate += 'movieName = ?';
        updateParameters.push(movieName)
    }
    if(review) {
        if(columnsToUpdate.length > 0){
            columnsToUpdate += ', '
        }
        columnsToUpdate += 'review = ?';
        updateParameters.push(review)
    }
    if(rating) {
        if(columnsToUpdate.length > 0){
            columnsToUpdate += ', '
        }
        columnsToUpdate += 'rating = ?';
        updateParameters.push(rating);
    }
    if(columnsToUpdate.length > 0) {
        updateParameters.push(id);
        db.run(`UPDATE reviews SET ${columnsToUpdate} WHERE id = ?`, updateParameters,
            function (err) {
                if(err) {
                    return res.status(500).json({error: `Failed to update movie with id ${id}`});
                }
                if(!this.changes) {
                    return res.status(404).json({error: `Movie with id ${id} not found`});
                }
                res.json({...req.body});
        });
    } else {
        res.json({message: "Nothing was passed to update!"});
    }
});

app.delete('/api/movies/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM reviews WHERE id = ?', [id], function (err) {
        if(err) {
            return res.status(500).json({error: `Failed to delete movie with id ${id}`});
        }
        if(!this.changes) {
            return res.status(404).json({error: `Movie with id ${id} not found`});
        }
        res.json({ id });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});