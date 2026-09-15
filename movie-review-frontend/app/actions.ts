'use server'

import { MovieReview } from '@/types';
import { updateTag, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function clearMovieCache() {
    //updateTag('movies-list');
    revalidateTag('movies-list', 'max')
}

export async function fetchAllMovieReviews() {
  const movieReviews = 'http://localhost:5000/api/movies';
  const cacheName = {next: {tags: ['movies-list']}};
  const response = await fetch(movieReviews, cacheName);
  if(!response.ok) {
    //handle error
  }
  return response.json();
}

export async function fetchSingleMovieReview(id: number): Promise<MovieReview | undefined> {
  const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
    cache: 'no-cache'
  });
  if(!response.ok) {
    //handle error
  }
  return response.json();
  //return initialReviews.find(review => review.id === id);
}

export async function addReviewAction(formData: FormData) {
    await delay(500);
    const movieName = formData.get('movieName');
    const review = formData.get('review');
    const rating = Number(formData.get('rating'));
    const userId = Number(formData.get('userId'));

    const response = await fetch('http://localhost:5000/api/movies', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({movieName, review, rating, userId}),
    });
    if(!response.ok) {
         throw new Error('Add failed');
    }
    updateTag('movies-list');
}

export async function deleteReviewAction(formData: FormData) {
    await delay(500);
    const reviewId = formData.get('reviewId') as string;

    const response = await fetch(`http://localhost:5000/api/movies/${reviewId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    });
    if(!response.ok) {
        throw new Error('Delete failed');
    }
    updateTag('movies-list');
}

export async function updateReviewAction(formData: FormData){
    console.log('updateReviewAction');
    const reviewId = formData.get("reviewId") as string;
    const movieName = formData.get("movieName");
    const review = formData.get("review");
    const rating = Number(formData.get("rating"));
    
    const updatedReview: Partial<MovieReview> = {};
    if(movieName){
        updatedReview.movieName = movieName as string;
    }
    if(review){
        updatedReview.review = review as string;
    }
    if(rating){
        updatedReview.rating = rating as any;
    }
    const response = await fetch(`http://localhost:5000/api/movies/${reviewId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedReview),
    });
    if(!response.ok) {
        //handle error
    }
    updateTag('movies-list');
    redirect('/movies');
}