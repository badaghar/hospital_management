import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import HomoMedicineForm from 'src/components/HomoMedicine/HomoMedicineForm'

export const QUERY = gql`
  query EditHomoMedicineById($id: Int!) {
    homoMedicine: homoMedicine(id: $id) {
      id
      name
      created_at
      updated_at
      extra
    }
  }
`
const UPDATE_HOMO_MEDICINE_MUTATION = gql`
  mutation UpdateHomoMedicineMutation(
    $id: Int!
    $input: UpdateHomoMedicineInput!
  ) {
    updateHomoMedicine(id: $id, input: $input) {
      id
      name
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ homoMedicine }) => {
  const [updateHomoMedicine, { loading, error }] = useMutation(
    UPDATE_HOMO_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('HomoMedicine updated')
        navigate(routes.homoMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateHomoMedicine({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit HomoMedicine {homoMedicine?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <HomoMedicineForm
          homoMedicine={homoMedicine}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
