import React, { useState, useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setGenre] = useState(null)

  const activeStyle = {
    background: 'blue',
    color: '#fff'
  }

  useEffect(() => {
    if (result.data && result.data.allBooks) {
      setBooks(result.data.allBooks)
      const genres =
        [].concat.apply([], result.data.allBooks.map(book => book.genres))
        .filter((value, index, self) => self.indexOf(value) === index)
      setGenres(genres)
    }
  }, [result.data])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const data = subscriptionData.data.bookAdded
      window.alert(`Added book ${data.title} by ${data.author.name}`)
    }
  })

  const handleGenreSelect = (genre) => {
    if (selectedGenre === genre) {
      return setGenre(null)
    }
    setGenre(genre)
  }

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

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
            .filter(b => selectedGenre ? b.genres.includes(selectedGenre) : true)
            .map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre =>
          <button
            key={`genrelist-${genre}`}
            style={selectedGenre === genre ? activeStyle : null}
            onClick={() => handleGenreSelect(genre)}
          >
            {genre}
          </button>)}
      </div>
    </div>
  )
}

export default Books