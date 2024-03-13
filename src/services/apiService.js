import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';

// Fetches a list of all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching products", error);
    }
};

// Fetches details for a single product by its ID
export const getProductDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product details", error); // Rethrow to allow caller to handle
    }
};

// Deletes a product by its ID
export const removeProduct = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error removing product", error); // Rethrow to allow caller to handle
    }
};

// Adds a new product to the database
export const addProduct = async (product) => {
    return axios.post(`${BASE_URL}/add`, JSON.stringify(product));
};

// Edits an existing product by ID
export const editProduct = (id, product) => {
    return axios.put(`${BASE_URL}/${product.id}`, JSON.stringify{product});
    // implement it using similar logic as addProduct function but use axios.put method
};