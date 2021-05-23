import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import './App.css';

const getlocalstorage=()=>{
  let list=localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return [];
  }
}

function App() {

  const[name,setname]=useState('');
  const[list,setlist]=useState(getlocalstorage());
  const[isedit,setisedit]=useState(false);
  const[editid,seteditid]=useState(null);
  const[alert,setalert]=useState({show:false, msg:'',type:''})


  const handlesubmit=(e)=>{
    e.preventDefault();
    if(!name){
      // display alert
      showalert(true,'danger','Please enter value')
    }
    else if(name && isedit){
      // deal with edit
      
      setlist(list.map((item)=>{
        if(item.id===editid){
          return {...item,title:name}
        }
        return item;
      }))
      setname('');
      setisedit(false);
      seteditid(null);
      showalert(true,'success','Value changed');
    }
    else{
      // show alert
      const newitem={ id:new Date().getTime().toString(), title:name };
      showalert(true,'success','Item added successfully');
      setlist([newitem,...list]);
      setname('');
    }

  }

  const showalert=(show=false,type="",msg="")=>{
    setalert({show:show,type:type,msg:msg})
  }

 const clearlist=()=>{
   showalert(true,'danger','Empty list');
   setlist([]);
 }

 const removeitem=(id)=>{
    showalert(true,'danger','Item removed');
    setlist(list.filter((item)=> item.id!==id))
 }

const edititem=(id)=>{
   const specificitem =list.find((item)=> item.id === id);
   setisedit(true);
   seteditid(id);
   setname(specificitem.title);
}

useEffect(()=>{
  localStorage.setItem('list',JSON.stringify(list));
},[list])


  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handlesubmit}>
        {alert.show && <Alert {...alert} removealert={showalert} list={list}/>}
        <h3>Grocery LIST</h3>
        <div className="form-control">
          <input type="text" className="form-input"
           placeholder="e.g eggs"
           value={name}
           onChange={(e)=>setname(e.target.value)}/>
          <button type="submit" className="submit-btn">{isedit? "Edit":"Submit"}</button>
        </div>
      </form>
      {list.length >0 && 
      <div className="grocery-container">
        <List items={list} removeitem={removeitem} edititem={edititem}/>
        <button className="clear-btn" onClick={clearlist}>Clear Items</button>
      </div>
     }      
    </section>
  )
}

export default App