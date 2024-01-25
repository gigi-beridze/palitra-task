import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/app.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (<div>
            <h1 className="text-3xl font-bold mb-4">Product List</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                    <li key={product.id} className="border p-4 rounded-md">
                        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <p className="text-green-700 font-bold">Price: ${product.price}</p>
                        <img src={product.image} alt={product.title} className="w-full h-32 object-cover mb-2"/>
                        <button
                            onClick={() => addToCart(product.id)}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Add to Cart
                        </button>
                    </li>
                ))}
            </ul>
     </div>
    );
}

export default ProductList;
