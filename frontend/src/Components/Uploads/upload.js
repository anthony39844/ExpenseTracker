import React, {useState} from 'react';
import { useGlobalContext } from '../../context/globalContext';

function Upload() {
    const [file, setFile] = useState()
    const {uploadFile} = useGlobalContext()


  
    function handleChange(event) {
      setFile(event.target.files[0])
    }
  
    
  
    const handleSubmit = async (event) =>{
      event.preventDefault()
  
  
      if (!file) {
        return;
      }
  
      try {
        uploadFile(file)
    } catch (err){
        console.log(err)
    }
}

  
    return (
        <div>
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange}/>
      <button>Upload</button>
    </form>
</div>

    )
}

export default Upload