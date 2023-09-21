import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ItemsContainer from './components/Items/ItemsContainer';
import CommentsContainer from './components/Comments/CommentsContainer';

function App() {
  const [ itemsInfo, setItemsInfo ] = useState(null)
  const [ inputsValue, setInputsValue ] = useState({nameOfItem: "", comments: "", color: "#000000"})
  const [ commentInfo, setCommentInfo ] = useState(null)
  const [ deletedItem, setDeletedItem ] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  useEffect(()=>{
    axios.get("./items.json")
    .then(res=>{
      let data = res.data;
      if(localStorage.allInfo && localStorage.allInfo != "[]"){
        setItemsInfo(JSON.parse(localStorage.allInfo))
      }
      else{
        setItemsInfo(data)
      }
    })  
  }, [])
  useEffect(()=>{
    if(itemsInfo){ // if we have items create comments of first item
      setCommentInfo([...itemsInfo].filter((item,index)=> index === Number(activeItem)))
      localStorage.setItem('allInfo', JSON.stringify(itemsInfo))
    }

    
  }, [itemsInfo, activeItem])
  const changeInputValue = (e) => { // control inputs value
        let elem = e.target;
        setInputsValue({...inputsValue, [elem.name]: elem.value})
  }
  const changeActiveId = (id) => { 
    setActiveItem(id)
  }
  const addItem = () => { //add new item without comments
    if(inputsValue.nameOfItem === ""){
      return false
    }
    else{
      let newObj = {name: inputsValue.nameOfItem, comment: [], itemId: [...itemsInfo].length}
      setItemsInfo([...itemsInfo, newObj])
      inputsValue.nameOfItem = ""
      
    }
  }
  const removeItem = (e) => { //remove item in state
      let elem = e.target;
      if(e && e.stopPropagation) e.stopPropagation();
      // if id of item same of item in array remove it in list
        setItemsInfo([...itemsInfo].filter((item,index)=>index != Number(elem.dataset.index)))
      if(itemsInfo.length == 1){
        setActiveItem(0)
        setCommentInfo(null)

      }
      else{
        setActiveItem(0)
      }
      
      setDeletedItem(true)
    }
    const addComment = () => { // function to add comments to item
      setItemsInfo( [...itemsInfo].map((item, index)=>{
        if(index === Number(activeItem)){
          let newObj = `${inputsValue.color} ${inputsValue.comments}`
          let newArrayOfComments = [...item.comment, newObj]
            item.comment = newArrayOfComments; 
        
        }
        return item

      }))
      inputsValue.color = "#000000"
      inputsValue.comments = ""
    }
  
  return (
    <div className="App">      
          <ItemsContainer changeActiveId={changeActiveId} removeItem={removeItem} itemsInfo={itemsInfo} addItem={addItem} inputValue={inputsValue.nameOfItem} inputChange={changeInputValue} />
          {commentInfo ? <CommentsContainer addComment={addComment} commentInfo={commentInfo} valueOfInputs={inputsValue} changeInputValue={changeInputValue} /> : <p>Loading...</p>}
          
    </div>
  );
}

export default App;
