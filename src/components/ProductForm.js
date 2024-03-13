import React, { useState, useEffect } from 'react';
import { addProduct, editProduct, getProductDetails } from '../services/apiService';
import { useProductsContext } from '../context/ProductsContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  // Access route parameter
  const { productId } = useParams();
  const navigate = useNavigate();

  const { saveProduct } = useProductsContext();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const data = await getProductDetails(productId);
        setProduct(data);
        setError('');
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const apiCall = productId ? editProduct(productId, product) : addProduct(product);

    apiCall.then(response => {
      setLoading(false);
      saveProduct(response.data);
      // Navigate back
      navigate(-1);
    })
    .catch(error => {
      console.error("Error saving product:", error);
      setError('Failed to save product');
      setLoading(false);
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title:</label>
        <input type="text" className="form-control" id="title" name="title" value={product.title} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <textarea className="form-control" id="description" name="description" rows="3" value={product.description} onChange={handleChange} required></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price:</label>
        <input type="number" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label htmlFor="brand" className="form-label">Brand:</label>
        <input type="text" className="form-control" id="brand" name="brand" value={product.brand} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category:</label>
        <input type="text" className="form-control" id="category" name="category" value={product.category} onChange={handleChange} />
      </div>

      <button type="submit" className="btn btn-primary">Save Product</button>
    </form>
  );
};

export default ProductForm;
/*
This code does the following:
• Defines a ProductForm component that optionally gets the productId from URL parameters and a
callback function saveProduct from context.
• Uses useState to manage the form fields (as part of the product object) and loading/error states.
• On component mount, if a productId is provided, it fetches the product details from the API and
pre-populates the form fields, allowing for edit functionality.
• Handles form field changes to update the component’s state.
• On form submission, it determines whether to create a new product or update an existing one based
on the presence of productId and sends the appropriate request to the API.
• Calls the saveProduct callback function upon successful save, allowing parent components to react to
the save operation (e.g., refreshing the product list or navigating to a different view). Please check the
context to see how we defined the saveProduct function.
*/