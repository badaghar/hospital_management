import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_RETURN_EXPIRY_MEDICINE_MUTATION = gql`
  mutation DeleteReturnExpiryMedicineMutation($id: Int!) {
    deleteReturnExpiryMedicine(id: $id) {
      id
    }
  }
`

const ReturnExpiryMedicine = ({ returnExpiryMedicine,dname }) => {
  const [deleteReturnExpiryMedicine] = useMutation(
    DELETE_RETURN_EXPIRY_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ReturnExpiryMedicine deleted')
        navigate(routes.returnExpiryMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )


  console.log(returnExpiryMedicine)
  const onDeleteClick = (id) => {
    if (
      confirm(
        'Are you sure you want to delete returnExpiryMedicine ' + id + '?'
      )
    ) {
      deleteReturnExpiryMedicine({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ReturnExpiryMedicine {returnExpiryMedicine.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            {/* <tr>
              <th>Id</th>
              <td>{returnExpiryMedicine.id}</td>
            </tr> */}
            <tr>
              <th>Distributer Name</th>
              <td>{dname.name}</td>
            </tr>
            <tr>
              <th>Medicine</th>
              <td>{jsonDisplay(returnExpiryMedicine.medicine)}</td>
            </tr>
            <tr>
              <th>Return med</th>
              <td>{checkboxInputTag(returnExpiryMedicine.return_med)}</td>
            </tr>
            {/* <tr>
              <th>Created at</th>
              <td>{timeTag(returnExpiryMedicine.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(returnExpiryMedicine.updated_at)}</td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        {/* <Link
          to={routes.editReturnExpiryMedicine({ id: returnExpiryMedicine.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link> */}
        {/* <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(returnExpiryMedicine.id)}
        >
          Delete
        </button> */}
      </nav>
    </>
  )
}

export default ReturnExpiryMedicine
