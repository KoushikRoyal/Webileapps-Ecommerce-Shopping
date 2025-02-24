import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Verify from './pages/Verify';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './admin/admincomponents/AdminLogin'
import Dashboard from './admin/admincomponents/Dashboard';
import Add from './admin/adminpages/Add';
import List from './admin/adminpages/List';
import AdminOrders from './admin/adminpages/AdminOrders';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
         <Route path='/admin' element={<AdminLogin/>}/>
         <Route path='/adminadd' element={<Add/>}/>
         <Route path='/adminlist' element={<List/>}/>
         <Route path='/adminorders' element={<AdminOrders/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
