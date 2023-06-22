import { useState } from "react";
import useStorage from "../hooks/useStorage";
import InputformComp from "./InputFormComp";


const ImageFirebaseUpload = ({ setShowModel , handleUrl }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [altText, setAltText] = useState("")
  const [imgName, setImgName] = useState("")
  const [finalUploadFile, setFinalUploadFile] = useState()
  // My custom HOOK
  const {progress, url, error: error2} = useStorage(finalUploadFile);

  const types = ["image/png", "image/jpeg"];
  if(progress == 100){
    if(handleUrl) handleUrl(url)
    setTimeout(()=>{
      setShowModel(false)
    },2000)
    
  }
  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    setError(null);
    if (selectedFile && types.includes(selectedFile.type)) {
      console.log(selectedFile);
      setFile(selectedFile);
    } else {
      setError("please upload JPEG or PNG file");
    }
  };
// console.log(file.name)
  const handleUploadImage = () =>{
    if(!file ){
      return setError("Please select a Valid File")
    }
    const ALT_TEXT = altText || file.name;
    const IMG_NAME = imgName || file.name;
    setFinalUploadFile(file)
  }
  return (
    <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div class="bg-white px-16 py-14 rounded-md text-center">
        <h1 class="text-xl mb-4 font-bold text-slate-500 text-center">
          Add Image
        </h1>
        <input type="file" onChange={handleFileInput} className="m-4"></input>
        <div className="output">
          {error && <p className="text-red-500">{error}</p>}
          {/* {file && } */}
          {file && (
            <div className="flex flex-row flex-1 align-middle">
              <img 
                className="h-56"
                src={URL.createObjectURL(file)} />
              
            </div>
          )}
        </div>
        <button
          class="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
          onClick={() => setShowModel(false)}
        >
          Cancle
        </button>
        <button class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={()=> handleUploadImage()}>
          Upload
        </button>
        {progress && <div className="w-full bg-gray-200 rounded-full">
            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{width: `${progress}%`}}> {progress}%</div>
        </div>}
        {progress==100 && <h2>Done </h2>}
      </div>
    </div>
  );
};

export default ImageFirebaseUpload;
