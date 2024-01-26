import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/app.css';
import Categories from "@/Components/Caregories.jsx";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [categorieId, setCategorieId] = useState('');


    useEffect(() => {
        axios.get(`/api/products/${categorieId}`)
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, [categorieId]);

    const addToCart = (productId) => {
        const data = {
            product_id: productId,
            product_qty: quantity,
        };

        axios.post('/api/add-to-cart', data)
            .then(response => {
                if (response.data.status === 201) {
                    alert("Success");
                } else if (response.data.status === 409) {
                    alert('Warning');
                } else if (response.data.status === 401) {
                    alert('Error');
                }
            })
            .catch(error => console.error('Error adding to cart:', error));
    };

    const submitAddtocart = (productId) => {
        
        const data = {
            product_id: productId,
            product_qty: quantity,
        }

        axios.post(`/api/add-to-cart`, data).then(res=>{
            if(res.data.status === 201){
                alert("its added", res.data.message, "success");
            }else if(res.data.status === 409){
                alert("already exist", res.data.message, "already exist");
            }else if(res.data.status === 401){
                alert("Error", res.data.message, "error");
            }else if(res.data.status === 404){
                alert(res.data.message);
            }
        });

    }

    const cartItemCount = (sessionStorage.getItem('cart') && JSON.parse(sessionStorage.getItem('cart')).length) || 0;
    const [category, setCategory] = useState(null);
    return (
        <div>
            <Categories setCategorieId={setCategorieId} />
            <h1 className="text-3xl font-bold mb-4">Product List</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                {products.map(product => (
                    <li key={product.id} className="border p-4 rounded-md">
                        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <p className="flex font-bold">Price:
                            <p className="text-green-700 font-bold">&nbsp;${product.price}</p>
                        </p>
                        <img src={product.image} alt={product.title}
                             className="w-full h-40 bg-cover object-contain mb-2"/>
                        <button
                            onClick={(e) => {
                                e.preventDefault(); 
                                submitAddtocart(product.id);
                            }}
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
