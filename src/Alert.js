import React, { useEffect } from 'react'

import './Alert.css';

const Alert = ({type,msg,removealert,list}) => {

  useEffect(()=>{
     const timeout =setTimeout(()=>{
       removealert()
      //  by default in showalert function value of show is false
     },3000);
     return ()=>clearTimeout(timeout)
  },[list])

  return (
    <p className={`alert alert-${type}`}>{msg}</p>
  )
}

export default Alert;