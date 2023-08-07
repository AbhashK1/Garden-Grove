import './Shop.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Snackbar from '../../Support/Snackbar/Snackbar';
import { SwishSpinner } from 'react-spinners-kit';

function Shop({ products, addToCart }) {
  const [snackbarQueue, setSnackbarQueue] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const images = document.querySelectorAll('img[data-testid="productCard_image"]');
    const promises = [];
    images.forEach((image) => {
      promises.push(
        new Promise((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () => reject();
        })
      );
    });

    Promise.all(promises)
      .then(() => {
        setImagesLoaded(true);
      })
      .catch((error) => {
        // Handle image loading error if needed
        setImagesLoaded(true); // Even if an error occurs, consider the images as "loaded" to show the product grid.
      });

    // Clean up the event listeners when component unmounts
    return () => {
      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbarQueue([...snackbarQueue, `${product.title} added to cart!`]);
  };

  const handleCloseSnackbar = () => {
    setSnackbarQueue((prevQueue) => prevQueue.slice(1));
  };

  return (
    <div class="shopsec3">
      <div class="sec3-text">
        <p>Fresh Picks: Just For You!
        </p>
      </div>

      {!imagesLoaded && <SwishSpinner/>}

      {imagesLoaded && (

      <div class="grid-container">
        {
          products.map(product => {
            var originalPrice = parseInt(product.oprice);
            var discountPrice = parseInt(product.dprice);
            var savings = ((originalPrice - discountPrice)/originalPrice)*100;
            return <div class="grid-item">
              <div class="sc-c5eaa547-0">
                <div class="fresnel-container fresnel-lessThan-lg ">
                  <div class="sc-e0e305e2-0">
                    <div class="sc-847ff752-0">
                      <span
                        style={{
                          boxSizing: 'border-box',
                          display: 'inline-block',
                          overflow: 'hidden',
                          width: '159px',
                          height: '159px',
                          background: 'none',
                          backgroundColor: '#faf3ef',
                          opacity: 1,
                          border: '0px',
                          margin: '0px',
                          padding: '0px',
                          position: 'relative',
                        }}><img
                          alt="" aria-label="" data-testid="productCard_image" src={product.url} decoding="async"
                          data-nimg="fixed" class="sc-847ff752-1 iPJfJT"
                          style={{
                            backgroundColor: '#faf3ef',
                            position: 'absolute',
                            inset: '0px',
                            boxSizing: 'border-box',
                            padding: '0px',
                            border: 'none',
                            margin: 'auto',
                            display: 'block',
                            width: '0px',
                            height: '0px',
                            minWidth: '100%',
                            maxWidth: '100%',
                            minHeight: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            objectPosition: 'center center',
                          }} />
                      </span>
                    </div>
                  </div>
                </div>
                <div class="sc-c5eaa547-1">Save {(Math.floor(savings))}%</div>
                <div class="sc-c5eaa547-2">₹{product.dprice}</div>
                <div class="sc-c5eaa547-3">₹{product.oprice} MRP</div>
                <div class="sc-c5eaa547-4">{product.title}</div>
                <div class="btn-add-cart"><button class="add-cart" onClick={() => handleAddToCart(product)}>Add To Cart</button></div>
              </div>
            </div>
          })
        }
      </div>
      )}
      <Link to="/cart">
      <div class="div-but25">
        <button class="button-25" role="button" onclick="window.location.href='cart/cart.html';">Proceed To Cart</button>
      </div>
      </Link>
      {snackbarQueue.map((message, index) => (
        <Snackbar key={index} message={message} onClose={handleCloseSnackbar} />
      ))}
    </div>
  );
}

export default Shop;
