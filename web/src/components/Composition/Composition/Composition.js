import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_COMPOSITION_MUTATION = gql`
  mutation DeleteCompositionMutation($id: Int!) {
    deleteComposition(id: $id) {
      id
    }
  }
`

const Composition = ({ composition }) => {
  const [deleteComposition] = useMutation(DELETE_COMPOSITION_MUTATION, {
    onCompleted: () => {
      toast.success('Composition deleted')
      navigate(routes.compositions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete composition ' + id + '?')) {
      deleteComposition({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Composition {composition.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{composition.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{composition.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(composition.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(composition.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editComposition({ id: composition.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        {/* <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(composition.id)}
        >
          Delete
        </button> */}
      </nav>
    </>
  )
}

export default Composition
