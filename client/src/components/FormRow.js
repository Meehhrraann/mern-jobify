import React from 'react'

export default function FormRow({type, name, value, handleChange, labelText}) {
  return (
    <div className="form-row">
        <label className="form-label" htmlFor={name}>{labelText || name}</label>

        <input 
            className='form-input'
            type={type} 
            name={name} 
            value={value}
            onChange={handleChange}
        />
    </div>
  )
}
