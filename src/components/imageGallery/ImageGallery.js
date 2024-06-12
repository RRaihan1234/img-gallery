import './imageGallery.css';
import allData from '../../../src/data.json'
import { useState } from 'react';

function ImageGallery() {

  const [images, setImages] = useState(allData.data);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleCheck = (id) => {
        for(let i = 0; i<images.length; i++){
          if(id===images[i].id){
            if(images[i].selected===false){
              images[i].selected=true
            }else{
              images[i].selected=false
            }
          }
        }
  }
  return (
    <div className="imageGallery">
        {images.map((image)=>{
           return(
                 <div key={image.id} className="singleImageDiv">
                    <img src={require(`../../../src/images/${image.image}`)} className='singleImage'></img>
                    <input type='checkbox' className='check' onChange={()=>handleCheck(image.id)}/>
                 </div>
           )
        })}
    </div>
  );
}

export default ImageGallery;