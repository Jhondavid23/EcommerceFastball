import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../reduxToolkit/actions/productAction';
import AddCart from "../Cart/AddCart";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import ImageViewer from "../imageViewer/ImageViewer";
// import Stars from "../Stars/Stars"
import Review from "../Reviews/Review";
import AddReview from "../Reviews/AddReview";
const { clearProductDetail } = require('./../../reduxToolkit/slices/productSlice').productActions


const Detail = () => {
  const [arrayReviews, setArrayReviews] = useState([
    // {
    //   date: '01/03/23',
    //   image: 'https://res.cloudinary.com/dviri5ov1/image/upload/v1679684756/fastball/users/nvi27adeg2okkldkan6y.jpg',
    //   name: 'Jon Doe',
    //   score: 3,
    //   description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque in veritatis omnis maiores, dolorem doloremque libero vel perferendis ipsum tempore modi, hic sed rem harum accusamus consequatur reiciendis tempora quam'
    // }
  ])
  const [isLoading, setIsLoading] = useState(true);
  const {id}=useParams();
  const dispatch=useDispatch();
  const { productDetail } = useSelector((state) => state.product);
  const { _id } = useSelector((state) => state.user);
  const [showAddReview, setShowAddReview] = useState(false);
  const [isAddReview, setIsAddReview] = useState(true);
  let startDetail = true

  useEffect(() => {
    if(startDetail){
      // eslint-disable-next-line react-hooks/exhaustive-deps
      startDetail = false
      dispatch(fetchProductById({productId: id, userId: _id}))
        .then( ()=> setIsLoading(false) )
    }

    return () => {
        dispatch(clearProductDetail())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAcceptReview = (review)=>{
    arrayReviews.unshift(review)
    setArrayReviews(arrayReviews)
  }

  return ( 
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : showAddReview
          ? <AddReview 
              productDetail={productDetail}
              clickAccept={handleAcceptReview}
              clickClose={()=>setShowAddReview(false)}
            />
          : <div className="mt-12 container mx-auto px-4 py-6 md:py-8 lg:py-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="cont-imageviewer">
              {productDetail.image && <ImageViewer image={productDetail.image}/>}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {productDetail.name}
              </h1>
              <div className="mb-4">
                <span>
                  {`have visited this product ${productDetail.usersVisits? productDetail.usersVisits : 0} time${productDetail.usersVisits ===1? '': 's'} ` }
                </span>
                <span>
                  {`( ${productDetail.soldAmount? productDetail.soldAmount : 0} sold )`}
                </span>
              </div>

              <div className="mb-4 flex items-center">
                <span className="text-2xl text-blue-800 md:text-3xl lg:text-4xl font-bold mr-4">
                  ${(productDetail.price - (productDetail.price*(productDetail.discount/100))).toFixed(2)}
                </span>
                {
                  productDetail.discount > 0 &&
                  <>
                    <span className="text-green-500 font-semibold">{productDetail.discount}% OFF</span> 
                    <span className="ml-4 text-lg md:text-2lg lg:text-3lg font-light line-through">
                       ${productDetail.price.toFixed(2)}
                    </span>
                  </>
                }
                {/* <span className="text-gray-600 text-lg line-through"></span> */}
              </div>
              <div className="mb-4">
                <h2 className="text-lg md:text-xl font-medium mb-2">
                  Description
                </h2>
                <p className="text-gray-600">
                  {productDetail.description}
                </p>
              </div>
              {/* <div className="mb-4">
                <h2 className="text-lg md:text-xl font-medium mb-2">Details</h2>
                <ul className="text-gray-600">
                  <li>Detail 1</li>
                  <li>Detail 2</li>
                  <li>Detail 3</li>
                </ul>
              </div> */}
              <div>
                <hr className="my-4 border border-slate-300"/>
                <AddCart productDetail={productDetail}></AddCart>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <div className="flex mb-4 gap-8">
              <h2 className="text-xl md:text-2xl font-medium mb-4">Reviews</h2>
              {isAddReview &&
                <button 
                  type="button" 
                  className='px-4 py-1 text-white bg-green-600 hover:bg-green-500 
                  rounded-md focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm'
                  onClick={()=>setShowAddReview(true)}
                >
                  Add review
                </button>
              }
            </div>
            {arrayReviews.map( rev => <Review rev={rev} />)}
            
            {/* <div className="flex items-center mb-4">
              <img
                src="https://via.placeholder.com/50x50"
                alt="Avatar"
                className="rounded-full mr-4"
              />
              <div>
                <span className="text-lg font-medium">John Doe</span>
                <span className="ml-2">- 02/08/22</span>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">4 stars</span>
                  <div className="flex items-center">
                    <Stars score={4} />
                  </div>
                </div>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  consectetur sit amet massa ac bibendum.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      }
    </>
  );
}
 
export default Detail;