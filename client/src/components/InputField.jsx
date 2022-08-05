import React from 'react'

const InputField = ({type, name, value, placeholder, onChange, label}) => {
  return (
    <div className='w-full flex flex-col gap-0.5 my-4'>
      <label htmlFor={name}>{label}</label>
      <div className='w-full h-9 md:h-11 p-2 border-1 border-slate-300 focus-within:border-slate-600'>
        <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} className='w-full h-full outline-none placeholder:italic' />
      </div>
    </div>
  )
}

export default InputField