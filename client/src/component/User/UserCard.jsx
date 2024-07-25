import React from 'react'


const UserCard = ({user}) => {
 const {name,age, profilePic, qualification }= user
  return (
    <div className='p-3 lg:p-5'>
      <div>
        <img src={profilePic} className='w-full' alt='' />
      </div>
      <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-black font-[700] mt-3 lg:mt-5'>{name}</h2>
      <div className='mt-2 lg:mt-4 flex items-center justify-between'>
        <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
            {age}
            </span>
            <div className='flex items-center gap-[6px]'>
                <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
                    <img src='' alt=''/>
                </span>
                <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor'></span>
            </div>
      </div>
    </div>
  )
}

export default UserCard
