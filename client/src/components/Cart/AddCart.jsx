import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {addProductInCart} from '../../reduxToolkit/actions/cartAction'
const AddCart = ({productDetail}) => {
    const user = useSelector((state) => state.user);
    const dispatch=useDispatch();
    const [stock,setStock]=useState(1);
    const handleQuantityChange = (event) => {
        // console.log(user._id);
        //console.log(productDetail.idProduct);
        const value = parseInt(event.target.value);
        setStock(value);
    }
    const handleAddToCart=async()=>{
        // {idUser, idProduct, sotck}
        await dispatch(addProductInCart({idUser:user._id, idProduct:productDetail.id, stock}));
        console.log("agregado con exito");
    }
    return ( 
        <div className="flex flex-col  gap-4 p-4  ">
            <p className="font-medium">Productos disponibles: {productDetail.stock}</p>
            <div className="flex flex-row items-center gap-2">
                <label htmlFor="quantity" className="font-medium">Cantidad:</label>
                <input type="number" id="quantity" name="quantity" min="1" max={productDetail.stock} value={stock} onChange={handleQuantityChange} className="w-20 border rounded-md text-center" />
                <button className="px-4 py-2 text-white bg-green-500 hover:bg-gray-500 
                rounded-md focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm" 
                onClick={handleAddToCart}>Agregar al carrito <i className="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
    );
}

export default AddCart;