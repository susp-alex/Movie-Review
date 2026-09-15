'use client';

import { MovieReview } from "@/types";
import { useState, createContext, useContext, useOptimistic } from "react";

type MoviesReviewsOptimistcContextType = {
    optimisticReviews: any;
    addReview: any;
    deleteReview: any;
    error: string;
    showError: (message: string) => void;
} | undefined;

type MoviesReviewsOptimistcProviderArgs = { 
    movieReviews: MovieReview[];
    children: React.ReactNode
};

const OptimisticMoviesReviewsContext = createContext<MoviesReviewsOptimistcContextType>(undefined);

const reducer = (state, action) => {
    switch(action.type) {
        case 'add':
            return [...state, action.payload];
        case 'delete':
            return state.filter(movieReview => movieReview.id !== action.payload);
        default:
            return state;
    }
}

export default function MoviesReviewsOptimistcProvider({ movieReviews, children }: MoviesReviewsOptimistcProviderArgs ) {
    const [error, setError] = useState('');
    const [optimisticReviews, dispatch] = useOptimistic(movieReviews, reducer);

    const addReview = (newReview) => {
        setError('');
        dispatch({type: 'add', payload: newReview});
    }

    const deleteReview = (reviewId) => {
        setError('');
        dispatch({type: 'delete', payload: reviewId})
    };

    const showError = (message: string) => {
        console.log('Will show error: ' + message)
        setError(message);
    }

    return(
        <OptimisticMoviesReviewsContext value={{optimisticReviews, addReview, deleteReview, error, showError}}>
            {children}
        </OptimisticMoviesReviewsContext>
    );

}

export function useOptimisticMoviesReviews() {
    const context = useContext(OptimisticMoviesReviewsContext);
    if(context === undefined) {
        throw new Error("useOptimisticMoviesReviews must be provided within an MoviesReviewsOptimistcProvider");
    }
    return context;
}