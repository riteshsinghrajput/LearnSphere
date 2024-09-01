


function TeacherCard({courseInstructor}) {

  return (
    <div className='shadow-md space-y-5 rounded-md border w-[100vw] md:w-[60%] lg:w-[25vw] flex flex-col '>
      <div className='w-[100%]'>
        <img src={courseInstructor?.avatar?.secure_url} className='w-[100%]' />
      </div>
      <div className='space-y-1 space-x-2 pb-2'>
        <div></div>
         <div className='font-extrabold text-xl'>{courseInstructor?.fullName}</div>
         <div className='font-light'>Software Developer</div>
      </div>
    </div>
  )
}

export default TeacherCard