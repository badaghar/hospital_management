import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_DISTRIBUTER_MUTATION = gql`
  mutation DeleteDistributerMutation($id: Int!) {
    deleteDistributer(id: $id) {
      id
    }
  }
`

const Distributer = ({ distributer }) => {
  const [deleteDistributer] = useMutation(DELETE_DISTRIBUTER_MUTATION, {
    onCompleted: () => {
      toast.success('Distributer deleted')
      navigate(routes.distributers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete distributer ' + id + '?')) {
      deleteDistributer({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Distributer {distributer.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{distributer.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{distributer.name}</td>
            </tr>
            <tr>
              <th>Phone no</th>
              <td>{distributer.phoneNo}</td>
            </tr>
            <tr>
              <th>Gst no</th>
              <td>{distributer.gstNo}</td>
            </tr>
            <tr>
              <th>Dl no</th>
              <td>{distributer.dlNo}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(distributer.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(distributer.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDistributer({ id: distributer.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(distributer.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Distributer
