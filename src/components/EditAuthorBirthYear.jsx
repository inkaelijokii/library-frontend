import { useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { useMutation, useQuery, gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const EditAuthorBirthYear = ({ show }) => {
  const { data } = useQuery(ALL_AUTHORS)
  const [year, setYear] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: ['ALL_AUTHORS'],
  })

  if (!show) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedAuthor) {
      editAuthor({ variables: { name: selectedAuthor.value, setBornTo: parseInt(year) } })
      setSelectedAuthor(null)
      setYear('')
    }
  }

  const options = data?.allAuthors.map(author => ({ value: author.name, label: author.name }))

  return (
    <div>
      <h2>Edit Author Birth Year</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Select options={options} value={selectedAuthor} onChange={setSelectedAuthor} />
        </div>
        <div>
          Born: <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <button type="submit">Update Birth Year</button>
      </form>
    </div>
  )
}

EditAuthorBirthYear.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default EditAuthorBirthYear