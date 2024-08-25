import React from 'react'
import '../styles/ReviewCard.css'

function ReviewCard({review}) {
  return (
    <div className="review-card">
      <div className="review-header">
        <h3>{review.guestEmail}</h3>
        <div className="review-rating">
          {Array(review.rating).fill('★').join('')}
          {Array(5 - review.rating).fill('☆').join('')}
        </div>
      </div>
      <p className="review-comment">{review.comment}</p>
      <div className="review-date">
        <small>Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</small>
      </div>
    </div>
  )
}

export default ReviewCard
