import React from 'react'
import NavBar from '../components/NavBar'
import ProductCollection from '../components/ProductCollection'
import '../styles/Home.css'
import homeFirstImg from '../assets/home-first-img.jpg'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import emailAPI from '../api/emailApi'

function Home() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleShopNow = () => {
    navigate('/products')
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handleEmailSend = () => {

    emailAPI.subscribe(email)
    setEmail('')

  }


  return (
    <div className='home-page homepage-fade-in'>
        <NavBar />
        <div className="home-first">
          <div className="home-first-text">
            <h1>Find your zen.</h1>
            <p>Products that help you relax.</p>
            <button onClick={handleShopNow}>Shop Now</button>
          </div>
          <div className="home-first-image">
            <img src= {homeFirstImg} alt=''/>
          </div>  
        </div>
        <div className="home-second">
          <h1>Why shop with us?</h1>
          <div className="home-second-cards">
            <div className="home-second-card">
              <h2>Quality Products</h2>
              <p>Our products are made with the highest quality materials.</p>
            </div>
            <div className="home-second-card">
              <h2>Free Shipping</h2>
              <p>Free shipping on all orders over $50.</p>
            </div>
            <div className="home-second-card">
              <h2>Easy Returns</h2>
              <p>Not satisfied with your purchase? Return it within 30 days.</p>
            </div>
          </div>
        </div>
      <ProductCollection categoryId='2'/>
      <div className='home-footer'>
        <h1>Subscribe to our newsletter</h1>
        <p>Get the latest news and offers.</p>
        <form>
          <input type='text' placeholder='Enter your email address' onChange={handleEmailChange}/>
          <button onClick={handleEmailSend}>Subscribe</button>
        </form>
        <p className='rights'> ©2024, Zen Recovery</p>
      </div>
    </div>
  )
}

export default Home
