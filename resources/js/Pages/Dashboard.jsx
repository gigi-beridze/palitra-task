import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductList from "@/Pages/ProductList.jsx";
import {useState, useEffect} from "react";

export default function Dashboard({ auth }) {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        calculateTotal();
    }, [cart]);

    const calculateTotal = () => {
        let totalAmount = 0;
        cart.forEach((item) => {
            totalAmount += item.price * item.quantity;
        });
        setTotal(totalAmount);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Welcome to gigi's store!</h2>}
        >
            <Head title="Dashboard" />

            <div className="p-12">
                {/*<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">*/}
                {/*    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">*/}
                {/*        <div className="p-6 text-gray-900">You're logged in!</div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-12">
                            <div className="dropdown">
                                <button type="button" className="btn btn-primary" data-toggle="dropdown">
                                    <i className="fa fa-shopping-cart" aria-hidden="true"></i> Cafrt{' '}
                                    <span className="badge badge-pill badge-danger">{cart.length}</span>
                                </button>

                                <div className="dropdown-menu">
                                    <div className="row total-header-section">
                                        <div className="col-lg-12 col-sm-12 col-12 total-section text-right">
                                            <p>
                                                Total: <span className="text-info">$ {total}</span>
                                            </p>
                                        </div>
                                    </div>
                                    {cart.length > 0 &&
                                        cart.map((item) => (
                                            <div key={item.id} className="row cart-detail">
                                                <div className="col-lg-4 col-sm-4 col-4 cart-detail-img">
                                                    <img src={item.photo} alt={item.product_name} />
                                                </div>
                                                <div className="col-lg-8 col-sm-8 col-8 cart-detail-product">
                                                    <p>{item.product_name}</p>
                                                    <span className="price text-info"> ${item.price}</span>{' '}
                                                    <span className="count"> Quantity: {item.quantity}</span>
                                                </div>
                                            </div>
                                        ))}
                                    <div className="row">
                                        <div className="col-lg-12 col-sm-12 col-12 text-center checkout">
                                            <a href="/cart" className="btn btn-primary btn-block">
                                                View all
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="container">
                    {/* Display success message */}
                    {sessionStorage.getItem('success') && (
                        <div className="alert alert-success">
                            {sessionStorage.getItem('success')}
                        </div>
                    )}

                    {/* Render component content */}
                    {/* Include the content of your React components here using the `children` prop */}
                </div>

                {/* Include additional scripts here */}
                <ProductList  />

            </div>
        </AuthenticatedLayout>
    );
}
