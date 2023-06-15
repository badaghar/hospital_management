import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ManufacturerPurchaseMedicineForm from 'src/components/ManufacturerPurchaseMedicine/ManufacturerPurchaseMedicineForm'

const CREATE_MANUFACTURER_PURCHASE_MEDICINE_MUTATION = gql`
  mutation CreateManufacturerPurchaseMedicineMutation(
    $input: CreateManufacturerPurchaseMedicineInput!
  ) {
    createManufacturerPurchaseMedicine(input: $input) {
      id
    }
  }
`

const NewManufacturerPurchaseMedicine = () => {
  const [createManufacturerPurchaseMedicine, { loading, error }] = useMutation(
    CREATE_MANUFACTURER_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ManufacturerPurchaseMedicine created')
        navigate(routes.manufacturerPurchaseMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createManufacturerPurchaseMedicine({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New ManufacturerPurchaseMedicine
        </h2>
      </header>
      <div className="rw-segment-main">
        <ManufacturerPurchaseMedicineForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewManufacturerPurchaseMedicine
