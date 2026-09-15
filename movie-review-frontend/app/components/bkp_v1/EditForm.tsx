'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { MovieReview } from '@/types/index'
import { useMovies } from '@/context/MovieContext';
import clearMovieCache, {updateReviewAction} from '../../actions';
import EditFormButtons from './EditFormButtons';

export default function EditForm({ movieReview: targetMovie }: { movieReview: MovieReview }) {
    const { session } = useAuth();
    const router = useRouter();
    const params = useParams();
    const movieId = Number.parseInt(params.id as string);
    
    // const { movieReviews, updateMovieReview } =  useMovies();
    // const targetMovie = movieReviews.find(r => r.id === movieId);
    const { updateMovieReview } =  useMovies();
    const [name, setName] = useState(targetMovie.movieName);
    const [review, setReview] = useState(targetMovie.review);
    const [rating, setRating] = useState(targetMovie.rating);
    
    // useEffect(() => {
    //     if (targetMovie) {
    //         setName(targetMovie.movieName);
    //         setReview(targetMovie.review);
    //         setRating(targetMovie.rating || 0);
    //     }
    // }, [targetMovie]);

    const handleSave = async (e) => {
        e.preventDefault();
        const updatedMovieReview: MovieReview = {
            id: movieId,
            movieName: name,
            review: review,
            rating: rating as any,
        };
        //updateMovieReview(updatedMovieReview)
        const response = await fetch(`http://localhost:5000/api/movies/${movieId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedMovieReview)
        });
        if(!response.ok) {
          //handle error
        }
        await clearMovieCache();
        router.refresh();
        router.push('/');
    };

    // 🛡️ Security Check: Redirect to login if not authenticated
    useEffect(() => {
        // We check if session is explicitly null after the app has hydrated
        if (session === null) {
            router.push('/login');
        }
    }, [session, router]);
    
    if (!session) {
        return <div style={{ padding: '20px' }}>Loading session...</div>;
    }

    if (!targetMovie) {
        return <div style={{ padding: '20px' }}>Movie review not found! 🎬</div>;
    }

    return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h2>Edit Review: {targetMovie.movieName}</h2>
      {/* <form onSubmit={handleSave} style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Movie Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '8px' }} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Review:</label>
          <textarea value={review} onChange={(e) => setReview(e.target.value)} style={{ width: '100%', padding: '8px' }} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block' }}>Rating:</label>
          <select value={rating} onChange={(e) => setRating(Number.parseInt(e.target.value))} style={{ padding: '8px' }}>
            {[0,1,2,3,4,5].map(num => <option key={num} value={num}>{num}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ padding: '10px 20px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save Changes</button>
          <button type="button" onClick={() => router.push('/')} style={{ padding: '10px 20px', background: '#95a5a6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
        </div>
      </form> */}
      <form action={updateReviewAction} className="flex flex-col gap-4">
        <input type="hidden" name="reviewId" value={targetMovie.id} />
        <input type="hidden" name="userId" value={targetMovie.userId} />
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Movie Name:</label>
          <input type="text" name="movieName" defaultValue={targetMovie.movieName} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Review:</label>
          <textarea name="review" defaultValue={targetMovie.review} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block' }}>Rating:</label>
          <input type="number" name="rating" min="1" max="5" defaultValue={targetMovie.rating} />
        </div>
        <EditFormButtons />
      </form>
    </div>
  );
}