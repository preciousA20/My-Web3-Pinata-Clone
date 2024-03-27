import { useEffect, useState } from "react";
import "./Modal.css";



const Modal = ({ setModelOpen, contract }) => {

  const [person, setPerson] = useState("")

  const shareAccess = async()=>{
    try {
      await contract.allow(person)
      alert("Access Shared")
    } catch (error) {
      alert(error)
    }finally{
      setModelOpen(false)
    }
  }


  useEffect(()=>{
    const handleAccessList = async()=>{
      const accessList = await contract.shareAccess()
      const options = accessList 
      const select = document.querySelector("#selectNumber")
  
      for(let i = 0; i < options.length; i++){
        let opt = options[i]
        console.log(opt)
        const option = document.createElement("option")
        option.textContent = opt[0] 
        option.setAttribute("value", opt[0])
        select.appendChild(option)
      }
    }
    contract && handleAccessList()
  },[contract])
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
              onChange={(e)=>setPerson(e.target.value)}
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={()=>setModelOpen(false)}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={shareAccess}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;