import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER_INFO } from '../queries'

const Recommend = ({ show }) => {
  const resultUser = useQuery(USER_INFO)
  const result = useQuery(ALL_BOOKS)
  const [user, setUser] = useState(null)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (resultUser.data && resultUser.data.me) {
      setUser(resultUser.data.me)
    }
  }, [resultUser.data])

  useEffect(() => {
    if (result.data && result.data.allBooks) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!show) {
    return null
  }

  return (
      <div>
        <h2>Recommendations</h2>
        <div>books in your favorite genre <strong>{user.favoriteGenre}</strong></div>
        <table>
          <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
            .filter(b => b.genres.includes(user.favoriteGenre))
            .map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
  )
}

export default Recommend;