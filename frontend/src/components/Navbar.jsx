import { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [showLoginOptions, setShowLoginOptions] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    };

    const handleProfileClick = () => {
        if (!token) {
            setShowLoginOptions(true); // Show login options if not logged in
        }
    };

    return (
        <div className='flex items-center justify-between py-5 px-6 font-medium bg-white text-gray-800 shadow-md'>
            {/* Navigation Links */}
            <ul className='hidden sm:flex gap-6 text-sm'>
                {['/', '/collection', '/about'].map((path, index) => (
                    <NavLink
                        key={index}
                        to={path}
                        className={({ isActive }) => `relative flex flex-col items-center gap-1 transition-all ${isActive ? 'text-[#d4af37] font-semibold' : 'hover:text-[#d4af37]'}`}
                    >
                        <p>{path.toUpperCase().replace('/', '') || 'HOME'}</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-[#d4af37] hidden' />
                    </NavLink>
                ))}
            </ul>

            {/* Right Section */}
            <div className='flex items-center gap-6'>
                {/* Search Icon */}
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

                {/* Profile Icon */}
                <div className='relative'>
                    <img onClick={handleProfileClick} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    
                    {token && (
                        <div className='absolute right-0 mt-2 w-36 py-3 px-5 bg-white text-gray-600 border border-gray-200 shadow-md rounded'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                            <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    )}
                </div>

                {/* Cart Icon */}
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#d4af37] text-white aspect-square rounded-full'>
                        {getCartCount()}
                    </p>
                </Link>

                {/* Menu Icon for Small Screens */}
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* Sidebar for Small Screens */}
            <div className={`absolute top-0 right-0 bottom-0 bg-white text-gray-800 transition-all shadow-lg ${visible ? "w-64 p-5" : "w-0 overflow-hidden"}`}>
                <div className='flex flex-col'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 py-3 cursor-pointer text-[#d4af37]'>
                        <img src={assets.dropdown_icon} className='h4 rotate-180' alt="" />
                        <p>Close</p>
                    </div>
                    {['/', '/collection', '/about'].map((path, index) => (
                        <NavLink 
                            key={index} 
                            onClick={() => setVisible(false)} 
                            className='py-3 pl-6 border-b border-gray-300 hover:text-[#d4af37]' 
                            to={path}
                        >
                            {path.toUpperCase().replace('/', '') || 'HOME'}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Login Modal */}
            {showLoginOptions && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-lg font-semibold mb-4">Login as:</h2>
                        <button 
                            className="w-full py-2 bg-[#d4af37] text-white rounded mb-2 hover:bg-[#b89630]" 
                            onClick={() => { setShowLoginOptions(false); navigate('/login'); }}
                        >
                            User Login
                        </button>
                        <button 
                            className="w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-700" 
                            onClick={() => { setShowLoginOptions(false); navigate('/admin'); }}
                        >
                            Admin Login
                        </button>
                        <button 
                            className="mt-4 text-gray-500 hover:text-gray-700" 
                            onClick={() => setShowLoginOptions(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
