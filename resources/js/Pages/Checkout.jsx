import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

const Checkout = () => {
  const [cartData, setCartData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    country: '',
    city: 'Tbilisi', // default city
    zip: ''
  });

  useEffect(() => {
    const storedCartData = localStorage.getItem('cartData');

    if (storedCartData) {
      setCartData(JSON.parse(storedCartData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the entered data and cart data
    const completeData = {
      ...formData,
      cartData
    };

    // You can save or process the data as needed
    console.log(completeData);
    localStorage.setItem('order', JSON.stringify(completeData))

    // Clear the form data after submission if needed
    setFormData({
      firstName: '',
      lastName: '',
      address: '',
      country: '',
      city: 'Tbilisi',
      zip: ''
    });

    // Optionally, clear the cart data from localStorage if needed
    localStorage.removeItem('cartData');
  };

  return (
    <div>
        <div className="header">
            <div className="flex items-center justify-center bg-gray-100 p-10">
                <div className="text-center">
                    <Link href="/" className="text-4xl font-bold text-gray-800 mb-4 underline">
                        Go to home page
                    </Link>
                </div>
            </div>
      </div>
      <form className="w-100 p-20" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6 justify-center">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="firstName"
                        type="text"
                        placeholder="Gigi"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Last Name
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        type="text" 
                        placeholder="Beridze" 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Address
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        type="text" 
                        placeholder="N2 Chavchavadze Street"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                        Country
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        type="text" 
                        placeholder="Georgia"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange} 
                    />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                        City
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>Tbilisi</option>
                            <option>Batumi</option>
                            <option>Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label 
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                        for="grid-zip"
                    >
                        Zip
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        type="text" 
                        placeholder="6160" 
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange} 
                    />
                </div>
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white w-full py-3 px-4 mt-5 font-bold py-2 px-4 rounded"
                type="submit"
            >
                Submit
            </button>
        </form>
    </div>
  );
};

export default Checkout;
