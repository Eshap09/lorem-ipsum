import React from 'react'
import {FaEdit,FaTrash} from 'react-icons/fa';
import './List.css';

const List = ({items,removeitem,edititem}) => {

 
  return (
    <div className="grocery-list">
      {
  
      items.map((item)=>{
        const {id,title}=item
        return (
          <article key={id} className="grocrery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button type="button" className="edit-btn" onClick={()=>edititem(id)}><FaEdit/></button>
              <button type="button" className="delete-btn" onClick={()=>removeitem(id)}><FaTrash/></button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List;