import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/IpdPayment/IpdPaymentsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_IPD_PAYMENT_MUTATION = gql`
  mutation DeleteIpdPaymentMutation($id: Int!) {
    deleteIpdPayment(id: $id) {
      id
    }
  }
`

const IpdPaymentsList = ({ ipdPayments }) => {
  const [deleteIpdPayment] = useMutation(DELETE_IPD_PAYMENT_MUTATION, {
    onCompleted: () => {
      toast.success('IpdPayment deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ipdPayment ' + id + '?')) {
      deleteIpdPayment({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Amount</th>
            <th>Payment mode</th>
            <th>Ipd id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {ipdPayments.map((ipdPayment) => (
            <tr key={ipdPayment.id}>
              <td>{truncate(ipdPayment.id)}</td>
              <td>{truncate(ipdPayment.amount)}</td>
              <td>{truncate(ipdPayment.payment_mode)}</td>
              <td>{truncate(ipdPayment.ipdId)}</td>
              <td>{timeTag(ipdPayment.created_at)}</td>
              <td>{timeTag(ipdPayment.updated_at)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.ipdPayment({ id: ipdPayment.id })}
                    title={'Show ipdPayment ' + ipdPayment.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editIpdPayment({ id: ipdPayment.id })}
                    title={'Edit ipdPayment ' + ipdPayment.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete ipdPayment ' + ipdPayment.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(ipdPayment.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IpdPaymentsList
