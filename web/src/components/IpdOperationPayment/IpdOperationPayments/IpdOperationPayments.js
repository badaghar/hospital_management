import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/IpdOperationPayment/IpdOperationPaymentsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_IPD_OPERATION_PAYMENT_MUTATION = gql`
  mutation DeleteIpdOperationPaymentMutation($id: Int!) {
    deleteIpdOperationPayment(id: $id) {
      id
    }
  }
`

const IpdOperationPaymentsList = ({ ipdOperationPayments }) => {
  const [deleteIpdOperationPayment] = useMutation(
    DELETE_IPD_OPERATION_PAYMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdOperationPayment deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
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
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Operation name</th>
            <th>Amount</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Ipd id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {ipdOperationPayments.map((ipdOperationPayment) => (
            <tr key={ipdOperationPayment.id}>
              <td>{truncate(ipdOperationPayment.id)}</td>
              <td>{truncate(ipdOperationPayment.operation_name)}</td>
              <td>{truncate(ipdOperationPayment.amount)}</td>
              <td>{timeTag(ipdOperationPayment.created_at)}</td>
              <td>{timeTag(ipdOperationPayment.updated_at)}</td>
              <td>{truncate(ipdOperationPayment.ipdId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.ipdOperationPayment({
                      id: ipdOperationPayment.id,
                    })}
                    title={
                      'Show ipdOperationPayment ' +
                      ipdOperationPayment.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editIpdOperationPayment({
                      id: ipdOperationPayment.id,
                    })}
                    title={'Edit ipdOperationPayment ' + ipdOperationPayment.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={
                      'Delete ipdOperationPayment ' + ipdOperationPayment.id
                    }
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(ipdOperationPayment.id)}
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

export default IpdOperationPaymentsList
