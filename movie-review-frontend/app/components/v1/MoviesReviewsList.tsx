import { MovieReview } from "@/types";

import MovieReviewDetails from "./MovieReviewDetails";

export default function MoviesReviewsList({ movieReviews }: { movieReviews: MovieReview[]; }) {
  return (
      <main>
        <h2>Your Movie Reviews</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {movieReviews.map((review) => (
            <div key={review.id} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
              <MovieReviewDetails review={review}/>
            </div>
          ))}
        </div>
      </main>
  );
}