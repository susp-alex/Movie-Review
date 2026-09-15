'use client';

import { useState, useEffect, useOptimistic } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
//import { useMovies } from '@/context/MovieContext';
import clearMovieCache, { addReviewAction, deleteReviewAction } from '../actions';
import AddForm from './AddForm';
import DeleteSubmitButton from './DeleteSubmitButton';
import { MovieReview } from '@/types';
import ListSkeleton from './ListSkeleton';

const ratings = [0, 1, 2, 3, 4, 5];

interface AddAction {
  type: 'add';
  payload: MovieReview; // 📦 Strictly a MovieReview object
}

interface DeleteAction {
  type: 'delete';
  payload: number; // 🆔 Strictly a number ID
}

type Action = AddAction | DeleteAction;

const reducer = (state: MovieReview[], action: Action) => {
  switch (action.type){
    case 'add':
      return [...state, action.payload];
    case 'delete':
      return state.filter(review => review.id !== action.payload)
  }
}

const addReview = (movieReview: MovieReview): AddAction => {
  return {type: 'add', payload: movieReview};
}

const deleteReview = (reviewId: number): DeleteAction => {
  return {type: 'delete', payload: reviewId};
}


export default function HomeDashboard({ movieReviews }: { movieReviews: MovieReview[]}) {
  const { session, logout } = useAuth();
  const router = useRouter();
  //const {movieReviews, addMovieReview, deleteMovieReview} = useMovies();
  console.log('HomeDashboard');
  console.log(movieReviews);
  const [optimisticReviews, dispatch] = useOptimistic(movieReviews, reducer);
  
  const submitAddReview = async (formData: FormData) => {
    const movieName = formData.get('movieName') as string;
    const review = formData.get('review') as string;
    const rating = Number(formData.get('rating') as string) as any;
    const userId = Number(formData.get('userId') as string);
    const movieReview = {id: Number(Date.now()), movieName, review, rating, userId}
    dispatch(addReview(movieReview));
    await addReviewAction(formData);
  }

  const [movieName, setMovieName] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (e) => {
    setRating(Number.parseInt(e.target.value));
  }

  const handleAddReview = async (e) => {
    e.preventDefault();
    const newReview = {
      movieName,
      review,
      rating,
      userId: session?.id
    }
    const response = await fetch('http://localhost:5000/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview),
    });
    if(!response.ok) {
      //handle error
    }
    setMovieName('');
    setReview('');
    setRating(0);
    await clearMovieCache();
    router.refresh();
  }

  const handleDeleteReview = async (id) => {
    const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if(!response.ok) {
      //handle error
    }
    await clearMovieCache();
    router.refresh();
  }

  // 🛡️ Security Check: Redirect to login if not authenticated
  useEffect(() => {
    // We check if session is explicitly null after the app has hydrated
    if (session === null) {
      router.push('/login');
    }
  }, [session, router]);
  
  // Prevent flashing content while redirecting
  if (!session) {
    return <div style={{ padding: '20px' }}>Loading session...</div>;
  }


  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Welcome, {session.userName}! 👋</h1>
        <button onClick={logout} style={{ padding: '8px 16px', cursor: 'pointer', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Logout
        </button>
      </header>

      {/* <form onSubmit={handleAddReview} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Add a New Review</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Movie Name:</label>
          <input 
            type="text" 
            value={movieName} 
            onChange={(e) => setMovieName(e.target.value)} 
            style={{ width: '100%', padding: '8px' }} 
            required 
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Review:</label>
          <textarea 
            value={review} 
            onChange={(e) => setReview(e.target.value)} 
            style={{ width: '100%', padding: '8px' }} 
            required 
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Rating (0-5):</label>
          <select
            id="rating-select"
            value={rating}
            onChange={handleRatingChange}
          >
            {ratings.map(rating => 
              <option key={rating} value={rating}>{rating}</option>
            )}
          </select>
        </div>

        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Add Review</button>
      </form> */}

      <AddForm userId={session.id.toString()} submitAction={submitAddReview} />

      {/* 🎬 Movie List Section */}
        <main>
          <h2>Your Movie Reviews</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            {/* {movieReviews.map((review) => ( */}
            {optimisticReviews.map((review) => (
              <div key={review.id} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3>{review.movieName}</h3>
                  <span style={{ fontWeight: 'bold', color: '#f39c12' }}>
                    {'★'.repeat(review.rating || 0)}{'☆'.repeat(5 - (review.rating || 0))}
                  </span>
                </div>
                <p style={{ marginTop: '10px', color: '#555' }}>{review.review}</p>
                
                {/* Edit Button */}
                  {/* <button 
                    onClick={() => editMovieReview(review.id)}
                    style={{
                      position: 'absolute',
                      right: '15px',
                      bottom: '45px',
                      padding: '5px 10px',
                      background: '#e74c3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button> */}

                  <button 
                      onClick={() => router.push(`/movies/${review.id}`)}
                      style={{ padding: '5px 10px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Edit
                  </button>

                {/* 🗑️ Delete Button */}
                  {/* <button 
                    onClick={() => handleDeleteReview(review.id)}
                    style={{
                      position: 'absolute',
                      right: '15px',
                      bottom: '15px',
                      padding: '5px 10px',
                      background: '#e74c3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button> */}
                  <form action={async (formData: FormData) => {
                    dispatch(deleteReview(review.id));
                    await deleteReviewAction(formData);
                  }}>
                      <input type="hidden" name="reviewId" value={review.id}/>
                      <DeleteSubmitButton />
                      {/* <button type="submit" style={{
                          position: 'absolute',
                          right: '15px',
                          bottom: '15px',
                          padding: '5px 10px',
                          background: '#e74c3c',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'}}>
                        Delete
                      </button> */}
                  </form>
              </div>
            ))}
          </div>
        </main>
    </div>
  );
}