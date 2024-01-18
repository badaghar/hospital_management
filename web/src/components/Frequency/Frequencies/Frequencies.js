import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Frequency/FrequenciesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_FREQUENCY_MUTATION = gql`
  mutation DeleteFrequencyMutation($id: Int!) {
    deleteFrequency(id: $id) {
      id
    }
  }
`

const FrequenciesList = ({ frequencies }) => {
  const [deleteFrequency] = useMutation(DELETE_FREQUENCY_MUTATION, {
    onCompleted: () => {
      toast.success('Frequency deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete frequency ' + id + '?')) {
      deleteFrequency({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Extra</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {frequencies.map((frequency) => (
            <tr key={frequency.id}>
              <td>{truncate(frequency.id)}</td>
              <td>{truncate(frequency.name)}</td>
              <td>{timeTag(frequency.created_at)}</td>
              <td>{timeTag(frequency.updated_at)}</td>
              <td>{jsonTruncate(frequency.extra)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.frequency({ id: frequency.id })}
                    title={'Show frequency ' + frequency.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editFrequency({ id: frequency.id })}
                    title={'Edit frequency ' + frequency.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete frequency ' + frequency.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(frequency.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FrequenciesList
