import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchOneOrder } from './../../../../reduxToolkit/actions/orderAction';
import OrderDetail from './../../../UserDashboard/orders/OrderDetails'
import Sidebar from '../sidebar/Sidebar';
import './orderDetails.scss'
import List from '../table/Table';
import Loading from '../loading/Loading';


function OrderDetails() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [order, setOrder] = useState({})
    useEffect(() => {
        dispatch(fetchOneOrder(id)).then((res) => {setOrder(res.payload); console.log({res})});
    }, [])
    console.log(order)

    
    console.log({ order })
    if(!order){
        return <div className='orderDetail'>
        <Sidebar />
        <div className="orderContainer">
          <Loading/>
        </div>
      </div>
    }

    return (
        <div className='orderDetail'>
            <Sidebar />
            <div className="orderContainer">
                <div className='absolute top-20 right-10 mt-4 mr-4'>
                    <button className='border  text-gray-500 hover:bg-blue-400 hover:text-white font-bold py-1 px-2 rounded'onClick={()=>{navigate(-1)}} >
                        Go back
                    </button>
                </div>
                <div className="infoOrder">
                    <div className="px-4 py-5 sm:px-6">

                        <h3 className="text-2xl leading-6 font-bold text-gray-500 mb-5 ">
                            Order Info
                        </h3>

                        <p className="mt-1 max-w-2xl text-m text-gray-500">
                            Details and informations about this specific order.
                        </p>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Order Number:</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <b>{order.orderNumber}</b>
                                </dd>
                            </div>

                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Total Amount:</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <b>{order.totalAmount}</b>
                                </dd>
                            </div>

                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Created at:</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <b>{order.createdAt}</b>
                                </dd>
                            </div>

                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">User Id:</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <b>{order.UserId}</b>
                                </dd>
                            </div>


                        </dl>
                    </div>
                </div>
                <div className='bottom'>
                    <h1 className="title">Products purchased</h1>
                    <List products={order.Products ? order.Products : []} />
                </div>

            </div>

        </div>

    )
}

export default OrderDetails