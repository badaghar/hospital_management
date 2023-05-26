import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MedicineForm from 'src/components/Medicine/MedicineForm'

export const QUERY = gql`
  query EditMedicineById($id: Int!) {
    medicine: medicine(id: $id) {
      id
      quantity
      productId
      batch
      exp
      mrp
      sgst
      cgst
      discount
      created_at
      updated_at
    }
  }
`
const UPDATE_MEDICINE_MUTATION = gql`
  mutation UpdateMedicineMutation($id: Int!, $input: UpdateMedicineInput!) {
    updateMedicine(id: $id, input: $input) {
      id
      quantity
      productId
      batch
      exp
      mrp
      sgst
      cgst
      discount
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ medicine }) => {
  const [updateMedicine, { loading, error }] = useMutation(
    UPDATE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Medicine updated')
        navigate(routes.medicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateMedicine({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Medicine {medicine?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <MedicineForm
          medicine={medicine}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
