import { useDispatch } from "react-redux"
import { makeInvisible } from "./redux/TemplateSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const TransactionsCard = ()=>{
    useEffect(()=>{
        toast.dismiss();
    },[])
    const dispatch = useDispatch();
    return(
        <h1 onClick={()=>dispatch(makeInvisible(false))}>Page Under Development.....</h1>
    )
}