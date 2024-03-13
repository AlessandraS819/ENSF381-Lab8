import React, { useState } from 'react';
import { removeProduct } from '../services/apiService';
import ConfirmModal from './ConfirmModal';

const DeleteButton = ({ productId, onProductDeleted }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      setLoading(true);
      console.log(`Deleting product with id: ${productId}`);
      const data = await removeProduct(productId);
      setLoading(false);
      console.log(data);
      if (onProductDeleted) {
        onProductDeleted(data);
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
      setError('Failed to delete product');
      setLoading(false);
    } finally {
      setShowConfirmModal(false); // Close modal after confirmation
    }
  };

  return (
    <>
      <button className="btn btn-danger" onClick={() => setShowConfirmModal(true)} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete Product'}
      </button>
      {error && <p>{error}</p>}
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
      >
        Are you sure you want to delete this product?
      </ConfirmModal>
    </>
  );
};

export default DeleteButton;

/*
This code does the following:
• Defines a DeleteButton component that takes a productId and an onProductDeleted callback as
props.
• Uses useState to manage the loading and error states.
• Defines a handleDelete function that shows a confirmation dialog to the user. If the user confirms, it
sends a delete request to the API.
• On successful deletion, it calls the onProductDeleted callback, passing the productId so the parent
component can react accordingly (e.g., by removing the product from the state, thus updating the UI).
• Displays a loading state in the button text while the delete operation is in progress and shows any
error message if the operation fails
*/