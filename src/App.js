
import './App.css';
import allData from '../src/data.json'
import { useState } from 'react';

function App() {
  const [images, setImages] = useState(allData.data);
  const [deletableArray] = useState([]);
  const [, setRender] = useState(false);

  const handleCheck = (id) => {
        for(let i = 0; i<images.length; i++){
          if(id===images[i].id){
            if(images[i].selected===false){
              images[i].selected=true
              deletableArray.push(1)
            }else{
              images[i].selected=false
              deletableArray.length = deletableArray.length - 1;
            }
          }
        }
        setRender((prevState)=>!prevState)
  }

  const handleDelete = () => {
        let imagesAfterDeletion = images.filter((image)=>image.selected===false);
        setImages(imagesAfterDeletion);
        deletableArray.length=0;
  }

  const handleDragStart = (e, id) => {
        e.dataTransfer.setData("text/plain", id.toString());
  }

  const handleDragEnd = (e) => {
        e.dataTransfer.clearData();
  }

  const handleDrop = (e, dropId) => {
    setRender((prevState)=>!prevState)
    e.preventDefault();
    const dragId = e.dataTransfer.getData("text/plain");
    let dragIdIndex = images.findIndex((image)=>image.id === Number(dragId))
    let dropIdIndex = images.findIndex((image)=>image.id === dropId)
    if(dragIdIndex === dropIdIndex || Number(dragId) === allData.data.length - 1 || dropId === allData.data.length - 1){
      setImages(images)
    }else if(dragIdIndex > dropIdIndex){
      let tmp = images[dragIdIndex]
      let i;
      for(i = dragIdIndex; i>=dropIdIndex; i--){
         images[i] = images[i-1]
      }
      images[dropIdIndex]=tmp;
    }else{
      let tmp = images[dragIdIndex]
      let i;
      for(i = dragIdIndex; i<=dropIdIndex; i++){
         images[i] = images[i+1]
      }
      images[dropIdIndex]=tmp;
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
       <div className="parentDiv">
          <div className='topSection'>
              <div className="topSectionHeading">
                  {deletableArray.length === 0 && <h3>Gallery</h3>}
                  {deletableArray.length > 0 && <div className="topDelete">
                      <div>
                        <input type='checkbox' checked readOnly/>
                        {deletableArray.length === 1 && <h3 className="leftText">1 file Selected</h3>}
                        {deletableArray.length > 1 && <h3 className="leftText">{deletableArray.length} files Selected</h3>}
                      </div>
                      <div>
                        {deletableArray.length === 1 && <h3 className="rightText" onClick={handleDelete}>Delete file</h3>}
                        {deletableArray.length > 1 && <h3 className="rightText" onClick={handleDelete}>Delete files</h3>}
                      </div>
                  </div>}
              </div>
              <div className="topSectionLine"></div>
          </div>
          <div className="imageGallery">
        {images.map((image)=>{
           return(
                 <>
                    {image.id!==allData.data.length - 1 && 
                    <div 
                    draggable 
                    onDragStart = {(e)=>handleDragStart(e, image.id)}
                    onDragEnd = {handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, image.id)}
                    key={image.id} 
                    className={image.selected?"singleImageDivShadow":"singleImageDiv"}>
                    <img src={require(`../src/images/${image.image}`)} className={image.selected?'singleImageShadow':'singleImage'}></img>
                    <input type='checkbox' className={image.selected?'showCheck':'check'} onChange={()=>handleCheck(image.id)}/>
                   </div>}
                    {image.id===allData.data.length - 1 && 
                    <div key={image.id} 
                    className="addImageDiv"
                    onDragStart = {(e)=>handleDragStart(e, image.id)}
                    onDragEnd = {handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, image.id)}>
                    <img src={require(`../src/images/${image.image}`)} className='addImage'></img>
                   </div>}
                 </>
           )
        })}
    </div>
       </div>
    </div>
  );
}

export default App;
