import React from 'react'
import Avatar from 'react-avatar';
import { FaRegComment } from 'react-icons/fa';
import { CiHeart, CiBookmark } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';

function Tweet() {
  return (
    <div className='border-b border-gray-200'>
    <div>
        <div className='flex p-4'>
            <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
            <div className=' ml-2 w-full'>
                <div className='flex items-center'>
                    <h1 className='font-bold'>abhi tripathi</h1> {/* Placeholder name */}
                    <p className='text-gray-500 text-sm ml-1'>@abhitrip . 2 hours ago</p> {/* Placeholder username and timestamp */}
                </div>
                <div>
                    <p>This is a tweet description</p> {/* Placeholder tweet description */}
                </div>
                <div className='flex justify-between my-3'>
                    <div className='flex items-center'>
                        <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                            <FaRegComment size="20px" />
                        </div>
                        <p>0</p> {/* Placeholder comment count */}
                    </div>
                    <div className='flex items-center'>
                        <div className='p-2 hover:bg-pink-200 rounded-full cursor-pointer'>
                            <CiHeart size="24px" />
                        </div>
                        <p>0</p> {/* Placeholder like count */}
                    </div>
                    <div className='flex items-center'>
                        <div className='p-2 hover:bg-yellow-200 rounded-full cursor-pointer'>
                            <CiBookmark size="24px" />
                        </div>
                        <p>0</p> {/* Placeholder bookmark count */}
                    </div>
                    {/* Placeholder delete button */}
                    <div className='flex items-center'>
                        <div className='p-2 hover:bg-red-300 rounded-full cursor-pointer'>
                            <MdOutlineDeleteOutline size="24px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}

export default Tweet
