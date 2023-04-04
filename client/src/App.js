import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Catalogue from './components/Catalogue/Catalogue';
import UserConnection from './components/UserConnection/UserConnection'
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Detail from './components/Detail/Detail';
import Profile from './components/UserDashboard/Profile'
import UpdateProfile from './components/UserDashboard/UpdateProfile'
import Payment from './components/PasarelaStripe/PasarelaStripe'
// import RegisterProduct from './components/RegisterProduct/RegisterProduct'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContainerRegiterPRoduct from './components/RegisterProduct/ContainerRegiterPRoduct';
import CartDetail from './components/Cart/CartDetails';
import Error404 from './components/Error404/Error404';
import DashBoard from './components/adminDashBoard/DashBoard'
import List from './components/adminDashBoard/pages/list/List';


import Products from './components/adminDashBoard/pages/products/Products'
import OrderHistory from './components/UserDashboard/OrderHistory';

import Single from './components/adminDashBoard/pages/single/Single';
import ProductDetail from './components/adminDashBoard/pages/productDetail/productDetail.jsx';
import ProductCreate from './components/adminDashBoard/pages/productCreate/productCreate';


import About from './components/About/About';
import Footer from './components/Footer/Footer';

import OrderDetails from './components/adminDashBoard/pages/ordersDetail/orderDetails'
import Orders from './components/adminDashBoard/pages/orders/Orders';
const {loadUser} = require('./reduxToolkit/slices/userSlice').userActions;

function App() {
  let flag=false;
  
  const dispatch = useDispatch();

  const { email } = useSelector((state) => state.user);

  const token = localStorage.getItem('tokenAuth')  

  if(email)flag=true;
  
  useEffect(()=>{
     dispatch(loadUser(token));
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  return (
    <>
      <ToastContainer autoClose={1000} />
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/catalogue' element={<Catalogue />} />
        <Route exact path='/login' element={<UserConnection />} />
        <Route exact path='/register' element={<UserConnection isLogin={false} />} />
        <Route exact path='/details/:id' element={<Detail />} />
        <Route exact path='/create' element={<ContainerRegiterPRoduct />} />
        <Route exact path='/admin' element={<DashBoard/>}/>
        <Route exact path='/admin/users' element={<List/>}/>
        <Route exact path='/admin/users/:id' element={<Single/>}/>
        <Route exact path='/admin/products' element={<Products/>}/>
        <Route exact path='/admin/products/create' element={<ProductCreate/>}/>
        <Route exact path='/admin/products/:id' element={<ProductDetail/>}/>
        <Route exact path='/admin/orders' element={<Orders/>}/>
        <Route exact path='/admin/orders/:id' element={<OrderDetails/>}/>
        <Route path= '*' element= { <Error404 /> } /> 


        {/* <Route exact path='/profile' element={<Profile />} /> 
        <Route exact path='/profile/update' element={<UpdateProfile />} />
        <Route exact path='/payment' element={<Payment />} />
        <Route path='/cartDetail' element={<CartDetail/>} /> */}
        
        {
          flag&&flag?<Route exact path='/profile' element={<Profile />} />          
          :<Route path= '*' element= { <Error404 /> } /> 
        }
        
        {
          flag&&flag?<Route exact path='/profile/update' element={<UpdateProfile />} />
          :<Route path= '*' element= { <Error404 /> } /> 
        }

        {
          flag&&flag?<Route exact path='/profile/orders' element={<OrderHistory />} />
          :<Route path= '*' element= { <Error404 /> } /> 
        }

        {
          flag&&flag?<Route exact path='/profile/orders/:id' element={<OrderDetails />} />
          :<Route path= '*' element= { <Error404 /> } /> 
        }

        {
          flag&&flag?<Route exact path='/payment' element={<Payment />} />
          :<Route path= '*' element= { <Error404 /> } /> 
        }

        {
          flag&&flag?<Route path='/cartDetail' element={<CartDetail/>} />
          :<Route path= '*' element= { <Error404 /> } /> 
        }        
      </Routes>
        <Footer></Footer>
    </>
  );
}

export default App;