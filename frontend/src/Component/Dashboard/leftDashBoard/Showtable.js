// show table will rendered after search in the table


import { useDispatch, useSelector } from "react-redux";
import { addClientSearch } from "../../redux/clientSlice";
import { makeInvisible } from "../../redux/TemplateSlice";

export const Showtable = ()=>{
    const  clients = useSelector((store)=>store.client.clientSearch);
    const dispatch = useDispatch();
    const resetHandle = ()=>{
      dispatch(addClientSearch({}))
    }

    return(
<div className="relative bg-slate-100 w-full " onClick={()=>dispatch(makeInvisible(false))}>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">DOB</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">MemberShip Plan</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Add table rows and data here */}
          {clients.map((data, index) => {
            return (
              <tr className="text-center my-10 group" key={index}>
                <td className="w-1/2">
                  <input
                    type="text"
                    value={data?.name}
                    className="text-center"
                    readOnly
                  />
                </td>
                <td className="py-2 px-4 border-b w-1/2">
                  <input
                    type="text"
                    value={data?.dateOfBirth?.substr(0,10)}
                    className="text-center w-1/2"
                    readOnly
                  />
                </td>
                <td className="py-2 px-4 border-b ">
                  <input
                    type="number"
                    value={data?.phone}
                    className="text-center "
                    readOnly
                  />
                  <td className="py-2 px-4 border-b ">
                  <input
                    type="text"
                    value={data?.email}
                    className="text-center"
                    readOnly
                  />
                </td>
                </td>
                <td className="py-2 px-4 border-b ">
                  <input
                    type="text"
                    value={data?.gymPlan}
                    className="text-center"
                    readOnly
                  />
                </td>
                
                <td className=" text-green-600 rounded-2xl">Active</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="cursor-pointer border-2 border-slate-300  hover:bg-purple-500 hover:text-white hover:font-medium duration-500 bg-purple-400 px-3 py-1 text-white rounded-lg m-5 absolute right-0" onClick={resetHandle}>Reset</button>
    </div>
    )
}