import React, { useState } from 'react'
import './App.css'
import data from './data';

function App() {

  const[count,setcount]=useState(1);
  const[text,settext]=useState([]);

  const handlesubmit=(e)=>{
    e.preventDefault();
    let amount=count;
    if(count<=0)
    {
      amount=1;
    }
    if(count>8)
    {
      amount=8;
    }
    settext(data.slice(0,amount));
    
  }

  return (
     <section className="section-center">
       <h3 className="title">Tired of boring lorem ipsum?</h3>
       <form className="lorem-form" onSubmit={handlesubmit}>
         <h4>Paragraphs:</h4>
         <input type="number" value={count} onChange={(e)=>setcount(e.target.value)}/>
         <button type="submit">Generate</button>
       </form>
       <article className="lorem-text">
         {text.map((item,index)=>{
            return (
              <p key={index}>{item}</p>
            )
         })}
       </article>
     </section>
  )
}

export default App
