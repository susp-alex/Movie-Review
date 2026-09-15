'use client';

import { useOptimisticMoviesReviews } from "./OptimisticMoviesReviewsContext";
import { addReviewAction } from "@/app/actions";
import AddForm from "./AddForm";

export default function AddFormLoader() {
    const { addReview, showError } = useOptimisticMoviesReviews();
    const handleSubmitAddAction = async (formData: FormData) => {
        const movieName = formData.get('movieName');
        const review = formData.get('review');
        const rating = Number(formData.get('rating'));
        const userId = Number(formData.get('userId'));
        addReview({id: Date.now(), movieName, review, rating, userId});
        try {
            await addReviewAction(formData);
        } catch {
            showError('Add failed!');
        }
    };
    return <AddForm submitAddAction={handleSubmitAddAction} />
}