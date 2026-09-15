import sqlite3 from "sqlite3";

const dbName = 'reviews.db';
const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
        console.error('Not able to connect to the database');
    } else {
        console.log('Connected to databse...');
    }
});
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userName TEXT
        )`
    );
    db.run(`
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            movieName TEXT NOT NULL,
            review TEXT NOT NULL,
            rating CHECK(rating in (0, 1, 2, 3, 4, 5)),
            userId INTEGER NOT NULL REFERENCES users(id)
        )`
    );
    db.run('PRAGMA foreign_keys = ON;');
/*     db.run('INSERT INTO users (id, userName) VALUES (?, ?)', [1, 'Alex'], function (err) {
        if(err) {
            console.error('Failed to insert user Alex: ');
            console.error(err);
        }
    });
    db.run(`INSERT INTO reviews (movieName, review, rating, userId) 
                VALUES (?, ?, ?, ?), 
                       (?, ?, ?, ?)`, 
            [
                'Inception', 'My favorite movie!', 5, 1, 
                'Matrix', 'It blew my mind!', 4, 1
            ], 
            function (err) {
                if(err) {
                    console.error('Failed to seed initial reviews!');
                    console.error(err);
                }
    }); */
});

export { db };