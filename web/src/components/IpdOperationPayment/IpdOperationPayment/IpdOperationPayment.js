import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_IPD_OPERATION_PAYMENT_MUTATION = gql`
  mutation DeleteIpdOperationPaymentMutation($id: Int!) {
    deleteIpdOperationPayment(id: $id) {
      id
    }
  }
`

const IpdOperationPayment = ({ ipdOperationPayment }) => {
  const [deleteIpdOperationPayment] = useMutation(
    DELETE_IPD_OPERATION_PAYMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdOperationPayment deleted')
        navigate(routes.ipdOperationPayments())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete ipdOperationPayment ' + id + '?')
    ) {
      deleteIpdOperationPayment({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            IpdOperationPayment {ipdOperationPayment.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ipdOperationPayment.id}</td>
            </tr>
            <tr>
              <th>Operation name</th>
              <td>{ipdOperationPayment.operation_name}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{ipdOperationPayment.amount}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(ipdOperationPayment.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(ipdOperationPayment.updated_at)}</td>
            </tr>
            <tr>
              <th>Ipd id</th>
              <td>{ipdOperationPayment.ipdId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editIpdOperationPayment({ id: ipdOperationPayment.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ipdOperationPayment.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default IpdOperationPayment
