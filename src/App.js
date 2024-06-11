import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Product from './components/Product';
import Cart from './components/Cart';
import Single from './components/Single';

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then((res) => {
        return res.json();
  })
      .then((prod) => {
        setData(prod)
      })
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path = '/' element = {<Product data={data} />}/>
          <Route path = '/Cart' element = {<Cart/>}/>
          <Route path='/single/:id' element ={<Single/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
