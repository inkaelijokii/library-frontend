import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS } from '../queries'


const AddBook = ({ show }) => {
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
  })

  if (!show) return null

  const submit = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const published = Number(event.target.published.value)
    const genres = event.target.genres.value.split(",")

    addBook({ variables: { title, author, published, genres } })
  }

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={submit}>
        <div>Title: <input name='title' /></div>
        <div>Author: <input name='author' /></div>
        <div>Published: <input name='published' type="number" /></div>
        <div>Genres: <input name='genres' /></div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  )
}

AddBook.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default AddBook