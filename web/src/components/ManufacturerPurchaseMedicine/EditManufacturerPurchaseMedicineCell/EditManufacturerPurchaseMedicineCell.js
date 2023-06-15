import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ManufacturerPurchaseMedicineForm from 'src/components/ManufacturerPurchaseMedicine/ManufacturerPurchaseMedicineForm'

export const QUERY = gql`
  query EditManufacturerPurchaseMedicineById($id: Int!) {
    manufacturerPurchaseMedicine: manufacturerPurchaseMedicine(id: $id) {
      id
      productId
      batch
      paid_qty
      free_qty
      pack
      exp
      mrp
      rate
      dis
      sgst
      cgst
      amount
      net_amount
      created_at
      updated_at
    }
  }
`
const UPDATE_MANUFACTURER_PURCHASE_MEDICINE_MUTATION = gql`
  mutation UpdateManufacturerPurchaseMedicineMutation(
    $id: Int!
    $input: UpdateManufacturerPurchaseMedicineInput!
  ) {
    updateManufacturerPurchaseMedicine(id: $id, input: $input) {
      id
      productId
      batch
      paid_qty
      free_qty
      pack
      exp
      mrp
      rate
      dis
      sgst
      cgst
      amount
      net_amount
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ manufacturerPurchaseMedicine }) => {
  const [updateManufacturerPurchaseMedicine, { loading, error }] = useMutation(
    UPDATE_MANUFACTURER_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ManufacturerPurchaseMedicine updated')
        navigate(routes.manufacturerPurchaseMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateManufacturerPurchaseMedicine({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ManufacturerPurchaseMedicine {manufacturerPurchaseMedicine?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ManufacturerPurchaseMedicineForm
          manufacturerPurchaseMedicine={manufacturerPurchaseMedicine}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
