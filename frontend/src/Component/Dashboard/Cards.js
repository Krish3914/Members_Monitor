import { useDispatch } from "react-redux"
import { makeInvisible } from "../redux/TemplateSlice"

export const Cards = ()=>{
  const dispatch = useDispatch();
    return(
        <div className="grid grid-cols-2 grid-rows-2 gap-6 w-9/12" onClick={()=>dispatch(makeInvisible(false))}>
        <div className="flex flex-col bg-white shadow-xl p-2 gap-2 rounded-lg">
          <img
            src={require("../../images/icons/unicons/chart-success.png")}
            className="w-10"
          />
          <h2 className="opacity-60 font-normal text-lg">Users</h2>
          <span className="text-2xl font-medium opacity-60">12,628</span>
          <span className="text-green-500">78.2%</span>
        </div>
        <div className="flex flex-col bg-white shadow-xl p-2 gap-2 rounded-lg">
          <img
            src={require("../../images/icons/unicons/cc-primary.png")}
            className="w-10"
          />
          <h2 className="opacity-60 font-normal text-lg">Pending</h2>
          <span className="text-2xl font-medium opacity-60">12,628</span>
          <span className="text-green-500">78.2%</span>
        </div>
        <div className="flex flex-col bg-white shadow-xl p-2 gap-2 rounded-lg">
          <img
            src={require("../../images/icons/unicons/paypal.png")}
            className="w-10"
          />
          <h2 className="opacity-60 font-normal text-lg">Payment</h2>
          <span className="text-2xl font-medium opacity-60">12,628</span>
          <span className="text-green-500">78.2%</span>
        </div>
        <div className="flex flex-col bg-white shadow-xl p-2 gap-2 rounded-lg">
          <img
            src={require("../../images/icons/unicons/wallet-info.png")}
            className="w-10"
          />
          <h2 className="opacity-60 font-normal text-lg">New Users</h2>
          <span className="text-2xl font-medium opacity-60">12,628</span>
          <span className="text-green-500">78.2%</span>
        </div>
      </div>
    )
}