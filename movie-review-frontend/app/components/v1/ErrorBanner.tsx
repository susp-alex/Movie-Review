'use client';

import { useOptimisticMoviesReviews } from "./OptimisticMoviesReviewsContext";

export default function ErrorBanner() {
    const { error } = useOptimisticMoviesReviews();

    return error && <h2>{error}</h2>
}