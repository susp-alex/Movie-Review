import { MovieReview } from "@/types";

import EditButton from "./EditButton";
import DeleteFormLoader from "./DeleteFormLoader";

export default function MovieReviewDetails({ review }: { review: MovieReview }) {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>{review.movieName}</h3>
                <span style={{ fontWeight: 'bold', color: '#f39c12' }}>
                {'★'.repeat(review.rating || 0)}{'☆'.repeat(5 - (review.rating || 0))}
                </span>
            </div>
            <p style={{ marginTop: '10px', color: '#555' }}>{review.review}</p>
            
            <EditButton reviewId={review.id}/>
              
            <DeleteFormLoader reviewId={review.id}/>
        </>
    );
}