import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_RETURN_MEDICINE_MUTATION = gql`
  mutation DeleteReturnMedicineMutation($id: Int!) {
    deleteReturnMedicine(id: $id) {
      id
    }
  }
`

const ReturnMedicine = ({ returnMedicine }) => {
  const [deleteReturnMedicine] = useMutation(DELETE_RETURN_MEDICINE_MUTATION, {
    onCompleted: () => {
      toast.success('ReturnMedicine deleted')
      navigate(routes.returnMedicines())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete returnMedicine ' + id + '?')) {
      deleteReturnMedicine({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ReturnMedicine {returnMedicine.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{returnMedicine.id}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(returnMedicine.date)}</td>
            </tr>
            <tr>
              <th>Medicine</th>
              <td>{jsonDisplay(returnMedicine.medicine)}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{returnMedicine.total}</td>
            </tr>
            <tr>
              <th>Discount</th>
              <td>{returnMedicine.discount}</td>
            </tr>
            <tr>
              <th>Sgst</th>
              <td>{returnMedicine.sgst}</td>
            </tr>
            <tr>
              <th>Cgst</th>
              <td>{returnMedicine.cgst}</td>
            </tr>
            <tr>
              <th>Grand total</th>
              <td>{returnMedicine.grand_total}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(returnMedicine.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(returnMedicine.updated_at)}</td>
            </tr>
            <tr>
              <th>Patient id</th>
              <td>{returnMedicine.patientId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editReturnMedicine({ id: returnMedicine.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(returnMedicine.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ReturnMedicine
