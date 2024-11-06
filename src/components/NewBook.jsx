import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, gql } from '@apollo/client'

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
    }
  }
`

const AddBook = ({ show }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState('')
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: ['ALL_BOOKS', 'ALL_AUTHORS'],
  })

  if (!show) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const genreArray = genres.split(',').map(g => g.trim())
    addBook({ variables: { title, author, published: parseInt(published), genres: genreArray } })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres('')
  }

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>Title: <input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
        <div>Author: <input value={author} onChange={(e) => setAuthor(e.target.value)} /></div>
        <div>Published: <input type="number" value={published} onChange={(e) => setPublished(e.target.value)} /></div>
        <div>Genres (comma-separated): <input value={genres} onChange={(e) => setGenres(e.target.value)} /></div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  )
}

AddBook.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default AddBook