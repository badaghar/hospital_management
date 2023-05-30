import PaymentPurchaseMedicine from 'src/components/PaymentPurchaseMedicine/PaymentPurchaseMedicine'

export const QUERY = gql`
  query FindPaymentPurchaseMedicineById($id: Int!) {
    paymentPurchaseMedicine: paymentPurchaseMedicine(id: $id) {
      id
      purchaseMedicineId
      total
      balance
      paid
      method
      remark
      created_at
      updated_at
      purchaseMedicine{
        invoiceNo
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PaymentPurchaseMedicine not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ paymentPurchaseMedicine }) => {
  return (
    <PaymentPurchaseMedicine
      paymentPurchaseMedicine={paymentPurchaseMedicine}
    />
  )
}
