
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import AllProducts from './pages/AllProducts';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import About from './pages/About';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='product/:id' element={<ProductPage />} />
        <Route path='products' element={<AllProducts />} />
        <Route path='wishlist' element={<Wishlist />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='order-confirmation' element={<OrderConfirmation />} />
        <Route path='about' element={<About />} />
        </Routes>
    </Router>
  );
}

export default App;
