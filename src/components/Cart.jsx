import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';

export default function Cart() {
  const items = useSelector((state) => state.allCart.cart);
  const [cartItems, setCartItems] = useState(
    items.map((item) => ({ ...item, quantity: 1 }))
  );

  const handleIncrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - {cartItems.length} items</h5>
              </div>
              <div className="card-body">
                {cartItems.map((item) => (
                  <div className="row my-3 border p-5" key={item.id}>
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                        <img src={item.image} className="w-100" alt="Product" />
                        <a href="#!">
                          <div className="mask" style={{ background: 'rgba(251, 251, 251, 0.2)' }}></div>
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-5 col-md-6 mb-lg-0">
                      <p><strong>{item.title}</strong></p>
                      <p>{item.description}</p>
                      <p>Size: M</p>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                        <button className="btn btn-primary px-3 me-2" 
                        onClick={() => {
                            const newItemQuantity = item.quantity - 1;
                            if (newItemQuantity <= 0) {
                              handleRemove(item.id);
                            } else {
                              handleDecrement(item.id);
                            }
                          }}>
                          <IoMdRemoveCircleOutline />
                        </button>

                        <div className="form-outline">
                          <input id={item.id} min="0" name="quantity" type="number" className="form-control" value={item.quantity} readOnly />
                          <label className="form-label" htmlFor={item.id}>Quantity</label>
                        </div>

                        <button className="btn btn-primary px-3 ms-2" onClick={() => handleIncrement(item.id)}>
                          <IoMdAddCircleOutline />
                        </button>
                      </div>

                      <p className="text-start text-md-center">
                        <strong>{(item.price * item.quantity).toFixed(2)} $</strong>
                      </p>
                    </div>
                  </div>
                ))}
                <hr className="my-4" />
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <p><strong>Expected shipping delivery</strong></p>
                <p className="mb-0">12.10.2020 - 14.10.2020</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>${calculateTotalPrice()}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Gratis</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span><strong>${calculateTotalPrice()}</strong></span>
                  </li>
                </ul>

                <button type="button" className="btn btn-primary btn-lg btn-block">
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
