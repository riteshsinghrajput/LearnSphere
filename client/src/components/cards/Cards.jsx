

function Cards({imageUrl , heading , description}) {
  return (
   <>
     <div className="w-[100%] sm:w-[40%] lg:w-[30%]  h-[15vh] bg-white flex justify-around items-center  shadow-lg">
               <div>
                <img src={imageUrl} alt=""  />
               </div>
               <div className="">
                <div className="font-bold text-xl">{heading}</div>
                <div className="font-thin">{description}</div>
               </div>
           </div>
   </>
  )
}

export default Cards