import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Duration/DurationsCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_DURATION_MUTATION = gql`
  mutation DeleteDurationMutation($id: Int!) {
    deleteDuration(id: $id) {
      id
    }
  }
`

const DurationsList = ({ durations }) => {
  const [deleteDuration] = useMutation(DELETE_DURATION_MUTATION, {
    onCompleted: () => {
      toast.success('Duration deleted')
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
    if (confirm('Are you sure you want to delete duration ' + id + '?')) {
      deleteDuration({ variables: { id } })
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
          {durations.map((duration) => (
            <tr key={duration.id}>
              <td>{truncate(duration.id)}</td>
              <td>{truncate(duration.name)}</td>
              <td>{timeTag(duration.created_at)}</td>
              <td>{timeTag(duration.updated_at)}</td>
              <td>{jsonTruncate(duration.extra)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.duration({ id: duration.id })}
                    title={'Show duration ' + duration.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editDuration({ id: duration.id })}
                    title={'Edit duration ' + duration.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete duration ' + duration.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(duration.id)}
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

export default DurationsList
