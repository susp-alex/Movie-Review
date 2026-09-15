import { MovieReview } from '@/types/'

import EditFormButtons from './EditFormButtons';


export default function EditForm({ movieReview, submitUpdateAction }: { movieReview: MovieReview | undefined; submitUpdateAction: (formData: FormData) => Promise<void> }) {
    if(!movieReview) {
        return <div className="p-5">Movie review not found! 🎬</div>;
    }

    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
        <h2>Edit Review: {movieReview.movieName}</h2>
        <form action={submitUpdateAction} className="flex flex-col gap-4">
          <input type="hidden" name="reviewId" value={movieReview.id} />
          <input type="hidden" name="userId" value={movieReview.userId} />
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block' }}>Movie Name:</label>
            <input type="text" name="movieName" defaultValue={movieReview.movieName} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block' }}>Review:</label>
            <textarea name="review" defaultValue={movieReview.review} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block' }}>Rating:</label>
            <input type="number" name="rating" min="1" max="5" defaultValue={movieReview.rating} />
          </div>
          <EditFormButtons />
        </form>
      </div>
  );
}