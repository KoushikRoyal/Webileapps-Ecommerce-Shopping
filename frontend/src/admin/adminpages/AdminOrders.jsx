import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../adminassets/assets";
import Sidebar from "../admincomponents/Sidebar";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [token, setToken] = useState(null);
    const currency = "$";

    useEffect(() => {
        const adminToken = localStorage.getItem("admin_token");
        if (adminToken) setToken(adminToken);
    }, []);

    useEffect(() => {
        if (token) fetchAllOrders();
    }, [token]); 

    const fetchAllOrders = async () => {
        if (!token) return;
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/order/list`,
                {},
                { headers: { token } }
            );
            if (response.data.success) {
                setOrders(response.data.orders.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const statusHandler = async (e, orderId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/order/status`,
                { orderId, status: e.target.value },
                { headers: { token } }
            );
            if (response.data.success) {
                await fetchAllOrders();
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <h3 className="text-center text-xl font-semibold my-4">Order Page</h3>
            <div className="flex">
                {/* Fixed Sidebar */}
                <div className="w-80 min-h-screen bg-gray-200">
                    <Sidebar />
                </div>

                {/* Orders List */}
                <div className="flex-1 p-6">
                    {orders?.length > 0 ? (
                        orders.map((order, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
                            >
                                <img src={assets.parcel_icon} className="w-12" alt="Parcel Icon" />
                                <div>
                                    {order.items.map((item, idx) => (
                                        <p className="py-0.5" key={idx}>
                                            {item.name} x {item.quantity} <span>{item.size}</span>
                                            {idx !== order.items.length - 1 && <span>, </span>}
                                        </p>
                                    ))}
                                    <p className="mt-3 mb-2 font-medium">
                                        {`${order.address.firstName} ${order.address.lastName}`}
                                    </p>
                                    <p>
                                        {`${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}
                                    </p>
                                    <p>{order.address.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
                                    <p className="mt-3">Method: {order.paymentMethod}</p>
                                    <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                                    <p>Date: {new Date(order.date).toDateString()}</p>
                                </div>
                                <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
                                <select
                                    onChange={(e) => statusHandler(e, order._id)}
                                    value={order.status}
                                    className="p-2 font-semibold border rounded"
                                >
                                    <option value="Order Placed">Order Placed</option>
                                    <option value="Packing">Packing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for delivery">Out for delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-lg text-center mt-10">No orders available</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminOrders;
