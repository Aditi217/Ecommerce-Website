import React from 'react'
import { Link } from 'react-router-dom'
import cartSlice, { addToCart } from '../features/cartSlice'
import { useDispatch } from 'react-redux'
import './style.css'
import { BsDisplay } from 'react-icons/bs';

export default function Product({ data }) {
    const dispatch = useDispatch();
     console.log(cartSlice)
    return (
        <>
            <div className="container">
                <div className="row">
                    {
                          data.map((allData) => (
                            <div className="col-3 mr-2 my-5" key={allData.id}>
                                <div className="card h-100 custom-card">
                                    <Link to={`/single/${allData.id}`}>
                                    <img src={allData.image} className="card-img-top w-75 " alt="..."/>
                                    </Link>
                                        <div className="card-body">
                                            <h5 className="card-title fw-bold">{allData.title}</h5>
                                            {/* <p className="card-text">{allData.description}</p> */}
                                            <p className="card-text">price: {allData.price}$</p>
                                            <p className="card-text">rating: {allData.rating?.rate}</p>
                                            <button type="button" className="btn btn-primary" onClick={()=>(dispatch(addToCart(allData)))}>Add to Cart</button>
                                        </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
