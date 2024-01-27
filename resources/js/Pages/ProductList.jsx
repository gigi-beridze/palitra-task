import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/app.css';
import Categories from "@/Components/Caregories.jsx";

const ProductList = () => {
    const [products, setProducts] = useState([]),
          [quantity, setQuantity] = useState(1),
          [categorieId, setCategorieId] = useState(''),
          initialCartCount = parseInt(localStorage.getItem('cartCount')) || 0,
          [cartCount, setCartCount] = useState(initialCartCount);


    useEffect(() => {
        axios.get(`/api/products/${categorieId}`)
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, [categorieId]);
    useEffect(() => {
        localStorage.setItem('cartCount', cartCount.toString());
    }, [cartCount]);
    
    const submitAddtocart = (productId) => {
        const data = {
            product_id: productId,
            product_qty: quantity,
        }

        axios.post(`/api/add-to-cart`, data).then(res=>{
            if(res.data.status === 201){
                alert("added", res.data.message, "success");
    
                const newCartCount = cartCount + 1;
                setCartCount(newCartCount);
                localStorage.setItem('cartCount', newCartCount.toString());
            }else if(res.data.status === 409){
                alert("already exist", res.data.message, "already exist");
            }else if(res.data.status === 401){
                alert("Error", res.data.message, "error");
            }else if(res.data.status === 404){cartCount
                alert(res.data.message);
            }
        });
    }

    const handleCategoryChange = async (categoryId) => {
        const response = await axios.get(`/api/products/${categoryId}`);
        setProducts(response.data);
      };
    

    return (
        <div>
            <a href="/cart">
                <button href="/cart" className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                        <path d="M10 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM20 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM3 2a1 1 0 0 0 0 2h1.77l1.74 8.71a1 1 0 0 0 .97.79h10.88a1 1 0 0 0 .97-.79L19.23 4H21a1 1 0 0 0 0-2H3zm16.46 8H6.29L5.36 4H18.64l-1.93 6zM11 20a1 1 0 0 1-1-1h2a1 1 0 0 1-1 1z"/>
                    </svg>
                    <span className="text-lg font-semibold mb-2">{cartCount}</span>
                </button>   
            </a>
            <Categories setCategorieId={handleCategoryChange} />
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
