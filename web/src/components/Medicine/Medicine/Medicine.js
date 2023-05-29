import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_MEDICINE_MUTATION = gql`
  mutation DeleteMedicineMutation($id: Int!) {
    deleteMedicine(id: $id) {
      id
    }
  }
`

const Medicine = ({ medicine }) => {
  const [deleteMedicine] = useMutation(DELETE_MEDICINE_MUTATION, {
    onCompleted: () => {
      toast.success('Medicine deleted')
      navigate(routes.medicines())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete medicine ' + id + '?')) {
      deleteMedicine({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Medicine {medicine.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{medicine.id}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>{medicine.quantity}</td>
            </tr>
            <tr>
              <th>Product Name</th>
              <td>{medicine.pid.name}</td>
            </tr>
            <tr>
              <th>Batch</th>
              <td>{medicine.batch}</td>
            </tr>
            <tr>
              <th>Exp</th>
              <td>{timeTag(medicine.exp)}</td>
            </tr>
            <tr>
              <th>Mrp</th>
              <td>{medicine.mrp}</td>
            </tr>
            <tr>
              <th>Sgst</th>
              <td>{medicine.sgst}</td>
            </tr>
            <tr>
              <th>Cgst</th>
              <td>{medicine.cgst}</td>
            </tr>
            <tr>
              <th>Discount</th>
              <td>{medicine.discount}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(medicine.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(medicine.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <nav className="rw-button-group">
        <Link
          to={routes.editMedicine({ id: medicine.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(medicine.id)}
        >
          Delete
        </button>
      </nav> */}
    </>
  )
}

export default Medicine
