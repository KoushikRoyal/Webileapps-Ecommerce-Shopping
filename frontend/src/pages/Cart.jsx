import { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    if (!token) {
        return null; // Prevent rendering while redirecting
    }


    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>YOUR CART</div>

            <div>
                {Object.keys(cartItems).length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    Object.entries(cartItems).flatMap(([productId, sizes]) =>
                        Object.entries(sizes).map(([size, quantity]) => {
                            if (quantity <= 0) return null;

                            const productData = products.find((product) => product._id === productId);
                            if (!productData) return null;

                            return (
                                <div key={`${productId}-${size}`} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                                    <div className='flex items-start gap-6'>
                                        <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
                                        <div>
                                            <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                            <div className='flex items-center gap-5 mt-2'>
                                                <p>{currency}{productData.price}</p>
                                                <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{size}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quantity Input */}
                                    <input
                                        onChange={(e) => {
                                            const newValue = parseInt(e.target.value, 10);
                                            if (!isNaN(newValue) && newValue >= 1) {
                                                updateQuantity(productId, size, newValue);
                                            }
                                        }}
                                        className='border max-w-12 sm:mx-w-22 px-1 sm:px-2 py-1'
                                        type="number"
                                        min={1}
                                        value={quantity} 
                                    />

                                    {/* Delete Button */}
                                    <img
                                        onClick={() => {
                                            const newQuantity = quantity - 1;
                                            if (newQuantity > 0) {
                                                updateQuantity(productId, size, newQuantity);
                                            } else {
                                                updateQuantity(productId, size, 0);
                                            }
                                        }}
                                        className='w-4 mr-4 sm:w-5 cursor-pointer'
                                        src={assets.bin_icon}
                                        alt="Delete"
                                    />
                                </div>
                            );
                        })
                    )
                )}
            </div>

            {/* Cart Summary Section */}
            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <div className='w-full text-end'>
                        <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
