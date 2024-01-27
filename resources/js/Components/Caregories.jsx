import axios from "axios";
import {useEffect, useState} from "react";

export default function Categories({setCategorieId}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);


    return (
        <div className='flex justify-center flex-wrap'>
             <button
                    className="bg-transparent mx-5 m-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => setCategorieId("")}
                >
                    All
                </button>
            {categories.map((categorie) => (
                <button
                    className="bg-transparent m-2 mx-5 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => setCategorieId(categorie.id)}
                    value={categorie.id}
                    key={categorie.id}
                >
                    {categorie.name}
                </button>
            ))}
        </div>
    );
}
