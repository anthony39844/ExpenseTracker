import React, { useState, useRef } from 'react';
import avatar from '../../img/avatar.png'
import '../../styles/ProfileIcon.css'

function ProfileIcon() {
  const [imageSrc, setImageSrc] = useState(avatar);
  const fileInputRef = useRef(null); // allows us to click the image and have the inputs effect

  const handleImageClick = () => { 
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);  
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <img 
        src={imageSrc} 
        alt="Click to change profile" 
        onClick={handleImageClick} 
      />
      <input 
        className='change-img'
        type="file" 
        ref={fileInputRef}  
        onChange={handleFileChange} 
        accept="image/*"
      />
    </div>
  );
}

export default ProfileIcon;
