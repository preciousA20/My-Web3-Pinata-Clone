import "./Display.css"
import React,{ useState, useEffect } from 'react'

const Display = ({account, contract}) => {
  const [data, setData] = useState([])

 
  const handleGet = async()=>{
    const otherAddress = document.querySelector(".address").value 
    if(otherAddress){
      console.log(otherAddress)
      const results = await contract.display(otherAddress)
      setData(results)
    }else{
      const results = await contract.display(account)
      setData(results)
    }
    //const results = await contract.display(account) 
    //window.location.reload()
   
  }

  return (
    <>
        <div className="image-list">
        {
          data && (
            <>
            {data.map((item, index)=>(
              <a href={item} key={`a-${index}`} target="_blank" rel="noopener noreferrer">
                 <img src={item}  key={`image-${index}`} className="image-list"/> 
              </a>
            ))}
            </>
          )
        }
        </div>

        <input type="text"
        placeholder="Enter address..."
        className="address"
        />

        <button className="center button" onClick={handleGet}>Get Data</button>
    </>
  )
}

export default Display
