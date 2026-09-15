'use client';

import { useOptimisticMoviesReviews } from "./OptimisticMoviesReviewsContext";
import { deleteReviewAction } from "@/app/actions";

import DeleteForm from './DeleteForm';

export default function DeleteFormLoader({ reviewId }: { reviewId: number }) {
    const { deleteReview, showError } = useOptimisticMoviesReviews();
    const handleSubmitDelete = async (formData: FormData) => {
        deleteReview(reviewId);
        try {
            await deleteReviewAction(formData);
        } catch {
            showError('Delete failed!');
        }
    };
    return <DeleteForm reviewId={reviewId} submitDeleteAction={handleSubmitDelete} />
}