export interface MovieReview {
    id: number;
    movieName: string;
    review : string;
    rating?: 0 | 1 | 2 | 3 | 4 | 5;
    userId?: number;
}

export interface User {
    id: number;
    userName: string;
}

export type Session = User | null;

export interface AuthContextType {
    session: Session;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export interface MovieContextType {
    movieReviews: MovieReview[];
    addMovieReview: (name: string, reviewText: string, ratingNum: number) => void;
    deleteMovieReview: (id: string | number) => void;
    updateMovieReview: (updatedReview: MovieReview) => void;
}

export const initialReviews: MovieReview[] = [
  { id: 1, movieName: "Inception", review: "My favorite movie!", rating: 5 },
  { id: 2, movieName: "Matrix", review: "It blew my mind!", rating: 4 },
];