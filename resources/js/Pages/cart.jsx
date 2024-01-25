import {useEffect, useState} from "react";
import axios from "axios";
import NavLink from "@/Components/NavLink.jsx";
import {Link} from "@inertiajs/react";

const Cart = () => {
    // const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    // useEffect(() => {
    //     let isMounted = true;
    //
    //     axios.get('/api/cart')
    //         .then(response => setCart(response.data))
    //         .catch(error => console.error('Error fetching products:', error));
    // }, []);

    // if(loading) {
    //     return <h4>Loading..</h4>
    // }
    return (
        <div className="container mx-auto mt-10">
            <Link
                className={
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none '}
                href="/"
            >
                go back
            </Link>
            <div className="flex shadow-md my-10">
                <div className="w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 className="font-semibold text-2xl">1 Items</h2>
                    </div>
                    <div className="flex mt-10 mb-5">
                        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                    </div>
                    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                        <div className="flex w-2/5">
                            <div className="w-20">
                                <img className="h-24" src="data:image/jpeg;base64,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" alt="" />
                            </div>
                            <div className="flex flex-col justify-between ml-4 flex-grow">
                                <span className="font-bold text-sm">Iphone 6S</span>
                                <span className="text-red-500 text-xs">Apple</span>
                                <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                            </div>
                        </div>
                        <div className="flex justify-center w-1/5">
                            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                <path
                                    d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                            </svg>

                            <input className="mx-2 border text-center w-8" type="text" value="1"/>

                            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                <path
                                    d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                            </svg>
                        </div>
                        <span className="text-center w-1/5 font-semibold text-sm">$400.00</span>
                        <span className="text-center w-1/5 font-semibold text-sm">$400.00</span>
                    </div>
                    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                        {/* Product 2 */}
                    </div>
                    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                        {/* Product 3 */}
                    </div>
                    <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
                        {/* Continue Shopping */}
                    </a>
                </div>

                <div id="summary" className="w-1/4 px-8 py-10">
                    <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                    <div className="flex justify-between mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">Items 3</span>
                        <span className="font-semibold text-sm">590$</span>
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
                            <span>$600</span>
                        </div>
                        <button
                            className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart
