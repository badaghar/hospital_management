import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_HOMO_MEDICINE_MUTATION = gql`
  mutation DeleteHomoMedicineMutation($id: Int!) {
    deleteHomoMedicine(id: $id) {
      id
    }
  }
`

const HomoMedicine = ({ homoMedicine }) => {
  const [deleteHomoMedicine] = useMutation(DELETE_HOMO_MEDICINE_MUTATION, {
    onCompleted: () => {
      toast.success('HomoMedicine deleted')
      navigate(routes.homoMedicines())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete homoMedicine ' + id + '?')) {
      deleteHomoMedicine({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            HomoMedicine {homoMedicine.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{homoMedicine.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{homoMedicine.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(homoMedicine.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(homoMedicine.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(homoMedicine.extra)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editHomoMedicine({ id: homoMedicine.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(homoMedicine.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default HomoMedicine
