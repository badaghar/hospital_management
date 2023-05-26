import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MedicineForm from 'src/components/Medicine/MedicineForm'

const CREATE_MEDICINE_MUTATION = gql`
  mutation CreateMedicineMutation($input: CreateMedicineInput!) {
    createMedicine(input: $input) {
      id
    }
  }
`

const NewMedicine = () => {
  const [createMedicine, { loading, error }] = useMutation(
    CREATE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Medicine created')
        navigate(routes.medicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createMedicine({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Medicine</h2>
      </header>
      <div className="rw-segment-main">
        <MedicineForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewMedicine
