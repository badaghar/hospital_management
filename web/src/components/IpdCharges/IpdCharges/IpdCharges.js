import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_IPD_CHARGES_MUTATION = gql`
  mutation DeleteIpdChargesMutation($id: Int!) {
    deleteIpdCharges(id: $id) {
      id
    }
  }
`

const IpdCharges = ({ ipdCharges }) => {
  const [deleteIpdCharges] = useMutation(DELETE_IPD_CHARGES_MUTATION, {
    onCompleted: () => {
      toast.success('IpdCharges deleted')
      navigate(routes.ipdChargeses())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ipdCharges ' + id + '?')) {
      deleteIpdCharges({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            IpdCharges {ipdCharges.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ipdCharges.id}</td>
            </tr>
            <tr>
              <th>Charge type</th>
              <td>{ipdCharges.charge_type}</td>
            </tr>
            <tr>
              <th>Charge</th>
              <td>{ipdCharges.charge}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>{ipdCharges.quantity}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{ipdCharges.total}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(ipdCharges.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(ipdCharges.updated_at)}</td>
            </tr>
            <tr>
              <th>Ipd id</th>
              <td>{ipdCharges.ipdId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editIpdCharges({ id: ipdCharges.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ipdCharges.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default IpdCharges
