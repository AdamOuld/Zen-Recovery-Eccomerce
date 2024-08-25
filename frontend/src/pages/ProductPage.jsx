import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';
import productAPI from '../api/productApi';
import reviewAPI from '../api/reviewApi';
import '../styles/ProductPage.css';
import { Button } from '@mui/material';
import { ButtonGroup, Rating } from '@mui/material';
import ReviewCard from '../components/ReviewCard';
import { Favorite } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [productRating, setProductRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [wishlist, setWishlist] = useState(false);
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await productAPI.getProductById(id);
      setProduct(response);
      const reviewResponse = await reviewAPI.getReviewsByProductId(id);
      setReviews(reviewResponse);
      setProductRating(calculateAverageRating(reviewResponse));
    };
    fetchProduct();
    if (wishlistItems.products.find((item) => item.id === parseInt(id))) {
      setWishlist(true);
    }
  }, [id]);

  const setIncrement = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const setDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onReviewSubmit = async (e) => {
    const reviewData = {
      guestEmail: email,
      comment: comment,
      rating: parseInt(rating),
      productId: id
    };
    const response = await reviewAPI.submitReview(reviewData);
    if (response.status === 201) {
      const reviewResponse = await reviewAPI.getReviewsByProductId(id);
      setReviews(reviewResponse);
      setProductRating(calculateAverageRating(reviewResponse));
      setEmail('');
      setComment('');
      setRating('');
    }
  };

  const handleAddToCart = (item, quantity) => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { item, quantity }
      });
      setQuantity(1);
  };

  const handleAddToWishlist = (product) => {
    dispatch({
      type: 'ADD_TO_WISHLIST',
      payload: product
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch({
      type: 'REMOVE_FROM_WISHLIST',
      payload: productId
    });
  };

  const handleWishlistClick = () => {
    if (wishlist) {
      handleRemoveFromWishlist(product.id);
      setWishlist(false);
    } else {
      handleAddToWishlist(product);
      setWishlist(true);
    }
  };

  return (
    <div className='product-page'>
      <NavBar />
      <h1>{product.name}</h1>
      <img
        className='product-img'
        src={`https://storage.cloud.google.com/zen-recovery-images/${product.picture}`}
        alt={product.name}
      />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <ButtonGroup size='small' aria-label='small outlined button group'>
        <Button onClick={setDecrement}>-</Button>
        <Button disabled>{quantity}</Button>
        <Button onClick={setIncrement}>+</Button>
      </ButtonGroup>
      <div className='product-rating'>
        <Rating name="half-rating-read" value={productRating} precision={0.5} readOnly />
        <p className='number-rating'>{productRating} ({reviews.length} reviews)</p>
      </div>
      <button className='add-to-cart-btn' onClick={() => handleAddToCart(product, quantity)}>Add to Cart</button>
      <Favorite
        className='favorite-icon'
        onClick={handleWishlistClick}
        sx={{ color: wishlist ? 'red' : 'black', cursor: 'pointer' }}
      />
      <h2>Leave a review!</h2>
      <form className='review-form'>
        <input
          placeholder='Email or Name'
          className='form-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder='Comment (Max 250 characters)'
          className='form-input'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input
          type='number'
          placeholder='Rating'
          className='form-input'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button type='submit' className='form-input' onClick={onReviewSubmit}>
          Submit
        </button>
      </form>
      <ul className='review-list'>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ul>
    </div>
  );
}

export default ProductPage;
