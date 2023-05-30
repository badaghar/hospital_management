import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PaymentPurchaseMedicineForm from 'src/components/PaymentPurchaseMedicine/PaymentPurchaseMedicineForm'

export const QUERY = gql`
  query EditPaymentPurchaseMedicineById($id: Int!) {
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
    }
  }
`
const UPDATE_PAYMENT_PURCHASE_MEDICINE_MUTATION = gql`
  mutation UpdatePaymentPurchaseMedicineMutation(
    $id: Int!
    $input: UpdatePaymentPurchaseMedicineInput!
  ) {
    updatePaymentPurchaseMedicine(id: $id, input: $input) {
      id
      purchaseMedicineId
      total
      balance
      paid
      method
      remark
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ paymentPurchaseMedicine }) => {
  const [updatePaymentPurchaseMedicine, { loading, error }] = useMutation(
    UPDATE_PAYMENT_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PaymentPurchaseMedicine updated')
        navigate(routes.paymentPurchaseMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updatePaymentPurchaseMedicine({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit PaymentPurchaseMedicine {paymentPurchaseMedicine?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PaymentPurchaseMedicineForm
          paymentPurchaseMedicine={paymentPurchaseMedicine}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
