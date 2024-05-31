import axios from 'axios';
import { useEffect } from 'react';
import {useSelector } from 'react-redux'
import { apiURL } from './utils/commonData';
const PaymentSuccess = ()=>{
    const userInfo = useSelector((store)=>store.user.userData);
    // console.log("this is info we get from ",userInfo);
    const {name, email, phone, _id ,plan} = userInfo;
    
    const updateDb = async()=>{
        // console.log("calling the update db function");
        const updatedUser = await axios.put(`${apiURL}updateuser`,{name, email, phone, _id ,plan});
        // console.log("the updated user is ",updatedUser);
    }

    useEffect(()=>{
        // we will update the db once after payment is successfull
        updateDb();
    },[])
    return(
        <h3 className="mx-auto">successful payment</h3>
    )
}
export {PaymentSuccess};