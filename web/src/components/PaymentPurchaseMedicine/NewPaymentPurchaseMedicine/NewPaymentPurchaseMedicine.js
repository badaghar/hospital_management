import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PaymentPurchaseMedicineForm from 'src/components/PaymentPurchaseMedicine/PaymentPurchaseMedicineForm'

const CREATE_PAYMENT_PURCHASE_MEDICINE_MUTATION = gql`
  mutation CreatePaymentPurchaseMedicineMutation(
    $input: CreatePaymentPurchaseMedicineInput!
  ) {
    createPaymentPurchaseMedicine(input: $input) {
      id
    }
  }
`

const NewPaymentPurchaseMedicine = () => {
  const [createPaymentPurchaseMedicine, { loading, error }] = useMutation(
    CREATE_PAYMENT_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PaymentPurchaseMedicine created')
        navigate(routes.paymentPurchaseMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createPaymentPurchaseMedicine({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New PaymentPurchaseMedicine
        </h2>
      </header>
      <div className="rw-segment-main">
        <PaymentPurchaseMedicineForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewPaymentPurchaseMedicine
