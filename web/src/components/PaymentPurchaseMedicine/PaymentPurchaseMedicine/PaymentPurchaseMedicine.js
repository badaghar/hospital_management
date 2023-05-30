import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_PAYMENT_PURCHASE_MEDICINE_MUTATION = gql`
  mutation DeletePaymentPurchaseMedicineMutation($id: Int!) {
    deletePaymentPurchaseMedicine(id: $id) {
      id
    }
  }
`

const PaymentPurchaseMedicine = ({ paymentPurchaseMedicine }) => {
  const [deletePaymentPurchaseMedicine] = useMutation(
    DELETE_PAYMENT_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PaymentPurchaseMedicine deleted')
        navigate(routes.paymentPurchaseMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm(
        'Are you sure you want to delete paymentPurchaseMedicine ' + id + '?'
      )
    ) {
      deletePaymentPurchaseMedicine({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            PaymentPurchaseMedicine {paymentPurchaseMedicine.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{paymentPurchaseMedicine.id}</td>
            </tr>
            <tr>
              <th>Purchase medicine Invoice No</th>
              <td>{paymentPurchaseMedicine.purchaseMedicine.invoiceNo}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{paymentPurchaseMedicine.total}</td>
            </tr>
            <tr>
              <th>Balance</th>
              <td>{paymentPurchaseMedicine.balance}</td>
            </tr>
            <tr>
              <th>Paid</th>
              <td>{paymentPurchaseMedicine.paid}</td>
            </tr>
            <tr>
              <th>Method</th>
              <td>{paymentPurchaseMedicine.method}</td>
            </tr>
            <tr>
              <th>Remark</th>
              <td>{paymentPurchaseMedicine.remark}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(paymentPurchaseMedicine.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(paymentPurchaseMedicine.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <nav className="rw-button-group">
        <Link
          to={routes.editPaymentPurchaseMedicine({
            id: paymentPurchaseMedicine.id,
          })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(paymentPurchaseMedicine.id)}
        >
          Delete
        </button>
      </nav> */}
    </>
  )
}

export default PaymentPurchaseMedicine
