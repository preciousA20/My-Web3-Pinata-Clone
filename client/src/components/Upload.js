import "./Upload.css"
import axios from 'axios'

import React,{ useState } from 'react'

const Upload = ({account, contract}) => {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState(null)
 // const [url, setUrl] = useState(JSON.parse(localStorage.getItem("picture")) || "")
  //console.log(url)
  const retrieve = (e) =>{
    const data = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(data)

    reader.onloadend = () =>{
      setFile(e.target.files[0])
    }
    // console.log(e.target.files[0].name)
    setFileName(e.target.files[0].name)
    e.preventDefault()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `
            f354b8b958f42e52a142`,
            pinata_secret_api_key: `
            ac8f1b8b9249f7db7771873c0fe06af5cded43855b76da687a1f0606f4a2dd05`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`
       // localStorage.setItem("picture", JSON.stringify(ImgHash))

        await contract.add(account,ImgHash);
        //window.location.reload()
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };




  



  return (
    <div className="top">
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="choose">Chose a File:</label>

            <input type="file" id="file-upload" name="file" onChange={retrieve} />

            <span className="textArea">
                Nothing
            </span>
            <button type="submit" className="upload">Upload File</button>
        </form>

        {/* <div style={{width: "200px", height: "250px", borderRadius: "10px", objectFit: "contain", display: "flex", alignSelf: "flex-end"}}>
          {
            url && (
              <img src={url} alt="image show" style={{width: "200px", height: "250px", borderRadius: "10px", objectFit: "contain"}}/>
            )
          }
        </div> */}
    </div>
  )
}

export default Upload