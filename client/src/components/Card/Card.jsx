import { Link } from "react-router-dom";

const Card = (props) => {
    return ( 
      <div className="border max-w-sm bg-gray-100 overflow-hidden rounded-lg drop-shadow-lg hov-cart"
      style={{height: '350px', padding: '5 px'}}
      title="Banner to product"
      >
         <Link to={`/details/${props.id}`} >
          <img className="w-full h-64 scale-down" src={props.image} alt={'title'} />
         </Link >
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-1 card-name" title="Name product">{props.name}</div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white" title="Price">${props.price}</span>
            <button className="cursor-pointer text-white bg-green-500 hover:bg-gray-500 rounded focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" title="Add to cart shopping">
              {"Add to cart  "}
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
           </div>
        </div>
      </div>
     );
}
 
export default Card;