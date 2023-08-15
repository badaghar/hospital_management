import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ReturnExpiryMedicineForm from 'src/components/ReturnExpiryMedicine/ReturnExpiryMedicineForm'

const CREATE_RETURN_EXPIRY_MEDICINE_MUTATION = gql`
  mutation CreateReturnExpiryMedicineMutation(
    $input: CreateReturnExpiryMedicineInput!
  ) {
    createReturnExpiryMedicine(input: $input) {
      id
    }
  }
`

const NewReturnExpiryMedicine = () => {
  const [createReturnExpiryMedicine, { loading, error }] = useMutation(
    CREATE_RETURN_EXPIRY_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ReturnExpiryMedicine created')
        navigate(routes.returnExpiryMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createReturnExpiryMedicine({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New ReturnExpiryMedicine
        </h2>
      </header>
      <div className="rw-segment-main">
        <ReturnExpiryMedicineForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewReturnExpiryMedicine
