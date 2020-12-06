import React, { useState } from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  const [input, setInput] = useState('')
  const handleChange = (event) => {
    event.preventDefault()
    props.filterChange(event.target.value)
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

const connectedFilter = connect(null, { filterChange })(Filter)

export default connectedFilter
