'use client';

import {useState, useEffect, createContext, useContext} from 'react';
import { MovieReview, MovieContextType } from '@/types';


const MovieContext = createContext<MovieContextType | undefined>(undefined);

/* const initialReviews: MovieReview[] = [
  { id: 1, movieName: "Inception", review: "My favorite movie!", rating: 5 },
  { id: 2, movieName: "Matrix", review: "It blew my mind!", rating: 4 },
]; */

export interface MovieProviderProps {
    children: React.ReactNode;
    initialReviews: MovieReview[];
}

export function MovieProvider({ children, initialReviews }: MovieProviderProps){
    const [movieReviews, setMovieReviews] = useState<MovieReview[]>(initialReviews);
    
    const addMovieReview = (name: string, reviewText: string, ratingNum: number) => {
        const newMovie: MovieReview = {
        id: Date.now(), // Safer unique ID across pages than array length
        movieName: name,
        review: reviewText,
        rating: ratingNum as any,
        };
        setMovieReviews((curr) => [...curr, newMovie]);
    };

    const deleteMovieReview = (idToDelete: string | number) => {
        setMovieReviews((curr) => curr.filter((r) => r.id !== idToDelete));
    };

    const updateMovieReview = (updatedReview: MovieReview) => {
        setMovieReviews((curr) =>
            curr.map((r) => (r.id === updatedReview.id ? updatedReview : r))
        );
    };

    useEffect(() => setMovieReviews(initialReviews), [initialReviews]);

    return (
        <MovieContext value={{ movieReviews, addMovieReview, deleteMovieReview, updateMovieReview }}>
            {children}
        </MovieContext>
    );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (!context) throw new Error('useMovies must be used within a MovieProvider');
  return context;
}

