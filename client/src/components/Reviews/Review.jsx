import React from 'react'
import Stars from "../Stars/Stars"

const Review = ({rev}) => {
  const image = rev.User.profilePic
  ? `${rev.User.profilePic.slice(0,50)}c_fill,f_auto,h_50,q_auto,w_50/${rev.User.profilePic.slice(50)}`
  : `https://res.cloudinary.com/dviri5ov1/image/upload/c_fill,f_auto,h_50,q_auto,w_50/v1680200389/fastball/system/profile_cgemsd.png`
  return (
    <div className="flex items-center mb-2 bg-white shad border-all p-4 ">
    <img
      src={image}
      alt="Avatar"
      className="rounded-full mr-4 border border-solid border-slate-400"
    />
    <div>
      <span>{rev.date} -</span>
      <span className="ml-2 text-lg font-medium font-semibold">{rev.User.name}</span>
      <div className="flex items-center">
        <span className="text-sm text-gray-600 mr-2">{`${rev.score} ${rev.score ===1?'star':'stars'}`}</span>
        <div className="flex items-center">
          <Stars score={rev.score} />
        </div>
      </div>
      <p className="text-gray-600">
        {rev.description} 
      </p>
    </div>
  </div>
  )
}

export default Review