import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton'; 
import { getProductDetails } from '../services/apiService';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  // Access route parameter
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const data = await getProductDetails(productId);
        setProduct(data);
        setError('');
      } catch (error) {
        setError('Failed to fetch product details.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  // Function to handle after delete
  const onProductDeleted = async (product) => {
    navigate(-1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 d-flex justify-content-center align-items-start">
          <img src={product.thumbnail} alt={product.title} className="img-fluid" />
        </div>
        <div className="col-md-8">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <ul className="list-unstyled">
            <li>Price: ${product.price}</li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
          </ul>
          <button className="btn btn-primary me-2" onClick={() => navigate(`/product/edit/${product.id}`)}>Edit Product</button>
          <DeleteButton productId={product.id} onProductDeleted={onProductDeleted} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
/*
This code does the following:
• It defines a ProductDetails component that takes the productId from the URL parameters.
• It uses useState to manage the product’s details, loading state, and any potential error message.
• It uses useEffect to make an HTTP request to the DummyJSON API to fetch the details of a product
when the component mounts or the productId changes.
19
• It renders the product’s details, including the title, description, thumbnail, price, category, and brand.
If the product is loading, it displays a loading message. If there’s an error, it displays an error message.
• It consumes DeleteButton component and pass the onProductDeleted as a call back function
*/