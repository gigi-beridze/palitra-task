import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "@inertiajs/react";

const Cart = () => {
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const totalItems = cart.length;

    localStorage.setItem('cartCount', totalItems);

    const cartCount = localStorage.getItem('cartCount')

    const totalAmount = cart.reduce((total, product) => {
        const price = parseFloat(product.product.price);
        const quantity = parseInt(product.product_qty);
        return total + (price * quantity);
    }, 0);          

    useEffect(() => {    
        axios.get('/api/cart')
            .then(response => setCart(response.data.cart))
            .catch(error => console.error('Error fetching products:', error));
            setLoading(false);
    }, []);

    const handleDecrement = (cart_id) => {
        setCart(cart => 
            cart.map((item) => 
                cart_id === item.id ? {...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1:0) } : item      
            )
        );
        updateCartQuantity(cart_id, "dec");
    }

    const handleIncrement = (cart_id) => {
        setCart(cart => 
            cart.map((item) => 
                cart_id === item.id ? {...item, product_qty: item.product_qty + (item.product_qty < 10 ? 1:0) } : item      
            )
        );
        updateCartQuantity(cart_id, "inc");
    }

    const updateCartQuantity = (cart_id, scope) => {
        axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`);
    }

    const deleteCartItem = (e, cart_id) => {
        e.preventDefault();
        localStorage.setItem('cartCount',localStorage.getItem('cartCount') - 1);
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Removing..";

        axios.delete(`/api/delete-cartitem/${cart_id}`).then(res => {
            if(res.data.status === 200) {
                thisClicked.closest(".cart-div").remove();
                console.log(cartCount)
            } else {
                thisClicked.innerText = "Remove";
            }
        });
    }

    if(loading) {
        return <h4>Loading..</h4>
    }

    if(totalItems > 0) {
        return (
            <div className="container mx-auto mt-10">
                <Link
                    className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full p-5'
                        href="/"
                >
                    go back
                </Link>
                <div className="flex shadow-md my-10">
                    <div className="w-3/4 bg-white px-10 py-10">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                            <h2 className="font-semibold text-2xl">{totalItems} Items</h2>
                        </div>
                        <div className="flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">1 Item Price</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                        </div>
                            {cart.map((item) => {
                                return (
                                    <div key={item.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 cart-div">
                                        <div className="flex w-2/5">
                                            <div className="w-20">
                                                <img className="h-24" src={item.product.image} alt="fa" />
                                            </div>
                                            <div className="flex flex-col justify-between ml-4 flex-grow">
                                                <span className="font-bold text-sm">{item.product.title}</span>
                                                <span className="text-red-500 text-xs">on sale</span>
                                                <a>
                                                    <button onClick={(e) => deleteCartItem(e, item.id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</button>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex justify-center w-1/5">
                                            <button onClick={() => handleDecrement(item.id)}>
                                                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                                    <path
                                                        d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                                    />
                                                </svg>
                                            </button>
                                            <input className=" border text-center w-20 mx-4" type="text" value={item.product_qty}/>
                                            <button onClick={() => handleIncrement(item.id)}>
                                                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                                    <path
                                                        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <span className="text-center w-1/5 font-semibold text-sm">${item.product.price}</span>
                                        <span className="text-center w-1/5 font-semibold text-sm">${item.product.price * item.product_qty}</span>         
                                    </div>                   
                                )
                            })}
                    </div>

                    <div id="summary" className="w-1/4 px-8 py-10">
                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">Items {totalItems}</span>
                            <span className="font-semibold text-sm">{totalAmount}$</span>
                        </div>
                        <div>
                            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                            <select className="block p-2 text-gray-600 w-full text-sm">
                                <option>Standard shipping - $10.00</option>
                            </select>
                        </div>
                        <div className="py-10">
                            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo
                                Code</label>
                            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full"/>
                        </div>
                        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply
                        </button>
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total cost</span>
                                <span>${totalAmount + 10}</span>
                            </div>
                            <span className="font-semibold text-gray-600 text-xs uppercase w-2/5">+ 10$ for shipping</span>
                            <button
                                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 my-2 text-sm text-white uppercase w-full">Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-center h-screen flex-col">
                <h1 className="text-7xl">your cart is empty!</h1>
                <br />
                <Link
                    className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-80 text-center"
                    href="/"
                >
                    Go to the home page for shopping!
                </Link>
            </div>
        )
    }
}

export default Cart
