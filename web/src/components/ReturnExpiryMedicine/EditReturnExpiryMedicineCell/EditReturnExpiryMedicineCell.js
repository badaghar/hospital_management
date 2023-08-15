import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ReturnExpiryMedicineForm from 'src/components/ReturnExpiryMedicine/ReturnExpiryMedicineForm'

export const QUERY = gql`
  query EditReturnExpiryMedicineById($id: Int!) {
    returnExpiryMedicine: returnExpiryMedicine(id: $id) {
      id
      distributerId
      medicine
      return_med
      created_at
      updated_at
    }
  }
`
const UPDATE_RETURN_EXPIRY_MEDICINE_MUTATION = gql`
  mutation UpdateReturnExpiryMedicineMutation(
    $id: Int!
    $input: UpdateReturnExpiryMedicineInput!
  ) {
    updateReturnExpiryMedicine(id: $id, input: $input) {
      id
      distributerId
      medicine
      return_med
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ returnExpiryMedicine }) => {
  const [updateReturnExpiryMedicine, { loading, error }] = useMutation(
    UPDATE_RETURN_EXPIRY_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ReturnExpiryMedicine updated')
        navigate(routes.returnExpiryMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateReturnExpiryMedicine({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ReturnExpiryMedicine {returnExpiryMedicine?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ReturnExpiryMedicineForm
          returnExpiryMedicine={returnExpiryMedicine}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
