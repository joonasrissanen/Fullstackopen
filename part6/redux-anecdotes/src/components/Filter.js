import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  const handleChange = (event) => {
    event.preventDefault()
    dispatch(filterChange(event.target.value))
    setInput(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={input} onChange={handleChange} />
    </div>
  )
}

export default Filter