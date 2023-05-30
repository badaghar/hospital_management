import { Link, routes } from '@redwoodjs/router'

import PaymentPurchaseMedicines from 'src/components/PaymentPurchaseMedicine/PaymentPurchaseMedicines'

export const QUERY = gql`
  query FindPaymentPurchaseMedicines {
    paymentPurchaseMedicines {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No paymentPurchaseMedicines yet. '}
      <Link to={routes.newPaymentPurchaseMedicine()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ paymentPurchaseMedicines }) => {
  return (
    <PaymentPurchaseMedicines
      paymentPurchaseMedicines={paymentPurchaseMedicines}
    />
  )
}
