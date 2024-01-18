import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_DOSSAGE_MUTATION = gql`
  mutation DeleteDossageMutation($id: Int!) {
    deleteDossage(id: $id) {
      id
    }
  }
`

const Dossage = ({ dossage }) => {
  const [deleteDossage] = useMutation(DELETE_DOSSAGE_MUTATION, {
    onCompleted: () => {
      toast.success('Dossage deleted')
      navigate(routes.dossages())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete dossage ' + id + '?')) {
      deleteDossage({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Dossage {dossage.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{dossage.id}</td>
            </tr>
            <tr>
              <th>Dose</th>
              <td>{dossage.dose}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(dossage.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(dossage.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(dossage.extra)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDossage({ id: dossage.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(dossage.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Dossage
