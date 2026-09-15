
export interface MovieReview {
    id: number;
    movieName: string;
    review : string;
    rating?: 0 | 1 | 2 | 3 | 4 | 5;
    userId: number;
}

export interface User {
    id: number;
    userName: string;
}

export type CreateReviewInput = Omit<MovieReview, 'id'>;

export type UpdateReviewInput = Partial<MovieReview>;