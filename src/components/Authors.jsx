import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const Authors = ({ show }) => {
  const { data, loading, error } = useQuery(ALL_AUTHORS)

  if (!show) return null
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading authors</p>

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {data.allAuthors.map(author => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born || "Unknown"}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Authors.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Authors