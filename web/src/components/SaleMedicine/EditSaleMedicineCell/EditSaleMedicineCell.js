import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SaleMedicineForm from 'src/components/SaleMedicine/SaleMedicineForm'

export const QUERY = gql`
  query EditSaleMedicineById($id: Int!) {
    saleMedicine: saleMedicine(id: $id) {
      id
      billNo
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
const UPDATE_SALE_MEDICINE_MUTATION = gql`
  mutation UpdateSaleMedicineMutation(
    $id: Int!
    $input: UpdateSaleMedicineInput!
  ) {
    updateSaleMedicine(id: $id, input: $input) {
      id
      billNo
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

export const Success = ({ saleMedicine }) => {
  const [updateSaleMedicine, { loading, error }] = useMutation(
    UPDATE_SALE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('SaleMedicine updated')
        navigate(routes.saleMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateSaleMedicine({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit SaleMedicine {saleMedicine?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SaleMedicineForm
          saleMedicine={saleMedicine}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
