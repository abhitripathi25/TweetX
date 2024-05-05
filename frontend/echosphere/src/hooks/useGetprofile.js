import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMyProfile } from '../redux/userslice.js';



const useGetProfile = (id)=>{
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`,
                {withCredentials: true}
                );
                dispatch(getMyProfile(res.data.user));
                console.log(res.data);
            }
        
                 catch (error) {
                console.log(error);
            }
        }
        fetchMyProfile();
        }, []);
 };
 


export default useGetProfile;
