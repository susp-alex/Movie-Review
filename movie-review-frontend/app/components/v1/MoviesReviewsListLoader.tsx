import MoviesReviewsList from './MoviesReviewsList';
import MoviesReviewsOptimisitcList from './MoviesReviewsOptimisitcList';

export default async function MoviesReviewsListLoader() {
    /* return <MoviesReviewsList movieReviews={reviews}/>; */
    return <MoviesReviewsOptimisitcList />;
}