import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PurchaseMedicineForm from 'src/components/PurchaseMedicine/PurchaseMedicineForm'

const CREATE_PURCHASE_MEDICINE_MUTATION = gql`
  mutation CreatePurchaseMedicineMutation(
    $input: CreatePurchaseMedicineInput!
  ) {
    createPurchaseMedicine(input: $input) {
      id
    }
  }
`

const NewPurchaseMedicine = () => {
  const [createPurchaseMedicine, { loading, error }] = useMutation(
    CREATE_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PurchaseMedicine created')
        navigate(routes.purchaseMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createPurchaseMedicine({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New PurchaseMedicine
        </h2>
      </header>
      <div className="rw-segment-main">
        <PurchaseMedicineForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPurchaseMedicine
