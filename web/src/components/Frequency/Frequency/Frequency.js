import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_FREQUENCY_MUTATION = gql`
  mutation DeleteFrequencyMutation($id: Int!) {
    deleteFrequency(id: $id) {
      id
    }
  }
`

const Frequency = ({ frequency }) => {
  const [deleteFrequency] = useMutation(DELETE_FREQUENCY_MUTATION, {
    onCompleted: () => {
      toast.success('Frequency deleted')
      navigate(routes.frequencies())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete frequency ' + id + '?')) {
      deleteFrequency({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Frequency {frequency.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{frequency.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{frequency.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(frequency.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(frequency.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(frequency.extra)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFrequency({ id: frequency.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(frequency.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Frequency
