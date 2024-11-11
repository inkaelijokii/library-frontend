import { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null);
  const { data, loading, error } = useQuery(ALL_BOOKS, {
    variables: { genre },
    fetchPolicy: "cache-and-network",
  })

  if (!show) return null
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading books</p>

  const books = data?.data.allBooks || [] 
  const genres = [...new Set(books.flatMap((book) => book.genres))]

  return (
    <div>
      <h2>Books</h2>
      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Books