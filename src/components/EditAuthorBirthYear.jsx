import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthorBirthYear = ({ authors }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.error('Error editing author birth year:', error.graphQLErrors);
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, setBornTo: Number(born) } });
    setName('');
    setBorn('');
  }

  return (
    <div>
      <h2>Edit Author Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          <label>Author:</label>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value="" disabled>Select author</option>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Born:</label>
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

EditAuthorBirthYear.propTypes = {
  show: PropTypes.bool.isRequired,
  map: PropTypes.bool.isRequired,
  authors: PropTypes.bool.isRequired,
}

export default EditAuthorBirthYear