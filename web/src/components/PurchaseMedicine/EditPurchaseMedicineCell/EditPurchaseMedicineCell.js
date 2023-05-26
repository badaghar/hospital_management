import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PurchaseMedicineForm from 'src/components/PurchaseMedicine/PurchaseMedicineForm'

export const QUERY = gql`
  query EditPurchaseMedicineById($id: Int!) {
    purchaseMedicine: purchaseMedicine(id: $id) {
      id
      invoiceNo
      distributerId
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at
    }
  }
`
const UPDATE_PURCHASE_MEDICINE_MUTATION = gql`
  mutation UpdatePurchaseMedicineMutation(
    $id: Int!
    $input: UpdatePurchaseMedicineInput!
  ) {
    updatePurchaseMedicine(id: $id, input: $input) {
      id
      invoiceNo
      distributerId
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ purchaseMedicine }) => {
  const [updatePurchaseMedicine, { loading, error }] = useMutation(
    UPDATE_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PurchaseMedicine updated')
        navigate(routes.purchaseMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updatePurchaseMedicine({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit PurchaseMedicine {purchaseMedicine?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PurchaseMedicineForm
          purchaseMedicine={purchaseMedicine}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
