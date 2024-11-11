import PropTypes from 'prop-types'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS } from '../queries'


const AddBook = ({ show }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState('')
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    addBook({ variables: { title, author, published: parseInt(published), genres } })
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
  }
  
  if (!show) return null

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={submit}>
      <input value={title} onChange={({ target }) => setTitle(target.value)} placeholder="Title" />
        <input value={author} onChange={({ target }) => setAuthor(target.value)} placeholder="Author" />
        <input value={published} onChange={({ target }) => setPublished(target.value)} placeholder="Published" />
        <input value={genres} onChange={({ target }) => setGenres(target.value.split(','))} placeholder="Genres" />
        <button type="submit">Add Book</button>
      </form>
    </div>
  )
}

AddBook.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default AddBook