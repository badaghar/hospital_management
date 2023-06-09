import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ReturnMedicineForm from 'src/components/ReturnMedicine/ReturnMedicineForm'

export const QUERY = gql`
  query EditReturnMedicineById($id: Int!) {
    returnMedicine: returnMedicine(id: $id) {
      id
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at
      patientId
    }
  }
`
const UPDATE_RETURN_MEDICINE_MUTATION = gql`
  mutation UpdateReturnMedicineMutation(
    $id: Int!
    $input: UpdateReturnMedicineInput!
  ) {
    updateReturnMedicine(id: $id, input: $input) {
      id
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at
      patientId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ returnMedicine }) => {
  const [updateReturnMedicine, { loading, error }] = useMutation(
    UPDATE_RETURN_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ReturnMedicine updated')
        navigate(routes.returnMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateReturnMedicine({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ReturnMedicine {returnMedicine?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ReturnMedicineForm
          returnMedicine={returnMedicine}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
