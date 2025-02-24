import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../admincomponents/Sidebar";

const List = () => {
    const [list, setList] = useState([]);  
    const [loading, setLoading] = useState(false);  
    const [deleting, setDeleting] = useState(false);  
    const currency = "$";

    const fetchList = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/list`);
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch product list.");
        }
        setLoading(false);
    };

    const removeProduct = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        setDeleting(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/product/remove`, { id });
            if (response.data.success) {
                toast.success(response.data.message);
                setList(prevList => prevList.filter(item => item._id !== id));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove product.");
        }
        setDeleting(false);
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-80 bg-gray-200 p-4">
                <Sidebar />
            </div>

            {/* Product List */}
            <div className="w-full md:w-3/4 p-4">
                <p className="mb-4 text-lg font-semibold">All Products</p>

                {/* Loading State */}
                {loading ? <p className="text-gray-500">Loading products...</p> : (
                    <>
                        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-bold">
                            <b>Image</b>
                            <b>Name</b>
                            <b>Category</b>
                            <b>Price</b>
                            <b className="text-center">Action</b>
                        </div>

                        {list.length > 0 ? (
                            list.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border text-sm md:text-base"
                                >
                                    <img className="w-10 h-10 object-cover" src={item.image[0]} alt={item.name} />
                                    <p>{item.name}</p>
                                    <p>{item.category}</p>
                                    <p>{currency}{item.price}</p>

                                    {/* Delete Button */}
                                    <button 
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-md transition-all duration-200 disabled:opacity-50"
                                        onClick={() => removeProduct(item._id)}
                                        disabled={deleting}
                                    >
                                        {deleting ? "Removing..." : "Remove"}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 mt-4">No products found.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default List;
