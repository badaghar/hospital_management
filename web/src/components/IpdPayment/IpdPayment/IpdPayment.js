import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_IPD_PAYMENT_MUTATION = gql`
  mutation DeleteIpdPaymentMutation($id: Int!) {
    deleteIpdPayment(id: $id) {
      id
    }
  }
`

const IpdPayment = ({ ipdPayment }) => {
  const [deleteIpdPayment] = useMutation(DELETE_IPD_PAYMENT_MUTATION, {
    onCompleted: () => {
      toast.success('IpdPayment deleted')
      navigate(routes.ipdPayments())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ipdPayment ' + id + '?')) {
      deleteIpdPayment({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            IpdPayment {ipdPayment.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ipdPayment.id}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{ipdPayment.amount}</td>
            </tr>
            <tr>
              <th>Payment mode</th>
              <td>{ipdPayment.payment_mode}</td>
            </tr>
            <tr>
              <th>Ipd id</th>
              <td>{ipdPayment.ipdId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(ipdPayment.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(ipdPayment.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editIpdPayment({ id: ipdPayment.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ipdPayment.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default IpdPayment
