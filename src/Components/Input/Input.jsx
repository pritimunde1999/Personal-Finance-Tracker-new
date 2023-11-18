import React from 'react'
import './input.css'

const Input = ({type,label, user,value, setUser, placeholder,name}) => {
  return (
    <div className='input-wrapper'>
        <p className='input-label'>{label}</p>
        <input
           className='custom-input'
           name={name}
           type={type}
           value={value}
           placeholder={placeholder}
           required
           onChange={(e)=>setUser({...user,[e.target.name]:e.target.value.trim()})}
         />

         
    </div>
  )
}

export default Input