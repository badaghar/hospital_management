import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_DURATION_MUTATION = gql`
  mutation DeleteDurationMutation($id: Int!) {
    deleteDuration(id: $id) {
      id
    }
  }
`

const Duration = ({ duration }) => {
  const [deleteDuration] = useMutation(DELETE_DURATION_MUTATION, {
    onCompleted: () => {
      toast.success('Duration deleted')
      navigate(routes.durations())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete duration ' + id + '?')) {
      deleteDuration({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Duration {duration.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{duration.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{duration.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(duration.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(duration.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(duration.extra)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDuration({ id: duration.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(duration.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Duration
