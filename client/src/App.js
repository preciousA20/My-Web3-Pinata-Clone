import { ethers } from 'ethers'
import { useState, useEffect} from 'react'
import contractABI from './artifacts/contracts/Upload.sol/Upload.json'
import './App.css';
import Upload from "./components/Upload"
import Display from './components/Display'
import Modal from './components/Modal'

function App() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const [account, setAccount] = useState("")
  const [contract, setContract] = useState(null)
  const [provider, setProvider] = useState(null)
  const [modelOpen, setModelOpen] = useState(false)
  const [balance, setBalance] = useState(0)
  
  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    
    const wallet = async()=>{
      if(provider){

        window.ethereum.on("accountsChanged", ()=>{
          window.location.reload()
        })

        window.ethereum.on("chainChanged", ()=>{
          window.location.reload()
        })
        await provider.send("eth_requestAccounts",[])
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setAccount(address)
        //console.log(address)

        const contract = new ethers.Contract(contractAddress, contractABI.abi, signer)
        //console.log(contract)
        setContract(contract)
        setProvider(signer)
      }
    }

   provider && wallet()
  }, [])

  return (
    <div className="App">

      {
        !modelOpen && (
          <button onClick={()=>setModelOpen(true)} className='share'>Share Access</button>
        )
      }

      {modelOpen && (
        <Modal setModelOpen={setModelOpen} contract={contract}/>
      )}
     <h1 style={{color: "white"}}>Google drive Version 3.0</h1>
     <div className='bg'></div>
     <div className='bg bg2'></div>
     <div className='bg bg3'></div>

     <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
      <p style={{color: "black", width: "600px", fontSize: 20, backgroundColor: "blue", border: "5px solid white", borderRadius: "5px"}}>
         
      <>Account: {account}</>
        
      </p>
     </div>
     
      <Upload 
        account={account} 
        contract={contract}
      />

      <Display account={account} contract={contract}/>
    </div>
  );
}

export default App;
