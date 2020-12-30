import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';


const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [selectedAuthor, setAuthor] = useState(null)
  const [authors, setAuthors] = useState([])
  const [year, setYear] = useState('')
  const [error, setError] = useState('');
  const [ changeBorn, resultBorn ] = useMutation(EDIT_AUTHOR)
  useEffect(() => {
    if (resultBorn.data && resultBorn.data.editBorn === null) {
      setError('Author not found')
    }
  }, [resultBorn.data])
  useEffect(() => {
    if (result.data && result.data.allAuthors) {
      setAuthors(result.data.allAuthors);
      setAuthor(result.data.allAuthors[0].name)
    }
  }, [result.data])
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const updateAuthor = (e) => {
    e.preventDefault()
    changeBorn({ variables: { name: selectedAuthor, born: Number(year) }})
    setYear('')
  }
  return (
    <div>
      <h2>authors</h2>
      {error && <div>{error}</div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={updateAuthor}>
        <select onChange={e => setAuthor(e.target.value)}>
          {authors.map(author => <option key={author.id} value={author.name}>{author.name}</option>)}
        </select>
        <div>
          born <input value={year} onChange={e => setYear(e.target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
