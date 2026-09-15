import { fetchAllMovieReviews } from "@/app/actions";

import AddFormLoader from "./AddFormLoader";
import MoviesReviewsListLoader from './MoviesReviewsListLoader';
import MoviesReviewsOptimistcProvider from './OptimisticMoviesReviewsContext';
import ErrorBanner from './ErrorBanner';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function HomeDashboardLoader() {
    console.log("Fetching all movies reviews...");
    await delay(500);
    const movieReviews = await fetchAllMovieReviews();

    return (
          <MoviesReviewsOptimistcProvider movieReviews={movieReviews}>
            <AddFormLoader />
            <ErrorBanner />
            <MoviesReviewsListLoader /> 
          </MoviesReviewsOptimistcProvider>
    );
}