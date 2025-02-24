import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        } else {
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
            } catch (error) {
                console.log("Error adding to cart:", error);
                toast.error(error.message || "Failed to add to cart.");
            }
        }
    };

    const getCartCount = () => {
        let count = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        count += cartItems[items][item];
                    }
                } catch (error) {
                    console.log("Error calculating cart count:", error);
                }
            }
        }
        return count;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.log("Error updating quantity:", error);
                toast.error(error.message || "Failed to update quantity.");
            }
        }
    };

    const getCartAmount = () => {
        let amount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) {
                continue;
            }
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        amount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log("Error calculating cart amount:", error);
                    toast.error("Error calculating cart amount.");
                }
            }
        }
        return amount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error fetching products:", error);
            toast.error("Failed to load products.");
        }
    };

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData || {}); // Ensure cartData is always an object
            } else {
                toast.error(response.data.message);
                setCartItems({}); // Reset cart to empty object in case of error
            }
        } catch (error) {
            console.log("Error fetching cart data:", error);
            toast.error("Failed to load cart data.");
            setCartItems({}); // Prevent undefined state
        }
    };

    useEffect(() => {
        console.log("Cart Items Updated:", cartItems);
    }, [cartItems]);

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    useEffect(() => {
        if (token) {
            getUserCart(token);
        }
    }, [token]); // Fetch cart whenever the token changes

    const value = {
        products,
        currency,
        delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        getProductsData,
        token, setToken
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
