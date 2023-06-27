import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_OPERATION_MUTATION = gql`
  mutation DeleteOperationMutation($id: Int!) {
    deleteOperation(id: $id) {
      id
    }
  }
`

const Operation = ({ operation }) => {
  const [deleteOperation] = useMutation(DELETE_OPERATION_MUTATION, {
    onCompleted: () => {
      toast.success('Operation deleted')
      navigate(routes.operations())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete operation ' + id + '?')) {
      deleteOperation({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Operation {operation.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{operation.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{operation.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(operation.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(operation.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editOperation({ id: operation.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(operation.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Operation
