import { fetchSingleMovieReview, updateReviewAction } from '@/app/actions';

import EditForm from "./EditForm";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function EditFormLoader({ movieId }: {movieId: number}) {
    console.log("Fetching single movie review...");
    await delay(500);
    const movieReview = await fetchSingleMovieReview(movieId);
    return <EditForm movieReview={movieReview} submitUpdateAction={updateReviewAction}/>;
}