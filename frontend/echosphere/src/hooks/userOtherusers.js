import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOtherUsers } from '../redux/userslice.js';



const useOtherUsers = (id)=>{
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/otheruser/${id}`,
                {withCredentials: true}
                );
                dispatch(getOtherUsers(res.data.otherUsers));
                console.log(res.data);
            }
        
                 catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
        }, []);
 };
 


export default useOtherUsers;
