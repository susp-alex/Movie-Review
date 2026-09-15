import LogoutButton from "./LogoutButton";
import AddForm from "./AddForm";
import EditButton from "./EditButton";
import DeleteSubmitButton from "./DeleteSubmitButton";
import MovieReviewDetails from "./MovieReviewDetails";

import { MovieReview } from "@/types";
import { addReviewAction, deleteReviewAction } from "@/app/actions";

export default function HomeDashboard({ movieReviews }: { movieReviews: MovieReview[]}) {

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Welcome 👋</h1>
        <LogoutButton />
      </header>

      <AddForm submitAction={addReviewAction} />

      {/* 🎬 Movie List Section */}
      <main>
        <h2>Your Movie Reviews</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {movieReviews.map((review) => (
            <div key={review.id} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
              <MovieReviewDetails review={review}/>
              
              <EditButton reviewId={review.id}/>
              
              <form action={deleteReviewAction}>
                  <input type="hidden" name="reviewId" value={review.id}/>
                  <DeleteSubmitButton />
              </form>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}